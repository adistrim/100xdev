const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const zod = require('zod');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const mongoUrl = process.env.mongoUrl;
const jwtPass = process.env.jwtPass;
const todoDb = process.env.todoDb;
const userDb = process.env.userDb;

let todoConnection;
let userConnection;

try {
    todoConnection = mongoose.createConnection(`${mongoUrl}/${todoDb}`);
    userConnection = mongoose.createConnection(`${mongoUrl}/${userDb}`);
    console.log('Connected to MongoDB');
} catch (error) {
    console.error('Error connecting to MongoDB:', error);
}

const Todo = todoConnection.model('Todo', {
    title: String,
    status: Boolean
});

const User = userConnection.model('User', {
    username: String,
    password: String
});

const app = express()
app.use(express.json())
// Using CORS middleware
app.use(cors());

// username and password validation schema
const userSchema = zod.object({
    username: zod.string().min(6),
    password: zod.string().min(8)
});

// input validation schema
const todoSchema = zod.object({
    title: zod.string().min(1),
    status: zod.boolean()
});

// decoding jsonwebtoken
const decodeJwt = (token) => {
    const decoded = jwt.decode(token);
    if (!decoded) {
        return false
    }
    return true
}

 // verifying jsonwebtoken
const verifyJwt = (token) => {
    try {
        jwt.verify(token, jwtPass);
        return true
    } catch (error) {
        return false
    }
}

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

// add user
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    const { error } = userSchema.safeParse(req.body);
    if (error) {
        return res.status(400).send(error.message);
    }

    try {
        // Checking if the username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send('Username already exists.');
        }

        // Creating a new user instance
        const newUser = new User({ username, password });

        // Saving the user to the database
        await newUser.save();

        // Creating a JWT token
        const token = jwt.sign({ username }, jwtPass);

        res.send(token);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send(error);
    }
});

// Login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username, password }).exec();
        if (!user) {
            return res.status(401).send('Invalid email or password');
        }

        // q: what findOne is doing?
        // a: findOne is a mongoose method that finds the first document that matches the query.

        // q: will it validate the username and password?
        // a: No, it will not validate the username and password. It will only check if the username and password exist in the database.

        // q: that means, if the username and password are not correct, it will still return the user object?
        // a: Yes, it will return null if the username and password are not correct.

        // q: so, at the very high level it is checking if the user exists in the database?
        // a: Yes, it is checking if the user exists in the database.

        // q: and if user exists with the same password, then it's validated right?
        // a: Yes, if the user exists with the same password, then it's validated.

        // q: then it's doing validation, right?
        // a: Yes, it's doing validation.

        const token = jwt.sign({ username }, jwtPass);

        res.send(token);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send(error);
    }
});

app.post('/validate', async (req, res) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(400).send('Bearer token is missing');
    }

    const token = authHeader.substring('Bearer '.length);

    try {
        // Verify the token
        jwt.verify(token, jwtPass);
        res.send('Token is valid');
    } catch (error) {
        // If token is invalid or expired, send an error response
        res.status(401).send('Invalid or expired token');
    }
});

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