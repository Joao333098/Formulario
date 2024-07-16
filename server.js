const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/formdb', { useNewUrlParser: true, useUnifiedTopology: true });

const FormSchema = new mongoose.Schema({
  questions: Array,
  webhook: String,
  criteria: String,
  url: String
});

const Form = mongoose.model('Form', FormSchema);

app.post('/create-form', async (req, res) => {
  const { questions, webhook, criteria } = req.body;
  const url = generateUniqueUrl();
  const form = new Form({ questions, webhook, criteria, url });
  await form.save();
  res.json({ url });
});

app.get('/form/:url', async (req, res) => {
  const form = await Form.findOne({ url: req.params.url });
  res.json(form);
});

app.post('/submit-form/:url', async (req, res) => {
  const { answers } = req.body;
  const form = await Form.findOne({ url: req.params.url });

  // Enviar respostas para o webhook
  await axios.post(form.webhook, {
    url: req.params.url,
    answers
  });

  res.send('Respostas enviadas com sucesso!');
});

app.post('/select-candidates', async (req, res) => {
  const { criteria } = req.body;
  const forms = await Form.find({ criteria: { $regex: new RegExp(criteria, 'i') } });
  const candidates = forms.map(form => ({
    name: form.url, // ou qualquer outra informação relevante
    answers: form.questions // ou qualquer outra informação relevante
  }));
  res.json({ candidates });
});

function generateUniqueUrl() {
  return Math.random().toString(36).substr(2, 9);
}

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
