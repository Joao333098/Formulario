import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AnswerForm = () => {
  const { url } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchForm = async () => {
      const response = await axios.get(`/form/${url}`);
      setQuestions(response.data.questions);
      setAnswers(response.data.questions.map(() => ''));
    };
    fetchForm();
  }, [url]);

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    await axios.post(`/submit-form/${url}`, { answers });
    alert('Respostas enviadas com sucesso!');
  };

  return (
    <div>
      <h1>Formulário de Inscrição</h1>
      {questions.map((question, index) => (
        <div key={index}>
          <label>{question}</label>
          <input
            type="text"
            value={answers[index]}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
          />
        </div>
      ))}
      <button onClick={handleSubmit}>Enviar Respostas</button>
    </div>
  );
};

export default AnswerForm;
