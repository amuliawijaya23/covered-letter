import { useState } from 'react';

import { Configuration, OpenAIApi } from 'openai';

const useOpenAI = () => {
  const config = new Configuration({ apiKey: process.env.REACT_APP_OPENAI_API_KEY });
  const openAI = new OpenAIApi(config);

  const [ form, setForm ] = useState({
    jobTitle: '',
    organizationName: '',
    culture: '',
    values: []
  });

  const [ letter, setLetter ] = useState({
    opening: '',
    values: [],
    closing: ''
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
    setLetter((prev) => ({ ...prev, opening: input }));
  };

  const setValues = (input, index) => {
    const newValues = [ ...form?.values ];
    newValues[index] = { ...newValues[index], value: input };
    setForm((prev) => ({ ...prev, values: newValues }));
  };

  const setExperience = (input, index) => {
    const newValues = [ ...form?.values ];
    newValues[index] = { ...newValues[index], experience: input };
    setForm((prev) => ({ ...prev, values: newValues }));
  };

  const generateIntroduction = async () => {
    try {
      if (form?.jobTitle && form?.organizationName && form?.slogan) {
        const response = await openAI.createCompletion({
          model: "text-davinci-003",
          prompt: `Write a cover letter opening for ${form?.jobTitle} position at a company called ${form?.organizationName}. The company's culture is "${form?.slogan}".`,
          temperature: 0.80,
          max_tokens: 400,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        });
        setLetter((prev) => ({ ...prev, opening: response.data.choices[0].text.trim() }));
      } else {
        setError('Missing required information.');
      }
    } catch (error) {
      console.error(error.response ? error.response.body : error);
    };
  };

  const generateValueHighlight = async (index) => {
    try {
      if (form?.values[index]) {
        const response = await openAI.createCompletion({
          model: "text-davinci-003",
          prompt: `write a cover letter paragraph highlighting my ${form?.values[index]?.value} ability through the following experiences: ${form?.values[index]?.experience}.`,
          temperature: 0.85,
          max_tokens: 400,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        });
        const newValues = [ ...letter?.values ];
        newValues[index] = response.data.choices[0].text.trim();
        setLetter((prev) => ({ ...prev, values: newValues }));
      };
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
    setOpening,
    generateValueHighlight,
    error,
    form,
    letter
  };
}

export default useOpenAI