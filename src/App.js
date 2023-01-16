// react-router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import from react bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

// import custom components
import Navigation from './components/Navigation';

const App = () => {
  return (
    <>
      <Navigation />
    </>
  );
}

export default App;
