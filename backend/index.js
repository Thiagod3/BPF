// Importando os módulos necessários
const express = require("express");
const conn = require("./db/conn");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Criando uma instância do Express
const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Rota para receber a imagem e atualizar o banco de dados
app.post('/api/user/uploadImage', (req, res) => {
  const { image, userId } = req.body;

  // Insira o código para atualizar o banco de dados com a imagem aqui
  // Por exemplo, você pode executar uma consulta SQL de atualização

  // Exemplo de consulta de atualização
  const sql = `UPDATE Users SET image = ? WHERE id = ?`;

  conn.query(sql, [image, userId], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar o banco de dados:', err);
      res.status(500).send('Erro ao atualizar o banco de dados');
      return;
    }
    console.log('Imagem atualizada no banco de dados:', result);
    res.status(200).send('Imagem atualizada com sucesso');
  });
});


//Consultar time do usuario
app.get('/api/user/team/:id', (req, res) => {
  const userId = req.params.id;
  const sql = "SELECT t.*, u.id AS user_id, u.name AS user_name FROM Teams AS t JOIN Users AS u ON u.id = t.user_admin_id WHERE u.id = ?";
  conn.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("Erro ao consultar banco de dados:", err);
      return res.status(500).json({ error: "Erro ao consultar banco de dados" });
    }

    return res.status(200).json( results );
    
  });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Consulta SQL para obter o usuário pelo nome de usuário
  const sql = `SELECT * FROM Users WHERE name = ?`;
  conn.query(sql, [username], async (err, results) => {
    if (err) {
      console.error("Erro ao consultar banco de dados:", err);
      return res.status(500).json({ error: "Erro ao fazer login" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Senha ou Usuário incorreto" });
    }

    const user = results[0];

    // Comparando a senha fornecida com a senha armazenada no banco de dados
    try {
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).json({ error: "Senha ou Usuário incorreto" });
      }

      // Gera um token de autenticação
      const token = jwt.sign({ userId: user.id }, "meusegredo", {
        expiresIn: "2h",
      });

      // Retorna o token e userID
      res.json({ token, userId: user.id });
    } catch (error) {
      console.error("Erro ao comparar senhas:", error);
      res.status(500).json({ error: "Erro ao fazer login" });
    }
  });
});

// // Rota protegida
// app.get("/data", authenticateToken, (req, res) => {
//   // Aqui você pode retornar os dados protegidos
//   res.json({ data: "Informações protegidas" });
// });

// Rota para inserir usuarios no banco
app.post("/api/users/create", async (req, res) => {
  const { email, username, password, description, position } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const sql =
    "INSERT INTO users ( email, name, password, description, position) VALUES (?, ?, ?, ?, ?)";
  conn.query(
    sql,
    [email, username, hashedPassword, description, position],
    (err, result) => {
      if (err) {
        console.error("Erro ao inserir usuario no banco de dados:", err);
        res.status(500).json({ error: "Erro interno do servidor." });
      } else {
        console.log("Usuario inserido com sucesso.");
        res
          .status(201)
          .json({ message: "Usuario criado com sucesso: " + result });
      }
    }
  );
});

function findUserById(userId) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT id, name, email, description, image, position FROM users WHERE id = ?";
    conn.query(sql, [userId], (error, results) => {
      if (error) {
        console.log("Erro FindById" + error)
        reject(error);
        return;
      }
      resolve(results[0]); // Retorna o primeiro usuário encontrado ou null se não houver resultados
    });
  });
}

// Middleware para verificar o token de autenticação
function authenticateToken(req, res, next) {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: "Token não fornecido" });
  }
  

  jwt.verify(token, "meusegredo", (err, decoded) => {
    if (err) {
      console.log(err)
      return res.status(403).json({ error: "Token inválido" });
    }
    req.userId = decoded.userId;
    next();
  });
}

app.get("/user/profile/:userId", authenticateToken, async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await findUserById(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    res.json(user);
  } catch (error) {
    console.error("Erro ao buscar dados do usuário:", error);
    res.status(500).json({ error: "Erro ao buscar dados do usuário Erro B" });
  }
});

// Rota para buscar todos os usuários
app.get("/api/users", (req, res) => {
  const query = "SELECT * FROM Users";
  conn.query(query, (err, results) => {
    if (err) {
      console.error("Erro ao executar a consulta:", err.message);
      res.status(500).json({ error: "Erro interno do servidor" });
    } else {
      res.json(results);
    }
  });
});

// Rota para inserir partidas no banco
app.post("/api/matches/create", (req, res) => {
  const { name, location, field, price, paid, date, time_organizador_id } = req.body;
  const sql =
    "INSERT INTO matches (name, location, field, price, paid, date, time_organizador_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
  conn.query(sql, [name, location, field, price, paid, date, time_organizador_id], (err, result) => {
    if (err) {
      console.error("Erro ao inserir match no banco de dados:", err);
      res.status(500).json({ error: "Erro interno do servidor." });
    } else {
      console.log("Match inserido com sucesso.");
      res.status(201).json({ message: "Match criado com sucesso: " + result });
    }
  });
});

// Rota para buscar uma partida
app.get("/api/matches/:id", (req, res) => {
  const query = "SELECT * FROM Matches WHERE id = " + req.params.id;
  conn.query(query, (err, results) => {
    if (err) {
      console.error("Erro ao executar a consulta:", err.message);
      res.status(500).json({ error: "Erro interno do servidor" });
    } else {
      res.json(results);
    }
  });
});

app.delete("/api/matches/delete/:id", (req, res) => {
  const sql =
    "DELETE FROM matches WHERE time_organizador_id = " + req.params.id;
  conn.query(sql, (err, result) => {
    if (err) {
      console.error("Erro ao inserir match no banco de dados:", err);
      res.status(500).json({ error: "Erro interno do servidor." });
    } else {
      console.log("Match inserido com sucesso.");
      res.status(201).json({ message: "Match criado com sucesso: " + result });
    }
  });
});

// Rota para buscar todos as partidas
app.get("/api/matches", (req, res) => {
  //const query = 'SELECT * FROM Matches';
  const query = `SELECT Matches.*, Teams.name as TIME,  Teams.image
    FROM Matches
    INNER JOIN Teams ON Matches.time_organizador_id = Teams.id
    WHERE Teams.id = Matches.time_organizador_id;`;

  conn.query(query, (err, results) => {
    if (err) {
      console.error("Erro ao executar a consulta:", err.message);
      res.status(500).json({ error: "Erro interno do servidor" });
    } else {
      res.json(results);
    }
  });
});

// Rota para buscar todos os times
app.get("/api/teams", (req, res) => {
  const query = "SELECT * FROM Teams";
  conn.query(query, (err, results) => {
    if (err) {
      console.error("Erro ao executar a consulta:", err.message);
      res.status(500).json({ error: "Erro interno do servidor" });
    } else {
      res.json(results);
    }
  });
});


// Iniciando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
