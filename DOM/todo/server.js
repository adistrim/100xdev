const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const zod = require('zod');
require('dotenv').config();

const mongoUrl = process.env.mongoUrl;

try {
    mongoose.connect(mongoUrl);
    console.log('Connected to MongoDB');
} catch (error) {
    console.error('Error connecting to MongoDB:', error);
}

const Todo = mongoose.model('Todo', {
    title: String,
    status: Boolean
})

const app = express()
app.use(express.json())
// Using CORS middleware
app.use(cors());

// input validation schema
const todoSchema = zod.object({
    title: zod.string().min(1),
    status: zod.boolean()
});

// Middleware to validate input
const validateTodo = (req, res, next) => {
    const { error } = todoSchema.safeParse(req.body);
    if (error) {
        return res.status(400).send(error.message);
    }
    next();
};

// Middleware to validate update input
const validateTodoUpdate = (req, res, next) => {
    const { id } = req.params;
    const { status } = req.body;

    // Validating if the status is boolean
    if (typeof status !== 'boolean') {
        return res.status(400).send('Invalid status value. Status must be boolean.');
    }

    // Validating if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send('Invalid todo ID.');
    }

    next();
};

app.post('/todos', validateTodo, async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    const title = req.body.title;
    const status = req.body.status;

    try {
        const todo = new Todo({
            title: title,
            status: status
        });

        await todo.save();
        console.log('Saved', todo);
        res.send('Saved');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send(error); // Sending internal server error status
    }
});

app.get('/todos', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    const todos = await Todo.find();
    res.send(todos);
})


app.put('/todo/:id', validateTodoUpdate, async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const updatedTodo = await Todo.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedTodo) {
            return res.status(404).send('Todo not found');
        }
        res.json(updatedTodo);
    } catch (error) {
        console.error('Error updating todo:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(3000)