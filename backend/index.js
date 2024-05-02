// Importando os módulos necessários
const express = require('express');
const conn = require('./db/conn')
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

// Criando uma instância do Express
const app = express();
const port = 5000;

app.use(bodyParser.json());

// Rota para inserir usuarios no banco
app.post('/api/users/create', async (req, res) => {
  const { email, username, password, description, position } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const sql = 'INSERT INTO users ( email, name, password, description, position) VALUES (?, ?, ?, ?, ?)';
  conn.query(sql, [email, username, hashedPassword, description, position], (err, result) => {
    if (err) {
      console.error('Erro ao inserir usuario no banco de dados:', err);
      res.status(500).json({ error: 'Erro interno do servidor.' });
    } else {
      console.log('Usuario inserido com sucesso.');
      res.status(201).json({ message: 'Usuario criado com sucesso: ' + result });
    }
  });
});

// Rota para buscar todos os usuários
app.get('/api/users', (req, res) => {
  const query = 'SELECT * FROM Users';
  conn.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err.message);
      res.status(500).json({ error: 'Erro interno do servidor' });
    } else {
      res.json(results);
    }
  });
});

// Rota para inserir partidas no banco
app.post('/api/matches/create', (req, res) => {
  const { name, location, field, paid, date, } = req.body;
  const sql = 'INSERT INTO matches (name, location, field, paid, date) VALUES (?, ?, ?, ?, ?)';
  conn.query(sql, [name, location, field, paid, date], (err, result) => {
    if (err) {
      console.error('Erro ao inserir match no banco de dados:', err);
      res.status(500).json({ error: 'Erro interno do servidor.' });
    } else {
      console.log('Match inserido com sucesso.');
      res.status(201).json({ message: 'Match criado com sucesso: ' + result });
    }
  });
});

// Rota para buscar uma partida
app.get('/api/matches/:id', (req, res) => {
  const query = 'SELECT * FROM Matches WHERE id = ' + req.params.id;
  conn.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err.message);
      res.status(500).json({ error: 'Erro interno do servidor' });
    } else {
      res.json(results);
    }
  });
});

// Rota para buscar todos as partidas
app.get('/api/matches', (req, res) => {
  //const query = 'SELECT * FROM Matches';
  const query = 
  `SELECT Matches.*, Teams.name as TIME,  Teams.image
    FROM Matches
    INNER JOIN Teams ON Matches.time_organizador_id = Teams.id
    WHERE Teams.id = Matches.time_organizador_id;`;

  conn.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err.message);
      res.status(500).json({ error: 'Erro interno do servidor' });
    } else {
      res.json(results);
    }
  });
});

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});