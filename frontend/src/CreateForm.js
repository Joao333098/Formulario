import React, { useState } from 'react';
import axios from 'axios';

const CreateForm = () => {
  const [questions, setQuestions] = useState(['']);
  const [webhook, setWebhook] = useState('');
  const [criteria, setCriteria] = useState('');
  const [url, setUrl] = useState('');

  const handleAddQuestion = () => {
    setQuestions([...questions, '']);
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index] = value;
    setQuestions(newQuestions);
  };

  const handleSaveForm = async () => {
    const response = await axios.post('/create-form', { questions, webhook, criteria });
    setUrl(response.data.url);
  };

  return (
    <div>
      <h1>Criar Formulário</h1>
      {questions.map((question, index) => (
        <div key={index}>
          <input
            type="text"
            value={question}
            onChange={(e) => handleQuestionChange(index, e.target.value)}
            placeholder={`Pergunta ${index + 1}`}
          />
        </div>
      ))}
      <button onClick={handleAddQuestion}>Adicionar Pergunta</button>
      <div>
        <label>Webhook:</label>
        <input
          type="text"
          value={webhook}
          onChange={(e) => setWebhook(e.target.value)}
          placeholder="URL do Webhook"
        />
      </div>
      <div>
        <label>Critérios de Seleção:</label>
        <input
          type="text"
          value={criteria}
          onChange={(e) => setCriteria(e.target.value)}
          placeholder="Critérios de Seleção"
        />
      </div>
      <button onClick={handleSaveForm}>Salvar e Gerar Link</button>
      {url && <div>Link do Formulário: {window.location.origin}/form/{url}</div>}
    </div>
  );
};

export default CreateForm;
