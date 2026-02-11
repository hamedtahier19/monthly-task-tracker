const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'data', 'tasks.json');

// Helper to read data
const readData = () => {
    try {
        if (!fs.existsSync(DATA_FILE)) return [];
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading data:", err);
        return [];
    }
};

// Helper to write data
const writeData = (data) => {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
        return true;
    } catch (err) {
        console.error("Error writing data:", err);
        return false;
    }
};

// GET all tasks
app.get('/api/tasks', (req, res) => {
    const tasks = readData();
    res.json(tasks);
});

// POST to update tasks (e.g. toggle done, add task via full update)
app.post('/api/tasks', (req, res) => {
    const newTasks = req.body;
    if (writeData(newTasks)) {
        res.json({ message: 'Tasks updated successfully', tasks: newTasks });
    } else {
        res.status(500).json({ message: 'Error saving tasks' });
    }
});

// Start server
if (!fs.existsSync(path.join(__dirname, 'data'))) {
    fs.mkdirSync(path.join(__dirname, 'data'));
}
// Initialize tasks.json if empty
if (!fs.existsSync(DATA_FILE)) {
    // Initial structure based on guide
    // Start with empty array or structure as requested
    writeData([]);
}

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
