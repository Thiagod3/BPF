// const { Sequelize } = require('sequelize')

// const sequelize = new Sequelize('nodesequelize', 'root', '', {
//   host: 'localhost',
//   dialect: 'mysql',
// })

// // try {
// //   sequelize.authenticate()
// //   console.log('Conectamos com o Sequelize!')
// // } catch (error) {
// //   console.error('Não foi possível conectar:', error)
// // }

// module.exports = sequelize

const mysql = require('mysql2')

// Configurações do banco de dados MySQL
const connection = mysql.createConnection({
  host: 'localhost', // Endereço do servidor MySQL
  user: 'root', // Seu nome de usuário MySQL
  password: '', // Sua senha MySQL
  database: 'bpf' // Nome do banco de dados MySQL
});

// Conectando ao banco de dados MySQL
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados MySQL:', err.message);
  } else {
    console.log('Conectado ao banco de dados MySQL.');
  }
});

module.exports = connection
