import React from 'react'

import { Grid, IconButton, Card, Typography, Divider, Box, CircularProgress, Button, Tooltip } from '@mui/material';
import CachedIcon from '@mui/icons-material/Cached';

import { useSelector } from 'react-redux';

const Closing = ({ generateClosing, loading }) => {
  const closing = useSelector((state) => state.letter.value.closing);

  return (
    <Grid container spacing={2} padding={1} sx={{ my: 2 }}>
      <Grid item xs={12} padding={2}>
        <Divider>
          {closing && (
            <Tooltip title='Re - Generate'>
              <IconButton
                onClick={generateClosing}
              >
                <CachedIcon/>
              </IconButton>
            </Tooltip>
          )}
          {!closing && !loading && (
            <Button
              onClick={generateClosing}
            >
              Generate
            </Button>
          )}
          {loading && (
            <Box sx={{ width: '100%', mt: 1, justifyContent: 'center' }}>
              <CircularProgress />
            </Box>
          )}
        </Divider>
        {closing && (
          <Card sx={{ my: 2, p: 5, border: 'solid', display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ width: { xs: '100%', lg: '75%'}  }}>
              <Typography component='span' variant='body2' >
                {closing}
              </Typography>
            </Box>
          </Card>
        )}
      </Grid>
    </Grid>
  )
}

export default Closing