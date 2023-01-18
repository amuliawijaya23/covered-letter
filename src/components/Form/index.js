import { forwardRef, useState, useEffect } from 'react';

// import { Editor } from "react-draft-wysiwyg";
// import { ContentState, convertToRaw } from 'draft-js';
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

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
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

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
  const { form, letter, setJobTitle, setOrganizationName, setSlogan, generateIntroduction, setOpening } = useOpenAI();

  const [step, setStep] = useState(0);

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

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
      <Box sx={{ width: { xs: '100%', md: '100%' }, p: 3 }}>
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
                    <Grid container spacing={2} padding={1} sx={{ my: 2 }}>
                      <Grid item xs={12} md={4}>
                        <TextField
                          fullWidth
                          variant='standard'
                          label='Job Title'
                          value={form?.jobTitle}
                          onChange={(e) => setJobTitle(e.target.value)}
                          sx={{ my: 0.5 }}
                        />
                        <TextField
                          fullWidth
                          variant='standard'
                          label='Enter organization name...'
                          value={form?.organizationName}
                          onChange={(e) => setOrganizationName(e.target.value)}
                          sx={{ my: 0.5 }}
                        />
                        <TextField
                          fullWidth
                          sx={{ my: 2 }}
                          label='Enter organization vision or slogan...'
                          value={form?.slogan}
                          onChange={(e) => setSlogan(e.target.value)}
                          multiline
                          rows={4}
                        />
                        <Button 
                          fullWidth
                          variant='contained'
                          onClick={generateIntroduction}
                        >
                          Generate
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={8} padding={2}>
                        {letter?.opening && (
                          <Card sx={{ my: 2, p: 5, border: 'solid', height: '100%' }}>
                            <Typography component='span' variant='body2' >
                              {letter?.opening}
                            </Typography>
                          </Card>
                        )}
                      </Grid>
                      <Grid item xs={12}>
                        
                      </Grid>
                    </Grid>
                  </>
                )}
                {step === 1 && (
                  <></>
                )}
                {step === 2 && (
                  <></>
                )}
                <Box sx={{ display: 'flex', justifyContent: 'end', px: 2 }}>
                  {step > 0 && (
                    <Button
                      variant='contained'
                      startIcon={<NavigateBeforeIcon />}
                      onClick={handleBack}
                      sx={{ mr: 1}}
                    >
                      Back
                    </Button>
                  )}
                  {step < 2 && (
                    <Button 
                      variant='contained' 
                      endIcon={<NavigateNextIcon />}
                      onClick={handleNext}
                    >
                      Next
                    </Button>
                  )}
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Box>
    </Dialog>
  )
}

export default Form