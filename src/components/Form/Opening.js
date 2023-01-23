import React from 'react'

import { 
  Grid,
  Box,
  IconButton,
  Typography,
  TextField,
  Button,
  Card,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Opening = ({ recipient, jobTitle, organizationName, culture, setRecipient, setJobTitle, setOrganizationName, setCulture, generateIntroduction, opening }) => {
  return (
    <Grid container spacing={2} padding={1} sx={{ my: 2 }}>
      <Grid item xs={12} lg={4}>
        <TextField
          fullWidth
          variant='standard'
          label='Job Title'
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          sx={{ my: 0.5 }}
        />
        <TextField
          fullWidth
          variant='standard'
          label='Organization Name'
          value={organizationName}
          onChange={(e) => setOrganizationName(e.target.value)}
          sx={{ my: 0.5 }}
        />
        <TextField
          fullWidth
          sx={{ my: 2 }}
          label='Culture'
          value={culture}
          onChange={(e) => setCulture(e.target.value)}
          multiline
          rows={4}
        />
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Box>
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
              onClick={generateIntroduction}
            >
              <RefreshIcon />
            </IconButton>
          </Box>
          {!opening && (
            <Button 
              variant='contained'
              onClick={generateIntroduction}
            >
              Generate
            </Button>
          )}
        </Box>
      </Grid>
      <Grid item xs={12} lg={8} padding={2}>
        {opening && (
          <Card sx={{ my: 2, p: 5, border: 'solid', height: '100%' }}>
            <Typography component='span' variant='body2' >
              {opening}
            </Typography>
          </Card>
        )}
      </Grid>
    </Grid>
  )
}

export default Opening