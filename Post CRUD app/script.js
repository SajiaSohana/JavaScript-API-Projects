// Base URL for API
const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

// DOM Elements
const postsContainer = document.getElementById('postsContainer');
const createPostForm = document.getElementById('createPostForm');

// Local storage for posts
let postsData = [];

// Fetch and Display Posts
async function getPosts() {
    try {
        const response = await axios.get(apiUrl);
        postsData = response.data.slice(0, 10); // Display only the first 10 posts
        renderPosts(postsData);
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

// Render Posts to the DOM
function renderPosts(posts) {
    postsContainer.innerHTML = '';
    posts.forEach(post => {
        postsContainer.innerHTML += `
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${post.title}</h5>
                        <p class="card-text">${post.body}</p>
                        <button class="btn btn-warning btn-edit" onclick="editPost(${post.id})">Edit</button>
                        <button class="btn btn-danger btn-delete" onclick="deletePost(${post.id})">Delete</button>
                    </div>
                </div>
            </div>
        `;
    });
}

// Create Post
createPostForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;

    try {
        const response = await axios.post(apiUrl, {
            title: title,
            body: body,
            userId: 1
        });

        // Add the newly created post to local posts array
        const newPost = response.data;
        postsData.unshift(newPost); // Add to the beginning of the array
        renderPosts(postsData);

        console.log('Post Created:', newPost);
    } catch (error) {
        console.error('Error creating post:', error);
    }
});

// Edit Post (simulates edit by modifying local data)
function editPost(id) {
    const postToEdit = postsData.find(post => post.id === id);

    const newTitle = prompt("Enter new title:", postToEdit.title);
    const newBody = prompt("Enter new body:", postToEdit.body);

    if (newTitle && newBody) {
        updatePost(id, newTitle, newBody);
    }
}

// Update Post
async function updatePost(id, title, body) {
    try {
        const response = await axios.put(`${apiUrl}/${id}`, {
            title: title,
            body: body,
            userId: 1
        });

        // Update the post locally
        const postIndex = postsData.findIndex(post => post.id === id);
        postsData[postIndex].title = title;
        postsData[postIndex].body = body;

        renderPosts(postsData);

        console.log('Post Updated:', response.data);
    } catch (error) {
        console.error('Error updating post:', error);
    }
}

// Delete Post
async function deletePost(id) {
    try {
        await axios.delete(`${apiUrl}/${id}`);

        // Remove post from local array
        postsData = postsData.filter(post => post.id !== id);
        renderPosts(postsData);

        console.log('Post Deleted:', id);
    } catch (error) {
        console.error('Error deleting post:', error);
    }
}

// Initial Fetch of Posts
getPosts();
