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

getTodo();