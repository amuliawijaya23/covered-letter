import React from 'react';

import { Configuration, OpenAIApi } from 'openai';

const useOpenAI = () => {
  const config = new Configuration({ apiKey: process.env.REACT_APP_OPENAI_API_KEY });
  const openAI = new OpenAIApi(config);


  return {};
}

export default useOpenAI