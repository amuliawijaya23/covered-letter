import { useState } from 'react';
import { Grid, Box, Card, CardMedia } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// import custom component
import Form from '../../components/Form';

const boxStyle = {
  width: '100%',
  cursor: 'pointer'
};

const mediaStyle = {
  display: 'flex',
  width: '100%',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center'
};

const Dashboard = () => {
  const [open, setOpen] = useState(false);

  const handleFormOpen = () => {
    setOpen(true);
  };

  const handleFormClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Form open={open} handleClose={handleFormClose} />
    </Box>
  );
};

export default Dashboard;
