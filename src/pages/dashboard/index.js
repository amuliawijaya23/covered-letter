import { useState } from 'react';
import {
  Grid,
  Box,
  Toolbar,
  ClickAwayListener,
  TextField,
  IconButton,
  Tooltip,
  Paper,
  Card,
  CardMedia
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

// import custom component
import Form from '../../components/Form';

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [searchBar, setSearchBar] = useState(false);
  const [search, setSearch] = useState('');

  const handleFormOpen = () => {
    setOpen(true);
  };

  const handleFormClose = () => {
    setOpen(false);
  };

  const handleShowSearchBar = () => {
    searchBar ? setSearchBar(false) : setSearchBar(true);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Form open={open} handleClose={handleFormClose} />
      <Grid container>
        <Grid item xs={12}>
          <Toolbar
            component={Paper}
            sx={{
              mt: 1,
              alignItems: 'center'
            }}>
            <Grid container padding={1}>
              <Grid item xs={6} padding={1}>
                {searchBar && (
                  <ClickAwayListener onClickAway={handleShowSearchBar}>
                    <TextField
                      fullWidth
                      size='small'
                      variant='outlined'
                      placeholder='Search...'
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </ClickAwayListener>
                )}
                {!searchBar && (
                  <IconButton onClick={handleShowSearchBar}>
                    <SearchIcon />
                  </IconButton>
                )}
              </Grid>
              <Grid item xs={6} padding={1}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center'
                  }}>
                  <Tooltip title='Create New'>
                    <IconButton onClick={handleFormOpen}>
                      <AddIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Grid>
            </Grid>
          </Toolbar>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
