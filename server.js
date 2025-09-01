const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const JSON_PATH = path.join(__dirname, 'bdjson.json');

app.use(express.static(__dirname));
app.use(bodyParser.json());

// Ler dados
app.get('/api/dados', (req, res) => {
    console.log('Requisição GET recebida em /api/dados');
  const data = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'));
  res.json(data);
});

// Atualizar dados
app.post('/api/dados', (req, res) => {
    console.log('Requisição post recebida em /api/dados');

  fs.writeFileSync(JSON_PATH, JSON.stringify(req.body, null, 2));
  res.json({ status: 'ok' });
});

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
