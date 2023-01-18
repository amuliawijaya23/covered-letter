import React from 'react';

import { Grid, Box, Card, CardMedia, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const boxStyle = {
  width: '100%',
  height: { xs: 100, md: 200 },
  cursor: 'pointer'
};

const Dashboard = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <Card sx={boxStyle}>
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