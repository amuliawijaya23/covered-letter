import { Container, Nav, Navbar } from 'react-bootstrap';

const Navigation = () => {
  return (
    <Navbar bg='dark' variant='dark'>
      <Container fluid>
        <Navbar.Brand href='#home'>Covered Letter</Navbar.Brand>
        <Nav className='me-auto'>
          <Nav.Link href='#projects'>My Projects</Nav.Link>
          <Nav.Link href='#new'>New</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
};

export default Navigation;