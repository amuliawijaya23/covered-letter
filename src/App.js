// react-router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import from MUI
import { Box, CssBaseline, Toolbar } from '@mui/material';

// import custom components
import Navigation from './components/Navigation';

// import pages
import Login from './pages/login';

const App = () => {
  return (
    <Router>
      <Box>
        <CssBaseline />
        <Navigation />
        <Routes>
          <Route path='/login' element={<Login />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
