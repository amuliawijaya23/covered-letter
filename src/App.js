// react-router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import from MUI
import { Box, CssBaseline, Toolbar } from '@mui/material';

// import custom components
import Navigation from './components/Navigation';

// import pages
import Login from './pages/login';

import { useSelector } from 'react-redux';

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
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
