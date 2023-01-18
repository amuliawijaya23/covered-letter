import { forwardRef, useState } from 'react';

import { 
  Grid,
  Box,
  Dialog,
  Slide,
  AppBar,
  Toolbar,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Divider,
  Typography,
  TextField,
  Button,
  Card,
  CardHeader,
  CardContent
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import useOpenAI from '../../hooks/useOpenAI';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const steps = [
  {
    label: 'Opening',
    description: 'Create an opening introduction for your cover letter.'
  },
  {
    label: 'Strengths',
    description: 'Add your skills and strengths to highlight in your cover letter.'
  },
  {
    label: 'Closing',
    description: 'Create closing statement for your cover letter.'
  }
];

const Form = ({ open, handleClose }) => {
  const { form, letter, setJobTitle, setOrganizationName, setSlogan, generateIntroduction } = useOpenAI();

  const [step, setStep] = useState(0);

  return (
    <Dialog
      fullScreen={true}
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge='start'
            color='inheirt'
            onClick={handleClose}
            aria-label='close'
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box sx={{ width: '100%', p: 3 }}>
        <Stepper activeStep={step} sx={{ mt: 3, mb: 5 }} orientation='vertical'>
          {steps.map((s) => (
            <Step key={s.label}>
              <StepLabel>{s.label}</StepLabel>
              <StepContent>
                <Typography component='span' variant='body2'>
                  {s.description}
                </Typography>
                {step === 0 && (
                  <>
                    <Grid container spacing={1} sx={{ my: 2 }}>
                      <Grid item xs={12}>
                        <TextField 
                          fullWidth
                          variant='standard'
                          label='Enter Job Title'
                          value={form?.jobTitle}
                          onChange={(e) => setJobTitle(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField 
                          fullWidth
                          variant='standard'
                          label='Enter organization name...'
                          value={form?.organizationName}
                          onChange={(e) => setOrganizationName(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField 
                          fullWidth
                          variant='standard'
                          label='Enter organization vision or slogan...'
                          value={form?.slogan}
                          onChange={(e) => setSlogan(e.target.value)}
                        />
                      </Grid>
                    </Grid>
                    <Button 
                      fullWidth 
                      variant='contained'
                      onClick={generateIntroduction}
                    >
                      Generate
                    </Button>
                    <Card sx={{ p: 1, mt: 2 }}>
                      <CardContent>
                        <Typography component='span' variant='body1'>
                          {letter?.opening}
                        </Typography>
                      </CardContent>
                    </Card>
                  </>
                )}
                {step === 1 && (
                  <></>
                )}
                {step === 2 && (
                  <></>
                )}
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Box>
    </Dialog>
  )
}

export default Form