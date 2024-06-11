// Importando os módulos necessários
const express = require("express");
const conn = require("./db/conn");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Criando uma instância do Express
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.delete("/api/user/deletePlayer/:teamId/:playerId", (req, res) => {
  const teamId = req.params.teamId
  const playerId = req.params.playerId

  const query = "DELETE FROM jogadores WHERE time_id = ? AND usuario_id = ?;"

  conn.query(query, [teamId, playerId], (err, results) => {
    if(err) {
      console.log('Erro na busca de jogadores: ' + err)
      return res.status(500).send("Erro ao buscar Jogadores.");
    }

    return res.status(200).send("Usuario: deletado com sucesso");
  })
})

app.get("/api/teamPlayers/:teamId", (req, res) => {
  const teamId = req.params.teamId;
  //console.log(teamId)

  const query = `
  select t.id as ID_Time, t.name as TEAM, t.numberPlayers as Numero_de_Jogadores, j.usuario_id as Jogador_ID, u.name as Jogador, u.position as position, u.image as image, u.description as description
  from Teams as t
  join Jogadores as j on t.id = j.time_id
  join Users as u on j.usuario_id = u.id where t.id = ?`;

  conn.query(query, [teamId], (err, results) => {
    if(err) {
      console.log('Erro na busca de jogadores: ' + err)
      return res.status(500).send("Erro ao buscar Jogadores.");
    }
   
    return res.status(200).json(results);

  })
});

app.get("/api/user/team-by-admin/:user_admin_id", (req, res) => {
  const { user_admin_id } = req.params;

  const query = "SELECT * FROM teams WHERE user_admin_id = ?";
  conn.query(query, [user_admin_id], (err, results) => {
    if (err) {
      console.error("Erro ao buscar time:", err);
      return res.status(500).send("Erro ao buscar time.");
    }

    if (results.length === 0) {
      return res.status(404).send("Time não encontrado.");
    }

    console.log("Time do admin:" + results[0]);
    res.status(200).json(results[0]);
  });
});

// Rota para inserir um novo jogador
app.post("/api/user/add-player", (req, res) => {
  const { user_id, team_id } = req.body;

  console.log("Usuario: " + user_id + " Time: " + team_id);

  if (!user_id || !team_id) {
    return res
      .status(400)
      .send("Os campos user_id e team_id são obrigatórios.");
  }

  const checkPlayerQuery = "SELECT * FROM jogadores WHERE usuario_id = ?";
  conn.query(checkPlayerQuery, [user_id], (err, playerResult) => {
    if (err) {
      console.error("Erro ao verificar jogador:", err);
      return res.status(500).send("Erro ao verificar jogador.");
    }

    if (playerResult.length > 0) {
      return res.status(409).send("Este jogador já está cadastrado no time.");
    }
    const checkAdminQuery = "SELECT * FROM teams WHERE user_admin_id = ?";
    conn.query(checkAdminQuery, [user_id], (err, adminResult) => {
      if (err) {
        console.error("Erro ao verificar administrador:", err);
        return res.status(500).send("Erro ao verificar administrador.");
      }

      if (adminResult.length === 0) {
        // Se o jogador não for administrador de nenhum time, insira como jogador
        const insertQuery = "INSERT INTO jogadores (usuario_id, time_id) VALUES (?, ?)";
        conn.query(insertQuery, [user_id, team_id], (err, insertResult) => {
          if (err) {
            console.error("Erro ao inserir jogador:", err);
            return res.status(500).send("Erro ao inserir jogador.");
          }
          res.status(200).send("Jogador inserido com sucesso.");
        });
      } else {
        // Se o jogador for administrador de algum time, retorne um erro
        return res.status(403).send("Este jogador é um administrador de outro time.");
      }
    });
  });
});

// Rota para receber a imagem do usuario e atualizar o banco de dados
app.post("/api/user/uploadImage", (req, res) => {
  const { image, userId } = req.body;

  const sql = `UPDATE Users SET image = ? WHERE id = ?`;

  conn.query(sql, [image, userId], (err, result) => {
    if (err) {
      console.error("Erro ao atualizar o banco de dados:", err);
      res.status(500).send("Erro ao atualizar o banco de dados");
      return;
    }
    console.log("Imagem do usuario atualizada no banco de dados:", result);
    res.status(200).send("Imagem do usuario atualizada com sucesso");
  });
});

// Rota para receber a imagem do time e atualizar o banco de dados
app.post("/api/team/uploadImage", (req, res) => {
  const { image, userId } = req.body;

  const sql = `UPDATE Teams SET image = ? WHERE user_admin_id = ?`;

  conn.query(sql, [image, userId], (err, result) => {
    if (err) {
      console.error("Erro ao atualizar o banco de dados:", err);
      res.status(500).send("Erro ao atualizar o banco de dados");
      return;
    }
    console.log("Imagem do time atualizada no banco de dados:", result);
    res.status(200).send("Imagem do time atualizada com sucesso");
  });
});

app.post("/api/team/create", (req, res) => {
  const {
    newName,
    newBio,
    numberOfPlayers,
    newImage,
    numberOfMatches,
    userId,
  } = req.body;
  console.log(req.body);
  const sql =
    "INSERT INTO teams (name, description, numberPlayers, numberMatches, user_admin_id) VALUES (?, ?, ?, ?, ?);";

  conn.query(
    sql,
    [newName, newBio, numberOfPlayers, numberOfMatches, userId],
    (err, results) => {
      if (err) {
        console.error("Erro ao inserir o time no banco de dados: ", err);
        return res
          .status(500)
          .json({ error: "Erro ao inserir o time no banco de dados" });
      }

      return res.status(200).json(results);
    }
  );
});

//Consultar time do usuario
app.get("/api/user/team/:id", (req, res) => {
  const userId = req.params.id;
  const sql =
    "SELECT t.*, u.id AS user_id, u.name AS user_name FROM Teams AS t JOIN Users AS u ON u.id = t.user_admin_id WHERE u.id = ?";
  conn.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("Erro ao consultar banco de dados:", err);
      return res
        .status(500)
        .json({ error: "Erro ao consultar banco de dados" });
    }

    return res.status(200).json(results);
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
  const { email, username, password, description, position, city } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const sql =
    "INSERT INTO users ( email, name, password, description, position, city) VALUES (?, ?, ?, ?, ?, ?)";
  conn.query(
    sql,
    [email, username, hashedPassword, description, position, city],
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
    const sql =
      "SELECT id, name, email, description, image, position, city FROM users WHERE id = ?";
    conn.query(sql, [userId], (error, results) => {
      if (error) {
        console.log("Erro FindById" + error);
        reject(error);
        return;
      }
      resolve(results[0]); // Retorna o primeiro usuário encontrado ou null se não houver resultados
    });
  });
}

// Middleware para verificar o token de autenticação
function authenticateToken(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  jwt.verify(token, "meusegredo", (err, decoded) => {
    if (err) {
      console.log(err);
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

app.put("/api/user/update/bio/:id/:newBio", (req, res) => {
  const id = req.params.id;
  const newBio = req.params.newBio;

  const sql = "UPDATE users SET description = ? WHERE id = ?";
  conn.query(sql, [newBio, id], (err, result) => {
    if (err) {
      console.error("Erro ao atualizar a bio no banco de dados:", err);
      res.status(500).json({ error: "Erro interno do servidor." });
    } else {
      console.log("Bio atualizada com sucesso.");
      res
        .status(200)
        .json({ message: "Bio atualizada com sucesso: " + result });
    }
  });
});

app.put("/api/user/update/city/:id/:newCity", (req, res) => {
  const id = req.params.id;
  const newCity = req.params.newCity;

  const sql = "UPDATE users SET city = ? WHERE id = ?";
  conn.query(sql, [newCity, id], (err, result) => {
    if (err) {
      console.error("Erro ao atualizar a Cidade no banco de dados:", err);
      res.status(500).json({ error: "Erro interno do servidor." });
    } else {
      console.log("Cidade atualizada com sucesso.");
      res
        .status(200)
        .json({ message: "Cidade atualizada com sucesso: " + result });
    }
  });
});

app.put("/api/user/update/position/:id/:position", (req, res) => {
  const id = req.params.id;
  const position = req.params.position;

  const sql = "UPDATE users SET position = ? WHERE id = ?";
  conn.query(sql, [position, id], (err, result) => {
    if (err) {
      console.error("Erro ao atualizar a Cidade no banco de dados:", err);
      res.status(500).json({ error: "Erro interno do servidor." });
    } else {
      console.log("Cidade atualizada com sucesso.");
      res
        .status(200)
        .json({ message: "Cidade atualizada com sucesso: " + result });
    }
  });
});

// Rota para inserir partidas no banco
app.post("/api/matches/create", (req, res) => {
  const {
    city,
    location,
    field,
    price,
    paid,
    date,
    time_organizador_id,
    contact,
  } = req.body;
  const sql =
    "INSERT INTO matches (city, location, field, price, paid, date, time_organizador_id, contact) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  conn.query(
    sql,
    [city, location, field, price, paid, date, time_organizador_id, contact],
    (err, result) => {
      if (err) {
        console.error("Erro ao inserir match no banco de dados:", err);
        res.status(500).json({ error: "Erro interno do servidor." });
      } else {
        console.log("Match inserido com sucesso.");
        res
          .status(201)
          .json({ message: "Match criado com sucesso: " + result });
      }
    }
  );
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

app.get("/api/teamsNoUser/:id", (req, res) => {
  console.log("tt" + req.params.teamId);
  const sql = "SELECT * FROM teams WHERE id != " + req.params.id;
  conn.query(query, (err, results) => {
    if (err) {
      console.error("Erro ao executar a consulta:", err.message);
      res.status(500).json({ error: "Erro interno do servidor" });
    } else {
      res.json(results);
    }
  });
});

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

app.put("/api/teams/incrementMatches/:userTeamId/:rivalTeamId", (req, res) => {
  const sql =
    "UPDATE teams " +
    "SET numberMatches = numberMatches + 1 " +
    "WHERE id IN (" +
    req.params.userTeamId +
    ", " +
    req.params.rivalTeamId +
    ");";
  conn.query(sql, (err, result) => {
    if (err) {
      console.error("Erro ao atualizar a Cidade no banco de dados:", err);
      res.status(500).json({ error: "Erro interno do servidor." });
    } else {
      console.log("Cidade atualizada com sucesso.");
      res
        .status(200)
        .json({ message: "Cidade atualizada com sucesso: " + result });
    }
  });
});

// Iniciando o servidor
app.listen(process.env.PORT || 5000, () => {
  console.log(`Servidor rodando`);
});
