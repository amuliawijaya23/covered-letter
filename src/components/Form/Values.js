import React from 'react';

import { 
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  Card,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

import { useSelector } from 'react-redux';

const Values = ({ values, setValues, setExperience, addValue, removeValue, generateValueHighlight }) => {

  const letter = useSelector((state) => state.letter.value);

  return (
    <Grid container spacing={2} padding={1} sx={{ my: 2 }}>
      <Grid item container>
        {values.map((value, index) => (
           <>
            <Grid item xs={12} lg={4}>
              <TextField
                fullWidth
                variant='standard'
                label='Core Value'
                value={values[index]?.value}
                onChange={(e) => setValues(e.target.value, index)}
                sx={{ my: 0.5 }}
              />
              <TextField
                fullWidth
                sx={{ my: 2 }}
                placeholder='Provide your experience with this core value...'
                value={values[index]?.experience}
                onChange={(e) => setExperience(e.target.value, index)}
                multiline
                rows={4}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button 
                  variant='contained'
                  onClick={() => generateValueHighlight(index)}
                >
                  Generate
                </Button>
                {values.length > 1 && (
                  <IconButton
                    edge='end'
                    size='medium'
                    color='inheirt'
                    onClick={() => removeValue(index)}
                  >
                    <CloseIcon />
                  </IconButton>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} lg={8} padding={2}>
              {letter.values[index] && (
                <Card sx={{ my: 2, p: 5, border: 'solid', height: '100%' }}>
                  <Typography component='span' variant='body2' >
                    {letter.values[index]}
                  </Typography>
                </Card>
              )}
           </Grid>
          </>
        ))}
      </Grid>
      <Grid item xs={12} lg={4}>
        <IconButton
          size='medium'
          color='inherit'
          sx={{ mt: 2}}
          onClick={addValue}
        >
          <AddIcon />
        </IconButton>
      </Grid>
    </Grid>
  )
}

export default Values