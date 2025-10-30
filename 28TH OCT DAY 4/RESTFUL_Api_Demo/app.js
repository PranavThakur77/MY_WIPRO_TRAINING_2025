const userList = document.getElementById('userList');
const btnGetUsers = document.getElementById('getUsers');
const btnCreateUser = document.getElementById('createUser');

const apiurl = 'https://jsonplaceholder.typicode.com/users';

// Fetch users (GET request)
async function fetchUsers() {
    try {
        const response = await fetch(apiurl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const users = await response.json();
        displayUsers(users);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

// Display users dynamically
function displayUsers(users) {
    userList.innerHTML = "";
    users.forEach(user => {
        const userItem = document.createElement('div');
        userItem.className = "user-card"; // matches your CSS
        userItem.innerHTML = `
            <h3>${user.name}</h3>
            <p>Email: ${user.email}</p>
            <button onclick="editUser(${user.id})">Edit</button>
            <button onclick="deleteUser(${user.id})">Delete</button>
        `;
        userList.appendChild(userItem);
    });
}

// Add user (POST request)
async function addUser() {
    const userData = {
        name: 'New User',
        email: 'newuser@example.com'
    };
    try {
        const response = await fetch(apiurl, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const newUser = await response.json();
        displayUsers([newUser]);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

// Edit user (PUT request)
async function editUser(userId) {
    const updatedData = {
        name: 'Updated User',
        email: 'updated@example.com'
    };
    try {
        const response = await fetch(`${apiurl}/${userId}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedData)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const updatedUser = await response.json();
        console.log('User updated:', updatedUser);
        fetchUsers();
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

// Delete user (DELETE request)
async function deleteUser(userId) {
    try {
        const response = await fetch(`${apiurl}/${userId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        console.log('User deleted:', userId);
        fetchUsers();
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

// Event listeners
btnGetUsers.addEventListener('click', fetchUsers);
btnCreateUser.addEventListener('click', addUser);
