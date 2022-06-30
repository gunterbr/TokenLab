const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')
const bodyParser = require('body-parser')
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: '10mb' }))
// const JWT = require('jsonwebtoken')
// const secretWord = 'Samus#Aran'

const dbName = 'gunterbr';
const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
});

const sqlDB = `CREATE DATABASE IF NOT EXISTS ${dbName}`;
const sqlUsers = `CREATE TABLE IF NOT EXISTS ${dbName}.login(
  id int NOT NULL AUTO_INCREMENT UNIQUE,
  user varchar(150) NOT NULL,
  username varchar(150) NOT NULL UNIQUE,
  password varchar(200) NOT NULL,
  PRIMARY KEY (ID)
);`;
const sqlEvents = `CREATE TABLE IF NOT EXISTS ${dbName}.events(
  id int NOT NULL AUTO_INCREMENT UNIQUE,
  backgroundColor varchar(20) NOT NULL UNIQUE,
  title varchar(150) NOT NULL UNIQUE,
  start varchar(150) NOT NULL,
  end varchar(150) NOT NULL,
  PRIMARY KEY (ID)
);`;

db.query(sqlDB, (error) => {
  if(error) return console.log(error);
  console.log('DB: OK!');

	db.query(sqlUsers, (error) => {
		if(error) return console.log(error);
		console.log('Table user: OK!');
	});
		
	db.query(sqlEvents, (error) => {
		if(error) return console.log(error);
		console.log('Table event: OK!');
	});

});

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

app.get('/', (req, res) => {
	res.send('router API')
});

//USUÁRIOS
app.post('/api/login', (req, res) => {
	const { username, password } = req.body;
	
	let mysql = `SELECT * FROM ${dbName}.login WHERE username = ? AND password = ?`;
	db.query(mysql, [username, password], (err, result) => {
		if (err) {
			res.status(500).send(err)
		} else {
			if (result.length > 0) {
				res.status(200).send({
					"id": result[0].id,
					"user": result[0].user,
					"username": result[0].username
				})
			} else {
				res.status(400).send('Usuario no existe')
			}
		}
	});
});

app.post('/api/newuser', (req, res) => {
	const { user, username, password } = req.body;
	
	let mysql = `INSERT INTO ${dbName}.login (user, username, password) VALUES (?, ?, ?)`;
	db.query(mysql, [user, username, password], (err, result) => {
		if (err) {
			res.status(500).send(err)
		} else {
			if (result.affectedRows > 0) {
				res.status(200).send({
					"user": result.user,
					"username": result.username,
					"password": result.password
				})
			} else {
				res.status(400).send('Tente um username diferente')
			}
		}
	});
});

//EVENTOS
app.post("/register", (req, res) => {
	const { title } = req.body;
	const { start } = req.body;
	const { end }   = req.body;
  
	let mysql = `INSERT INTO ${dbName}.events (backgroundColor, title, start, end) VALUES (?, ?, ?, ?)`;
	db.query(mysql, [getRandomColor(), title, start, end], (err, result) => {
	  res.send(result);
	});
});
  
app.post("/search", (req, res) => {
	const { title } = req.body;
	const { start } = req.body;
	const { end } = req.body;
  
	let mysql =
	  `SELECT * FROM ${dbName}.events WHERE title = ? AND start = ? AND end = ?`;
	db.query(mysql, [title, start, end], (err, result) => {
	  if (err) res.send(err);
	  res.send(result);
	});
});
  
app.get("/getCards", (req, res) => {
	let mysql = `SELECT * FROM ${dbName}.events`;
	db.query(mysql, (err, result) => {
	  if (err) {
		console.log(err);
	  } else {
		res.send(result);
	  }
	});
});
  
app.put("/edit", (req, res) => {
	const { id } = req.body;
	const { title } = req.body;
	const { start } = req.body;
	const { end } = req.body;
	let mysql = `UPDATE ${dbName}.events SET title = ?, start = ?, end = ? WHERE id = ?`;
	db.query(mysql, [title, start, end, id], (err, result) => {
	  if (err) {
		res.send(err);
	  } else {
		res.send(result);
	  }
	});
});
  
app.delete("/delete/:id", (req, res) => {
	const { id } = req.params;
	let mysql = `DELETE FROM ${dbName}.events WHERE id = ?`;
	db.query(mysql, id, (err, result) => {
	  if (err) {
		console.log(err);
	  } else {
		res.send(result);
	  }
	});
});

app.listen(4000, () => console.log('Server on port 4000'))