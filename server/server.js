const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

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
