import { useSelector } from 'react-redux';

import { 
  Grid,
  Box,
  IconButton,
  Divider,
  Typography,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
  CircularProgress,
  Button,
  Card,
} from '@mui/material';
import CachedIcon from '@mui/icons-material/Cached';

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
  error,
  loading
}) => {
  const opening = useSelector((state) => state.letter.value.opening);

  let experienceOptions = [];

  for (let i = 1; i <= 20; i++) {
    experienceOptions.push(i);
  };

  return (
    <Grid container spacing={2} padding={1}>
      <Grid item container spacing={2} padding={1}>
        <Grid item xs={12} lg={6} padding={1}>
          <TextField
            fullWidth
            sx={{ my: 1 }}
            variant='outlined'
            label='Job Title'
            helperText='Required'
            error={error && !job}
            value={job}
            onChange={(e) => updateJob(e.target.value)}
          />
          <TextField
            fullWidth
            sx={{ my: 1 }}
            variant='outlined'
            label='Organization Name'
            helperText='Required'
            error={error && !organization}
            value={organization}
            onChange={(e) => updateOrganization(e.target.value)}
          />
          <FormControl
            fullWidth
            sx={{ my: 1 }}
          >
            <InputLabel id='select-experience-label'>Experience</InputLabel>
            <Select
              labelId='select-experience-label'
              id='select-experience'
              label='Experience'
              error={error && !experience}
              value={experience}
              onChange={(e) => updateExperience(e.target.value)}
            >
              <MenuItem value={'No Experience'}>No Experience</MenuItem>
                {experienceOptions.map((year) => (
                  year === 1 ? <MenuItem value={`${year} Year`}>{year} Year</MenuItem> : <MenuItem value={`${year} Years`}>{year} Years</MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField
            fullWidth
            sx={{ my: 1 }}
            label={`Explain the organization's culture`}
            value={culture}
            helperText={`Optional`}
            onChange={(e) => updateCulture(e.target.value)}
            multiline
            rows={3}
          />
          <TextField
            fullWidth
            sx={{ my: 1 }}
            label={`Explain why you want to work with this organization`}
            value={reason}
            helperText='Optional'
            onChange={(e) => updateReason(e.target.value)}
            multiline
            rows={3}
          />
        </Grid>
        <Grid item xs={12} sx={{ mt: 2}}>
          <Divider>
            {opening && (
              <Tooltip title='Re - Generate'>
                <IconButton
                  onClick={generateIntroduction}
                >
                  <CachedIcon/>
                </IconButton>
              </Tooltip>
            )}
            {!opening && !loading && (
              <Button
                onClick={generateIntroduction}
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
        </Grid>
      </Grid>
      <Grid item xs={12} padding={2} sx={{ display: 'flex', height: '100%'}}>
        {opening && (
          <Card sx={{ my: 2, p: 5, border: 'solid', display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ width: { xs: '100%', lg: '75%'}  }}>
            <Typography component='span' variant='body2' >
              {opening}
            </Typography>
            </Box>
          </Card>          
        )}
      </Grid>
    </Grid>
  )
}

export default Opening