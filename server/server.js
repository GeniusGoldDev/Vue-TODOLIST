const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todo_db'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL connected...');
});

// Get all todos
app.get('/todos', (req, res) => {
    db.query('SELECT * FROM todos', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Add a new todo
app.post('/todos', (req, res) => {
    const todo = req.body;
    db.query('INSERT INTO todos SET ?', todo, (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId, ...todo });
    });
});

// Update a todo
app.put('/todos/:id', (req, res) => {
    const { id } = req.params;
    const updatedTodo = req.body;
    db.query('UPDATE todos SET ? WHERE id = ?', [updatedTodo, id], (err) => {
        if (err) throw err;
        res.json({ id, ...updatedTodo });
    });
});

// Delete a todo
app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM todos WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.json({ id });
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

// Register a user
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err) => {
        if (err) return res.status(500).send("There was a problem registering the user.");
        res.status(200).send("User registered successfully.");
    });
});

// Login a user
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) return res.status(500).send("There was a problem logging in.");
        if (results.length === 0) return res.status(404).send("User not found.");

        const user = results[0];
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

        const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: 86400 }); // expires in 24 hours
        res.status(200).send({ auth: true, token });
    });
});