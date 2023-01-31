import { useSelector } from 'react-redux';

import { 
  Grid,
  Box,
  IconButton,
  Typography,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Card,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Opening = ({ 
  job,
  organization,
  culture,
  experience,
  reason,
  updateJob,
  updateOrganization,
  updateCulture,
  updateExperience,
  updateReason,
  generateIntroduction,
}) => {
  const opening = useSelector((state) => state.letter.value.opening);

  let experienceOptions = [];

  for (let i = 1; i <= 20; i++) {
    experienceOptions.push(i);
  };

  return (
    <Grid container spacing={2} padding={1}>
      <Grid item xs={12} lg={4}>
        <TextField
          fullWidth
          sx={{ my: 0.5 }}
          variant='outlined'
          label='Job Title'
          value={job}
          onChange={(e) => updateJob(e.target.value)}
        />
        <TextField
          fullWidth
          sx={{ my: 0.5 }}
          variant='outlined'
          label='Organization Name'
          value={organization}
          onChange={(e) => updateOrganization(e.target.value)}
        />
        <FormControl
          fullWidth
          sx={{ my: 0.5 }}
        >
          <InputLabel id='select-experience-label'>Experience</InputLabel>
          <Select
            labelId='select-experience-label'
            id='select-experience'
            value={experience}
            label='Experience'
            helperText='Optional'
            onChange={(e) => updateExperience(e.target.value)}
          >
            <MenuItem value={'No Experience'}>No Experience</MenuItem>
            {experienceOptions.map((year) => (
              year === 1 ? <MenuItem value={`${year} Year`}>{year} Year</MenuItem> : <MenuItem value={`${year} Years`}>{year} Years</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          sx={{ my: 0.5 }}
          label={`Explain the organization's culture`}
          value={culture}
          helperText={`Optional`}
          onChange={(e) => updateCulture(e.target.value)}
          multiline
          rows={4}
        />
        <TextField
          fullWidth
          sx={{ my: 0.5 }}
          label={`Explain why you want to work with this organization`}
          value={reason}
          helperText='Optional'
          onChange={(e) => updateReason(e.target.value)}
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