const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // IMPORTAÇÃO DO CORS
const app = express();
const PORT = process.env.PORT || 3000;

// MIDDLEWARES
app.use(cors()); // ATIVAR CORS para todas as origens
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dataFile = path.join(__dirname, 'messages.json');

function saveMessage(message) {
  let messages = [];
  if (fs.existsSync(dataFile)) {
    try {
      const data = fs.readFileSync(dataFile, 'utf8');
      messages = JSON.parse(data);
    } catch (err) {
      console.error('Erro ao ler o arquivo messages.json:', err);
      messages = [];
    }
  }
  messages.push(message);
  fs.writeFileSync(dataFile, JSON.stringify(messages, null, 2));
}

app.post('/send-message', (req, res) => {
  const { name, email, phone, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Campos obrigatórios faltando' });
  }
  
  saveMessage({ name, email, phone, message, date: new Date().toISOString() });
  
  return res.json({ success: true, message: 'Mensagem salva com sucesso!' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
