import { useState } from 'react';

import { Grid, Box, Card, CardMedia } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// import custom component
import Form from '../../components/Form';

const boxStyle = {
  width: '100%',
  height: { xs: 100, md: 200 },
  cursor: 'pointer'
};

const Dashboard = () => {

  const [ open, setOpen ] = useState(false);

  const handleFormOpen = () => {
    setOpen(true);
  };

  const handleFormClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Form open={open} handleClose={handleFormClose} />
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <Card sx={boxStyle} onClick={handleFormOpen}>
            <CardMedia sx={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <AddIcon sx={{ fontSize: {xs: '2rem', md: '4rem'} }} />
            </CardMedia>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard