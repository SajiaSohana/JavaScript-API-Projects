// Base URL for Comments API
const commentsApiUrl = 'https://jsonplaceholder.typicode.com/comments';

// DOM Elements
const commentsContainer = document.getElementById('commentsContainer');
const createCommentForm = document.getElementById('createCommentForm');

// Local storage for comments
let commentsData = [];

// Fetch and Display Comments
async function getComments() {
    try {
        const response = await axios.get(commentsApiUrl);
        commentsData = response.data.slice(0, 10); // Display only the first 10 comments
        renderComments(commentsData);
    } catch (error) {
        console.error('Error fetching comments:', error);
    }
}

// Render Comments to the DOM
function renderComments(comments) {
    commentsContainer.innerHTML = '';
    comments.forEach(comment => {
        commentsContainer.innerHTML += `
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${comment.name}</h5>
                        <p class="card-text">${comment.body}</p>
                        <p class="card-text"><small>${comment.email}</small></p>
                        <button class="btn btn-warning btn-edit" onclick="editComment(${comment.id})">Edit</button>
                        <button class="btn btn-danger btn-delete" onclick="deleteComment(${comment.id})">Delete</button>
                    </div>
                </div>
            </div>
        `;
    });
}

// Create Comment
createCommentForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const body = document.getElementById('body').value;

    try {
        const response = await axios.post(commentsApiUrl, {
            name: name,
            email: email,
            body: body,
            postId: 1 // Using a static postId for now
        });

        const newComment = response.data;
        commentsData.unshift(newComment); // Add to the beginning
        renderComments(commentsData);

        console.log('Comment Created:', newComment);
    } catch (error) {
        console.error('Error creating comment:', error);
    }
});

// Edit Comment
function editComment(id) {
    const commentToEdit = commentsData.find(comment => comment.id === id);

    const newName = prompt("Enter new name:", commentToEdit.name);
    const newEmail = prompt("Enter new email:", commentToEdit.email);
    const newBody = prompt("Enter new body:", commentToEdit.body);

    if (newName && newEmail && newBody) {
        updateComment(id, newName, newEmail, newBody);
    }
}

// Update Comment
async function updateComment(id, name, email, body) {
    try {
        const response = await axios.put(`${commentsApiUrl}/${id}`, {
            name: name,
            email: email,
            body: body,
            postId: 1 // Static postId
        });

        const commentIndex = commentsData.findIndex(comment => comment.id === id);
        commentsData[commentIndex].name = name;
        commentsData[commentIndex].email = email;
        commentsData[commentIndex].body = body;

        renderComments(commentsData);

        console.log('Comment Updated:', response.data);
    } catch (error) {
        console.error('Error updating comment:', error);
    }
}

// Delete Comment
async function deleteComment(id) {
    try {
        await axios.delete(`${commentsApiUrl}/${id}`);

        commentsData = commentsData.filter(comment => comment.id !== id);
        renderComments(commentsData);

        console.log('Comment Deleted:', id);
    } catch (error) {
        console.error('Error deleting comment:', error);
    }
}

// Initial Fetch of Comments
getComments();
