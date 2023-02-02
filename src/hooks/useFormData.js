/* eslint-disable camelcase */
import { useState, useEffect } from 'react';

import { Configuration, OpenAIApi } from 'openai';

import { useSelector, useDispatch } from 'react-redux';
import { updateOpening, updateBody, updateClosing, resetForm } from '../state/reducers/letterReducer';

import { db } from '../firebase';
import {
  collection,
  query,
  where,
  addDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

const useFormData = () => {
  const config = new Configuration({ apiKey: process.env.REACT_APP_OPENAI_API_KEY });
  const openAI = new OpenAIApi(config);

  // global state
  const dispatch = useDispatch();
  const letter = useSelector((state) => state.letter.value);
  const user = useSelector((state) => state.user.value);

  const [ title, setTitle ] = useState('');
  const [ job, setJob ] = useState('');
  const [ organization, setOrganization ] = useState('');
  const [ culture, setCulture ] = useState('');
  const [ experience, setExperience ] = useState('');
  const [ reason, setReason ] = useState('');
  const [ values, setValues ] = useState(
    [
      {
        value: '',
        feat: ''
      }
    ]
  );

  const [ error, setError ] = useState('');
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    return () => {
      setTitle('');
      setJob('');
      setOrganization('');
      setCulture('');
      setExperience('');
      setReason('');
      setValues(
        [
          {
            value: '',
            feat: ''
          }
        ]
      );
      dispatch(resetForm());
    };
  }, [dispatch]);

  const resetErrorAlert = () => {
    setError('');
  };

  // Opening section
  const updateTitle = (input) => {
    setTitle(input);
  };

  const updateJob = (input) => {
    setJob(input);
  };

  const updateOrganization = (input) => {
    setOrganization(input);
  };
  
  const updateCulture = (input) => {
    setCulture(input);
  };

  const updateExperience = (input) => {
    setExperience(input);
  };

  const updateReason = (input) => {
    setReason(input);
  };

  const generateIntroduction = async () => {
    try {
      if (job && organization && experience) {
        
        dispatch(updateOpening(''));
        setLoading(true);

        let prompt = `Write a cover letter opening paragraph for ${job} position at a company called ${organization}.`;

        if (culture) {
          prompt += ` This company's culture is "${culture}".`
        };

        if (experience) {
          prompt += ` I have ${experience} of experience in this field`;
        };

        if (reason) {
          prompt += ` and I would like to work for this company because ${reason}`;
        };

        prompt += `.`;

        const response = await openAI.createCompletion({
          model: "text-davinci-003",
          prompt: prompt,
          temperature: 0.80,
          max_tokens: 400,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        });
        dispatch(updateOpening(response.data.choices[0].text.trim()));
        setLoading(false);
      } else {

        const reqFields = [
          {
            name: 'Job Title', 
            filled: Boolean(job)
          },
          {
            name: 'Organization Name', 
            filled: Boolean(organization)
          },
          {
            name: 'Experience', 
            filled: Boolean(experience)
          },
        ];

        const missingFields = reqFields.filter((field) => !field.filled );

        let errorMessage = 'Unable to generate introduction. ';

        if (missingFields.length === 1) {
          errorMessage += `${missingFields[0].name} is a required information.`;
        };

        if (missingFields.length === 2) {
          errorMessage += `${missingFields[0].name} and ${missingFields[1].name} are required information.`;
        };

        if (missingFields.length === 3) {
          errorMessage += `${missingFields[0].name}, ${missingFields[1].name} and ${missingFields[2].name} are required information.`
        };

        setError(errorMessage);
      }
    } catch (error) {
      console.error(error.response ? error.response.body : error);
    }
  };

  // Body Section
  const updateValue = (input, index) => {
    const newValues = [ ...values ];
    newValues[index] = { ...newValues[index], value: input };
    setValues(newValues);
  };

  const updateFeat = (input, index) => {
    const newValues = [ ...values ];
    newValues[index] = { ...newValues[index], feat: input };
    setValues(newValues);
  };

  const addValue = () => {
    const newValues = [ ...values ];
    newValues.push({ value: '', feat: ''});
    setValues(newValues);
  };

  const removeValue = (index) => {
    if (values.length > 1) {
      const newValues = [ ...values ];
      newValues.splice(index, 1);
      const letterBody = [ ...letter.body ];
      letterBody.splice(index, 1);
      setValues(newValues);
      dispatch(updateBody(letterBody));
    };
  };

  const generateValueHighlight = async (index) => {
    try {
      if (values[index].value && values[index].feat) {
        setLoading(index);
        const newBody = [ ...letter.body ];
        newBody.splice(index, 1);
        dispatch(updateBody(newBody));
        const response = await openAI.createCompletion({
          model: "text-davinci-003",
          prompt: `write a cover letter paragraph highlighting my ${values[index].value} ability through the following experiences: ${values[index].feat}.`,
          temperature: 0.85,
          max_tokens: 400,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        });
        const letterBody = [...newBody];
        letterBody.splice(index, 0, response.data.choices[0].text.trim());
        dispatch(updateBody(letterBody));
        setLoading(false);
      } else {
        setError(index);
      }
    } catch (error) {
      setLoading(false);
      console.error(error.response ? error.response.body : error);
    }
  };

  // Closing Section
  const generateClosing = async () => {
    try {
      if (job && organization) {
        setLoading(true);
        dispatch(updateClosing(''));
        const response = await openAI.createCompletion({
          model: "text-davinci-003",
          prompt: `write a cover letter enclosure paragraph for ${job} position at a company called ${organization}. Signature line not required.`,
          temperature: 0.85,
          max_tokens: 400,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        });
        dispatch(updateClosing(response.data.choices[0].text.split('Sincerely,\n[Your Name]')[0].trim()));
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error(error.response ? error.response.body : error);
    }
  };

  const saveLetter = async (contentInHtml) => {
    try {
      if (title && job && organization && user.uid && contentInHtml) {
        const lettersRef = collection(db, 'letters');
        const featsRef = collection(db, 'feats');
        Promise.all(values.map( async (value, index) => await addDoc(featsRef, {
          value: value.value,
          feat: value.feat,
          content: letter.body[index],
          user_id: user.uid,
          date_created: new Date(),
          date_updated: new Date()
        })));
        await addDoc(lettersRef, {
          name: title,
          content: contentInHtml,
          job_title: job,
          organization_name: organization,
          user_id: user.uid,
          date_created: new Date(),
          date_updated: new Date()
        });
      }
    } catch (error) {
      console.error(error.response ? error.response.bdy : error);
    }
  };

  return {
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
  };
};

export default useFormData;