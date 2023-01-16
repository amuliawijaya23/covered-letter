// react-router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import custom components
import Navigation from './components/Navigation';

const App = () => {
  return (
    <Router>
      <Navigation />
      <Routes>

      </Routes>
    </Router>
  );
}

export default App;
