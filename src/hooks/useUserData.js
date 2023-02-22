import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
// user reducer
import { login, logout, setFeats, setLetters } from '../state/reducers/userReducer';

import { auth, googleProvider } from '../firebase';
import { signInWithPopup, signOut } from 'firebase/auth';

import { db } from '../firebase';
import { onSnapshot, collection, query, where } from 'firebase/firestore';

const lettersRef = collection(db, 'letters');
const featsRef = collection(db, 'feats');

const useUserData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      dispatch(login(userData));

      const myFeats = query(featsRef, where('user_id', '==', userData.uid));
      const myLetters = query(lettersRef, where('user_id', '==', userData.uid));

      onSnapshot(myFeats, (snapshot) => {
        const feats = snapshot.docs
          .map((f) => ({
            ...f.data(),
            id: f.id,
            date_created: f.data().date_created.seconds,
            date_updated: f.data().date_updated.seconds
          }))
          .sort((a, b) => b.date_created - a.date_created);

        dispatch(setFeats(feats));
      });

      onSnapshot(myLetters, (snapshot) => {
        const letters = snapshot.docs
          .map((l) => ({
            ...l.data(),
            id: l.id,
            date_created: l.data().date_created.seconds,
            date_updated: l.data().date_updated.seconds
          }))
          .sort((a, b) => b.date_created - a.date_created);
        dispatch(setLetters(letters));
      });
    }

    return () => {
      dispatch(logout());
    };
  }, [dispatch]);

  const signInWithGoogle = async () => {
    try {
      const { user } = await signInWithPopup(auth, googleProvider);
      dispatch(login({ ...user }));
      localStorage.setItem('user', JSON.stringify({ ...user }));
      // navigate('/');
    } catch (error) {
      console.error(error.response ? error.response.body : error);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
      localStorage.clear('user');
    } catch (error) {
      console.error(error.response ? error.response.body : error);
    }
  };

  return {
    signInWithGoogle,
    signOutUser
  };
};

export default useUserData;
