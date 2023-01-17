import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup, signOut } from 'firebase/auth';

// user reducer
import { login, logout } from '../state/reducers/userReducer';

const useUserData = () => {

  const dispatch = useDispatch();

  useEffect(() => {
		const userData = JSON.parse(localStorage.getItem('user'));
		if (userData) {
			dispatch(login(userData));
		};

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
    };
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
      localStorage.clear('user');
    } catch (error) {
      console.error(error.response ? error.response.body : error);
    };
  };

  return {
    signInWithGoogle,
    signOutUser
  };
};

export default useUserData