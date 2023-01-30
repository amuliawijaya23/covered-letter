import { forwardRef, useState } from 'react';

import { 
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
  Typography,
  TextField,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import SaveIcon from '@mui/icons-material/Save';

import Opening from './Opening';
import Values from './Values';
import Closing from './Closing';
import Edit from './Edit';

import useOpenAI from '../../hooks/useOpenAI';

import { useSelector } from 'react-redux';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const steps = [
  {
    label: 'Opening',
    description: 'Create an opening introduction for your cover letter.'
  },
  {
    label: 'Values',
    description: `Show how you fit in with the company's core values.`
  },
  {
    label: 'Closing',
    description: 'Create closing statement for your cover letter.'
  },
  {
    label: 'Edit and Finalize',
    description: 'Edit and finalize your letter before saving.'
  }
];

const Form = ({ open, handleClose }) => {
  const { 
    form,
    setRecipient,
    setJobTitle, 
    setOrganizationName, 
    setCulture, 
    setValues, 
    setExperience,
    addValue,
    removeValue,
    generateIntroduction, 
    generateValueHighlight,
    generateClosing
  } = useOpenAI();

  const letter = useSelector((state) => state.letter.value);

  const [step, setStep] = useState(0);

  const handleNext = () => {
    switch (step) {
      case 0:
        if (letter.opening) {
          setStep((prev) => prev + 1);
        };
        break;

      case 1:
        if (letter.values.length > 0) {
          if (!letter.closing) {
            generateClosing();
          };
          setStep((prev) => prev + 1);
        };
        break;

      case 2:
        if (letter.closing) {
          setStep((prev) => prev + 1);
        };
        break;

      default:
        break;
    }
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
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <TextField 
            sx={{ width: 300 }}
            variant='standard'
          />
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
                  <Opening
                    recipient={form.recipient}
                    jobTitle={form.jobTitle}
                    organizationName={form.organizationName}
                    culture={form.culture}
                    setRecipient={setRecipient}
                    setJobTitle={setJobTitle}
                    setOrganizationName={setOrganizationName}
                    setCulture={setCulture}
                    generateIntroduction={generateIntroduction}
                    opening={letter.opening}
                  />
                )}
                {step === 1 && (
                  <Values 
                    values={form.values}
                    setValues={setValues}
                    setExperience={setExperience}
                    generateValueHighlight={generateValueHighlight}
                    addValue={addValue}
                    removeValue={removeValue}
                  />
                )}
                {step === 2 && (
                  <Closing 
                    generateClosing={generateClosing}
                  />
                )}
                {step === 3 && ( 
                  <Edit />    
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
                  {step < 3 && (
                    <Button 
                      variant='contained' 
                      endIcon={<NavigateNextIcon />}
                      onClick={handleNext}
                    >
                      Next
                    </Button>
                  )}
                  {step === 3 && (
                    <Button 
                      variant='contained' 
                      endIcon={<SaveIcon />}
                    >
                      Save
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