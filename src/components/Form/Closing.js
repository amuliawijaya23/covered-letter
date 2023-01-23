import React from 'react'

import { Grid, IconButton, Card, Typography, TextField } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useSelector } from 'react-redux';

const Closing = ({ generateClosing }) => {
  const letter = useSelector((state) => state.letter.value);

  return (
    <Grid container spacing={2} padding={1} sx={{ my: 2 }}>
      <Grid item xs={12} lg={4}>
        <TextField 
          fullWidth
          multiline
          rows={4}
        />
        <IconButton
          edge='end'
          color='inherit'
          sx={{ mx: 0.5 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <IconButton
          edge='end'
          color='inherit'
          sx={{ mx: 0.5 }}
          onClick={generateClosing}
        >
          <RefreshIcon />
        </IconButton>
      </Grid>
      <Grid item xs={12} lg={8} padding={2}>
        {letter?.closing && (
          <Card sx={{ my: 2, p: 5, border: 'solid', height: '100%' }}>
            <Typography component='span' variant='body2' >
              {letter?.closing}
            </Typography>
          </Card>
        )}
      </Grid>
    </Grid>
  )
}

export default Closing