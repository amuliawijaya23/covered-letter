// react-router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import from MUI
import { Box, CssBaseline } from '@mui/material';

// import custom components
import Navigation from './components/Navigation';

const App = () => {
  return (
    <Router>
      <Box>
        <CssBaseline />
        <Navigation />
        <Routes>

        </Routes>
      </Box>
    </Router>
  );
}

export default App;
