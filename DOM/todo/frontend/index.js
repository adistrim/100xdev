const getTodo = async () => {
    const response = await fetch('http://localhost:3000/todos');
    let data = await response.json();

    document.getElementById('display').innerHTML = '';
    data
        .filter(todo => !todo.status) // Filtering out todos with status false (pending)
        .forEach(todo => {
            const todoDiv = document.createElement('div');
            todoDiv.classList.add('todo');
            todoDiv.innerHTML = `
                <p><strong>${todo.title}</strong></p>
                <button onclick="updateTodo('${todo._id}')">Mark as done</button>
                <hr>
            `;
            document.getElementById('display').appendChild(todoDiv);
        });
}

const getCompletedTodo = async () => {
    const response = await fetch('http://localhost:3000/todos');
    let data = await response.json();

    document.getElementById('display').innerHTML = '';
    data
        .filter(todo => todo.status) // Filter out todos with status true (completed)
        .forEach(todo => {
            const todoDiv = document.createElement('div');
            todoDiv.classList.add('todo');
            todoDiv.innerHTML = `
                <p><strong>${todo.title}</strong></p>
                <hr>
            `;
            document.getElementById('display').appendChild(todoDiv);
        });
}


const addTodo = async () => {
    const title = document.querySelector('input').value;
    const status = false;

    try {
        const response = await fetch('http://localhost:3000/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, status })
        });

        if (!response.ok) {
            throw new Error('Failed to add todo.');
        }

        getTodo();
        alert('Todo added successfully');
    } catch (error) {
        alert(error.message);
    }
};

const updateTodo = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/todo/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: true }) // Update status to true
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage || 'Failed to update todo status.');
        }

        getTodo(); // Refresh the todo list after updating
        alert('Todo marked as done');
    } catch (error) {
        alert('Failed to update todo status.');
    }
};

// signup function
const signUp = async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            // Checking if the response status is 400 (Bad Request)
            if (response.status === 400) {
                const errorMessage = await response.text(); // Extracting the error message
                throw new Error(errorMessage);
            }
            throw new Error('Failed to sign up.'); // Throw a generic error for other error statuses
        }

        const token = await response.text(); // Extracting the token
        localStorage.setItem('token', token); // Storing the token in local storage
        alert('Signed up successfully');
        window.location.href = 'index.html'; // Redirecting only if signup is successful
    } catch (error) {
        alert(error.message); // Displaying the error message
    }
};

// login function
const login = async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            // Checking if the response status is 401 (Unauthorized)
            if (response.status === 401) {
                throw new Error('Invalid username or password');
            }
            throw new Error('Failed to login'); // Throw a generic error for other error statuses
        }

        const token = await response.text(); // Extracting the token
        localStorage.setItem('token', token); // Storing the token in local storage
        alert('Logged in successfully');
        window.location.href = 'index.html'; // Redirecting only if login is successful
    } catch (error) {
        alert(error.message); // Displaying the error message
    }
};

// validate token
const validateToken = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        alert('Please login to access this page.');
        window.location.href = 'login.html';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/validate', {
            method: 'POST', // Use POST method
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });

        if (!response.ok) {
            if (response.status === 401) {
                // Token is invalid or expired
                localStorage.removeItem('token');
                alert('Please login to access this page.');
                window.location.href = 'login.html';
            } else {
                throw new Error('Failed to validate token');
            }
            return;
        }

        // Token is valid
        console.log('Token is valid');
        getTodo();
    } catch (error) {
        console.error('Error validating token:', error);
        alert('Please login to access this page.');
        window.location.href = 'login.html';
    }
};

// q: what's wrong with the validateToken function?
// a: The validateToken function is sending the token in the request body, but the server is expecting the token in the Authorization header.

// q: how can you fix the validateToken function?
// a: You can fix the validateToken function by sending the token in the Authorization header instead of the request body.
