import { forwardRef, useState, useEffect } from 'react';

// react redux
import { useSelector } from 'react-redux';

// import from MUI
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
  Snackbar,
  Alert
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import SaveIcon from '@mui/icons-material/Save';

import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// import custom components
import Opening from './Opening';
import Body from './Body';
import Closing from './Closing';

// import custom hook
import useFormData from '../../hooks/useFormData';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const steps = [
  {
    label: 'Opening',
    description: 'Create an opening introduction for your cover letter.'
  },
  {
    label: 'Body',
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
    updateTitle,
    updateJob,
    updateOrganization,
    updateCulture,
    updateExperience,
    updateReason,
    updateValue,
    updateFeat,
    addValue,
    removeValue,
    generateIntroduction,
    generateValueHighlight,
    generateClosing,
    resetErrorAlert,
    saveLetter,
    title,
    job,
    organization,
    culture,
    experience,
    reason,
    values,
    error,
    loading
  } = useFormData();

  const letter = useSelector((state) => state.letter.value);

  const [step, setStep] = useState(0);

  const [ editorState, setEditorState ] = useState(EditorState.createEmpty());

  useEffect(() => {
    let content = '';
    if (letter?.opening && letter?.body.length > 0 && letter?.closing) {
      content += `<p>To [Insert],</p>`;
      content += `<p>${letter.opening}</p>`;
      for (let i = 0; i < letter.body.length; i++) {
        content += `<p>${letter.body[i]}</p>`;
      };
      content += `<p>${letter.closing}</p><p>Sincerely,</p><p>[Your Name]</p>`;

      const contentBlock = htmlToDraft(content);
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const _editorState = EditorState.createWithContent(contentState);
      setEditorState(_editorState);
    };
  }, [letter?.opening, letter?.body, letter?.closing]);

  const handleNext = () => {
    switch (step) {
      case 1:
        if (!letter.closing) {
          generateClosing();
        };
        setStep((prev) => prev + 1);
        break;

      default:
        setStep((prev) => prev + 1);
        break;
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSave = async () => {
    const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    await saveLetter(content);
    handleClose();
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
            onChange={(e) => updateTitle(e.target.value)}
            value={title}
            label='Title'
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
                    job={job}
                    organization={organization}
                    culture={culture}
                    experience={experience}
                    reason={reason}
                    error={error}
                    loading={loading}
                    updateJob={updateJob}
                    updateOrganization={updateOrganization}
                    updateCulture={updateCulture}
                    updateExperience={updateExperience}
                    updateReason={updateReason}
                    generateIntroduction={generateIntroduction}
                  />
                )}
                {step === 1 && (
                  <Body 
                    values={values}
                    error={error}
                    loading={loading}
                    updateValue={updateValue}
                    updateFeat={updateFeat}
                    generateValueHighlight={generateValueHighlight}
                    addValue={addValue}
                    removeValue={removeValue}
                  />
                )}
                {step === 2 && (
                  <Closing 
                    generateClosing={generateClosing}
                    loading={loading}
                  />
                )}
                {step === 3 && (
                  <Box sx={{ my: 2 }}>
                    <Editor 
                      defaultEditorState={editorState}
                      editorState={editorState}
                      onEditorStateChange={setEditorState}
                    />
                  </Box> 
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
                  {( (step === 0 && letter?.opening) || (step === 1 && letter?.body.length > 0) || (step === 2 && letter?.closing) ) && (
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
                      onClick={handleSave}
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
      <Snackbar open={error !== ''} autoHideDuration={6000} onClose={resetErrorAlert}>
        <Alert onClose={resetErrorAlert} severity='error' sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Dialog>
  )
}

export default Form