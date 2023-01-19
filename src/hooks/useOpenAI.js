/* eslint-disable camelcase */
import { useState } from 'react';

import { Configuration, OpenAIApi } from 'openai';

import { useSelector, useDispatch } from 'react-redux';

import { updateOpening, updateValues, updateClosing } from '../state/reducers/letterReducer';

const useOpenAI = () => {
  const config = new Configuration({ apiKey: process.env.REACT_APP_OPENAI_API_KEY });
  const openAI = new OpenAIApi(config);

  const dispatch = useDispatch();

  const letter = useSelector((state) => state.letter.value);

  const [ form, setForm ] = useState({
    jobTitle: '',
    organizationName: '',
    culture: '',
    values: [{
      value: '',
      experience: ''
    }]
  });

  const [ error, setError ] = useState('');

  const setJobTitle = (input) => {
    setForm((prev) => ({ ...prev, jobTitle: input }));
  };

  const setOrganizationName = (input) => {
    setForm((prev) => ({ ...prev, organizationName: input }));
  };
  
  const setCulture = (input) => {
    setForm((prev) => ({ ...prev, culture: input }));
  };

  const setOpening = (input) => {
    dispatch(updateOpening(input));
  };

  const setValues = (input, index) => {
    const newValues = [ ...form.values ];
    newValues[index] = { ...newValues[index], value: input };
    setForm((prev) => ({ ...prev, values: newValues }));
  };

  const setExperience = (input, index) => {
    const newValues = [ ...form.values ];
    newValues[index] = { ...newValues[index], experience: input };
    setForm((prev) => ({ ...prev, values: newValues }));
  };

  const addValue = () => {
    const newValues = [ ...form.values ];
    newValues.push({ value: '', experience: ''});
    setForm((prev) => ({ ...prev, values: newValues }));
  };

  const removeValue = (index) => {
    if (form.values.length > 1) {
      const newValues = [ ...form.values ];
      newValues.splice(index, 1);
      const letterValues = [ ...letter.values ];
      letterValues.splice(index, 1);
      dispatch(updateValues(letterValues));
      setForm((prev) => ({ ...prev, values: newValues }));
    }
  };

  const generateIntroduction = async () => {
    try {
      if (form.jobTitle && form.organizationName && form.culture) {
        const response = await openAI.createCompletion({
          model: "text-davinci-003",
          prompt: `Write a cover letter opening paragraph for ${form.jobTitle} position at a company called ${form.organizationName}. The company's culture is "${form.culture}".`,
          temperature: 0.80,
          max_tokens: 400,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        });
        dispatch(updateOpening(response.data.choices[0].text.trim()));
      } else {
        setError('Missing required information.');
      }
    } catch (error) {
      console.error(error.response ? error.response.body : error);
    }
  };

  const generateValueHighlight = async (index) => {
    try {
      if (form.values[index]) {
        const response = await openAI.createCompletion({
          model: "text-davinci-003",
          prompt: `write a cover letter paragraph highlighting my ${form.values[index].value} ability through the following experiences: ${form.values[index].experience}.`,
          temperature: 0.85,
          max_tokens: 400,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        });
        const newValues = [ ...letter.values ];
        newValues[index] = response.data.choices[0].text.trim();
        dispatch(updateValues(newValues));
      }
    } catch (error) {
      console.error(error.response ? error.response.body : error);
    }
  };

  const generateClosing = async () => {
    try {
      if (form.jobTitle && form.organizationName) {
        const response = await openAI.createCompletion({
          model: "text-davinci-003",
          prompt: `write a cover letter closing paragraph for ${form.jobTitle} position at a company called ${form.organizationName}.`,
          temperature: 0.85,
          max_tokens: 400,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        });
        dispatch(updateClosing(response.data.choices[0].text.trim()));
      }
    } catch (error) {
      console.error(error.response ? error.response.body : error);
    }
  }


  return {
    generateIntroduction,
    setJobTitle,
    setOrganizationName,
    setCulture,
    setValues,
    setExperience,
    addValue,
    removeValue,
    setOpening,
    generateValueHighlight,
    generateClosing,
    error,
    form
  };
};

export default useOpenAI;