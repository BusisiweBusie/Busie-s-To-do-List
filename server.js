const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let tasks = [];

app.use(express.static('public'));

// Get tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Add task
app.post('/tasks', (req, res) => {
    const task = req.body.task;
    tasks.push(task);
    res.json({ message: 'Task added successfully' });
});

// Delete task
app.delete('/tasks/:id', (req, res) => {
    const id = req.params.id;
    tasks = tasks.filter((task, index) => index != id);
    res.json({ message: 'Task deleted successfully' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
