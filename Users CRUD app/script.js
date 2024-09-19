// Base URL for Users API
const usersApiUrl = 'https://jsonplaceholder.typicode.com/users';

// DOM Elements
const usersContainer = document.getElementById('usersContainer');
const createUserForm = document.getElementById('createUserForm');

// Local storage for users
let usersData = [];

// Fetch and Display Users
async function getUsers() {
    try {
        const response = await axios.get(usersApiUrl);
        usersData = response.data.slice(0, 10); // Display only the first 10 users
        renderUsers(usersData);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

// Render Users to the DOM
function renderUsers(users) {
    usersContainer.innerHTML = '';
    users.forEach(user => {
        usersContainer.innerHTML += `
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${user.name}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${user.username}</h6>
                        <p class="card-text">Email: ${user.email}</p>
                        <button class="btn btn-warning btn-edit" onclick="editUser(${user.id})">Edit</button>
                        <button class="btn btn-danger btn-delete" onclick="deleteUser(${user.id})">Delete</button>
                    </div>
                </div>
            </div>
        `;
    });
}

// Create User
createUserForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;

    try {
        const response = await axios.post(usersApiUrl, {
            name: name,
            username: username,
            email: email,
            address: {
                street: '',
                suite: '',
                city: '',
                zipcode: ''
            },
            phone: '',
            website: '',
            company: {
                name: '',
                catchPhrase: '',
                bs: ''
            }
        });

        // Add the newly created user to local users array
        const newUser = response.data;
        usersData.unshift(newUser); // Add to the beginning
        renderUsers(usersData);

        console.log('User Created:', newUser);
    } catch (error) {
        console.error('Error creating user:', error);
    }
});

// Edit User
function editUser(id) {
    const userToEdit = usersData.find(user => user.id === id);

    const newName = prompt("Enter new name:", userToEdit.name);
    const newUsername = prompt("Enter new username:", userToEdit.username);
    const newEmail = prompt("Enter new email:", userToEdit.email);

    if (newName && newUsername && newEmail) {
        updateUser(id, newName, newUsername, newEmail);
    }
}

// Update User
async function updateUser(id, name, username, email) {
    try {
        const response = await axios.put(`${usersApiUrl}/${id}`, {
            name: name,
            username: username,
            email: email,
            address: {
                street: '',
                suite: '',
                city: '',
                zipcode: ''
            },
            phone: '',
            website: '',
            company: {
                name: '',
                catchPhrase: '',
                bs: ''
            }
        });

        // Update the user locally
        const userIndex = usersData.findIndex(user => user.id === id);
        usersData[userIndex].name = name;
        usersData[userIndex].username = username;
        usersData[userIndex].email = email;

        renderUsers(usersData);

        console.log('User Updated:', response.data);
    } catch (error) {
        console.error('Error updating user:', error);
    }
}

// Delete User
async function deleteUser(id) {
    try {
        await axios.delete(`${usersApiUrl}/${id}`);

        // Remove user from local array
        usersData = usersData.filter(user => user.id !== id);
        renderUsers(usersData);

        console.log('User Deleted:', id);
    } catch (error) {
        console.error('Error deleting user:', error);
    }
}

// Initial Fetch of Users
getUsers();
