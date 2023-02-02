import React from 'react';

import { 
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  Card,
  Divider,
  IconButton,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';

import { useSelector } from 'react-redux';

const Body = ({ 
  values,
  updateValue,
  updateFeat,
  addValue,
  removeValue,
  generateValueHighlight
}) => {

  const letter = useSelector((state) => state.letter.value);

  return (
    <Grid container spacing={2} padding={1} sx={{ my: 2 }}>
        {values.map((value, index) => (
          <Grid item xs={12} lg={6}>
            {values.length > 1 && (
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton
                  edge='end'
                  size='medium'
                  color='inheirt'
                  onClick={() => removeValue(index)}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            )}
            <TextField
              fullWidth
              variant='standard'
              label='Core Value'
              value={values[index]?.value}
              onChange={(e) => updateValue(e.target.value, index)}
              sx={{ my: 0.5 }}
            />
            <TextField
              fullWidth
              sx={{ my: 2 }}
              placeholder='Provide your experience with this core value...'
              value={values[index]?.feat}
              onChange={(e) => updateFeat(e.target.value, index)}
              multiline
              rows={4}
              />
            <Divider>
              <Button onClick={() => generateValueHighlight(index)}>
                Generate
              </Button>
            </Divider>
            {letter.body[index] && (
                <Card sx={{ my: 2, p: 5, border: 'solid' }}>
                  <Typography component='span' variant='body2' >
                    {letter.body[index]}
                  </Typography>
                </Card>
              )}
          </Grid>
        ))}
      <Grid item xs={12} lg={6}>
        <Box sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <IconButton
            size='large'
            color='inherit'
            sx={{ mt: 2 }}
            onClick={addValue}
          >
            <AddCircleOutlineIcon color='primary' sx={{ fontSize: '5rem' }}/>
          </IconButton>
        </Box>
      </Grid>
    </Grid>
  )
}

export default Body;