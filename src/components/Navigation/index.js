import { useState } from 'react';

// import from MUI
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Tooltip, MenuItem, Button } from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';

// state management
import { useSelector } from 'react-redux';

const settings = ['Projects', 'Logout'];

const Navigation = () => {
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
            <Tooltip title="Open Menu">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={!user ? 'User' : {}} src={!user ? '' : {}} />
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
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
              {!user && (
                <MenuItem>
                  <Typography textAlign='center'>Login</Typography>
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