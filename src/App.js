// react-router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import from MUI
import { Box, CssBaseline } from '@mui/material';

import { useSelector } from 'react-redux';

// import pages
import Login from './pages/login';
import Dashboard from './pages/dashboard';

// import custom components
import Navigation from './components/Navigation';

// import custom hook
import useUserData from './hooks/useUserData';


const App = () => {
  const { signInWithGoogle, signOutUser } = useUserData();

  const user = useSelector((state) => state.user.value);

  return (
    <Router>
      <Box>
        <CssBaseline />
        <Navigation logout={signOutUser} />
        <Routes>
          <Route path='/' element={<></>} />
          <Route path='/login' element={<Login user={user} googleLogin={signInWithGoogle} />} />
          <Route path='/dashboard/:id' element={<Dashboard />} />
          <Route path='*' element={<></>} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
