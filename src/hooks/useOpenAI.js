import { useState } from 'react';

import { Configuration, OpenAIApi } from 'openai';

const useOpenAI = () => {
  const config = new Configuration({ apiKey: process.env.REACT_APP_OPENAI_API_KEY });
  const openAI = new OpenAIApi(config);

  const [ form, setForm ] = useState({
    jobTitle: '',
    organizationName: '',
    slogan: ''
  });

  const [ letter, setLetter ] = useState({
    opening: '',
    strengths: [],
    closing: ''
  });

  const [ error, setError ] = useState('');

  const setJobTitle = (input) => {
    setForm((prev) => ({ ...prev, jobTitle: input }));
  };

  const setOrganizationName = (input) => {
    setForm((prev) => ({ ...prev, organizationName: input }));
  };
  
  const setSlogan = (input) => {
    setForm((prev) => ({ ...prev, slogan: input }));
  };

  const setOpening = (input) => {
    setLetter((prev) => ({ ...prev, opening: input }));
  };

  const generateIntroduction = async () => {
    try {
      if (form?.jobTitle && form?.organizationName && form?.slogan) {
        const response = await openAI.createCompletion({
          model: "text-davinci-003",
          prompt: `Write a cover letter opening for ${form?.jobTitle} position at ${form?.organizationName}. The company's vision is "${form?.slogan}".`,
          temperature: 0.80,
          max_tokens: 500,
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


  return {
    generateIntroduction,
    setJobTitle,
    setOrganizationName,
    setSlogan,
    setOpening,
    error,
    form,
    letter
  };
}

export default useOpenAI