// Base URL for Todos API
const todosApiUrl = 'https://jsonplaceholder.typicode.com/todos';

// DOM Elements
const todosContainer = document.getElementById('todosContainer');
const createTodoForm = document.getElementById('createTodoForm');

// Local storage for todos
let todosData = [];

// Fetch and Display Todos
async function getTodos() {
    try {
        const response = await axios.get(todosApiUrl);
        todosData = response.data.slice(0, 10); // Display only the first 10 todos
        renderTodos(todosData);
    } catch (error) {
        console.error('Error fetching todos:', error);
    }
}

// Render Todos to the DOM
function renderTodos(todos) {
    todosContainer.innerHTML = '';
    todos.forEach(todo => {
        todosContainer.innerHTML += `
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${todo.title}</h5>
                        <p class="card-text">Status: ${todo.completed ? 'Completed' : 'Not Completed'}</p>
                        <button class="btn btn-warning btn-edit" onclick="editTodo(${todo.id})">Edit</button>
                        <button class="btn btn-danger btn-delete" onclick="deleteTodo(${todo.id})">Delete</button>
                    </div>
                </div>
            </div>
        `;
    });
}

// Create Todo
createTodoForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const completed = document.getElementById('completed').value === 'true';

    try {
        const response = await axios.post(todosApiUrl, {
            title: title,
            completed: completed,
            userId: 1 // Placeholder userId for demonstration
        });

        // Add the newly created todo to local todos array
        const newTodo = response.data;
        todosData.unshift(newTodo); // Add to the beginning
        renderTodos(todosData);

        console.log('Todo Created:', newTodo);
    } catch (error) {
        console.error('Error creating todo:', error);
    }
});

// Edit Todo
function editTodo(id) {
    const todoToEdit = todosData.find(todo => todo.id === id);

    const newTitle = prompt("Enter new todo title:", todoToEdit.title);
    const newCompleted = prompt("Enter new status (true/false):", todoToEdit.completed);

    if (newTitle && newCompleted !== null) {
        updateTodo(id, newTitle, newCompleted === 'true');
    }
}

// Update Todo
async function updateTodo(id, title, completed) {
    try {
        const response = await axios.put(`${todosApiUrl}/${id}`, {
            title: title,
            completed: completed,
            userId: 1 // Placeholder userId for demonstration
        });

        // Update the todo locally
        const todoIndex = todosData.findIndex(todo => todo.id === id);
        todosData[todoIndex].title = title;
        todosData[todoIndex].completed = completed;

        renderTodos(todosData);

        console.log('Todo Updated:', response.data);
    } catch (error) {
        console.error('Error updating todo:', error);
    }
}

// Delete Todo
async function deleteTodo(id) {
    try {
        await axios.delete(`${todosApiUrl}/${id}`);

        // Remove todo from local array
        todosData = todosData.filter(todo => todo.id !== id);
        renderTodos(todosData);

        console.log('Todo Deleted:', id);
    } catch (error) {
        console.error('Error deleting todo:', error);
    }
}

// Initial Fetch of Todos
getTodos();
