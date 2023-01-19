import { useState } from 'react';

// import from MUI
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Tooltip, MenuItem, Button } from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';

import { useNavigate } from 'react-router-dom';

// state management
import { useSelector } from 'react-redux';

const settings = ['Projects', 'Logout'];

const Navigation = ({ logout }) => {

  const navigate = useNavigate();

  // global state
  const user = useSelector((state) => state.user.value);

  // local state
  const [ menuAnchor, setMenuAnchor ] = useState(null);

  // click handlers
  const handleOpenUserMenu = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setMenuAnchor(null);
  };

  const menuClickHandler = (option) => {
    switch (option) {
      case 'Logout':
        logout();
        navigate('/');
        setMenuAnchor(null);
        break;

      case 'Login':
        navigate('/login');
        setMenuAnchor(null);
        break;
      
      case 'Projects':
        navigate(`/dashboard/${user?.uid}`);
        setMenuAnchor(null);
        break;

      default:
        setMenuAnchor(null);
        break;
    };
  };

  return (
    <AppBar position='static'>
      <Container maxWidth='xxl' sx={{ p: 0.5}}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', p: 1 }} >
          <Box sx={{ display: 'flex' }}>
            <AdbIcon />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                display: { xs: 'none', md: 'flex'},
                mr: 2,
                ml: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              COVERED LETTER
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={!user ? "Open Menu" : `Signed in as ${user?.displayName}`}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={!user ? 'User' : user?.displayName} src={!user ? '' : user?.photoURL} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={menuAnchor}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(menuAnchor)}
              onClose={handleCloseUserMenu}
            >
              {user && settings.map((setting) => (
                <MenuItem key={setting} onClick={() => menuClickHandler(setting)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
              {!user && (
                <MenuItem>
                  <Typography textAlign='center' onClick={() => menuClickHandler('Login')}>Login</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
};

export default Navigation;