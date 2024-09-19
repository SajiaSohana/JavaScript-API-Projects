// Base URL for Albums API
const albumsApiUrl = 'https://jsonplaceholder.typicode.com/albums';

// DOM Elements
const albumsContainer = document.getElementById('albumsContainer');
const createAlbumForm = document.getElementById('createAlbumForm');

// Local storage for albums
let albumsData = [];

// Fetch and Display Albums
async function getAlbums() {
    try {
        const response = await axios.get(albumsApiUrl);
        albumsData = response.data.slice(0, 10); // Display only the first 10 albums
        renderAlbums(albumsData);
    } catch (error) {
        console.error('Error fetching albums:', error);
    }
}

// Render Albums to the DOM
function renderAlbums(albums) {
    albumsContainer.innerHTML = '';
    albums.forEach(album => {
        albumsContainer.innerHTML += `
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${album.title}</h5>
                        <button class="btn btn-warning btn-edit" onclick="editAlbum(${album.id})">Edit</button>
                        <button class="btn btn-danger btn-delete" onclick="deleteAlbum(${album.id})">Delete</button>
                    </div>
                </div>
            </div>
        `;
    });
}

// Create Album
createAlbumForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;

    try {
        const response = await axios.post(albumsApiUrl, {
            title: title,
            userId: 1 // Placeholder userId for demonstration
        });

        // Add the newly created album to local albums array
        const newAlbum = response.data;
        albumsData.unshift(newAlbum); // Add to the beginning
        renderAlbums(albumsData);

        console.log('Album Created:', newAlbum);
    } catch (error) {
        console.error('Error creating album:', error);
    }
});

// Edit Album
function editAlbum(id) {
    const albumToEdit = albumsData.find(album => album.id === id);

    const newTitle = prompt("Enter new album title:", albumToEdit.title);

    if (newTitle) {
        updateAlbum(id, newTitle);
    }
}

// Update Album
async function updateAlbum(id, title) {
    try {
        const response = await axios.put(`${albumsApiUrl}/${id}`, {
            title: title,
            userId: 1 // Placeholder userId for demonstration
        });

        // Update the album locally
        const albumIndex = albumsData.findIndex(album => album.id === id);
        albumsData[albumIndex].title = title;

        renderAlbums(albumsData);

        console.log('Album Updated:', response.data);
    } catch (error) {
        console.error('Error updating album:', error);
    }
}

// Delete Album
async function deleteAlbum(id) {
    try {
        await axios.delete(`${albumsApiUrl}/${id}`);

        // Remove album from local array
        albumsData = albumsData.filter(album => album.id !== id);
        renderAlbums(albumsData);

        console.log('Album Deleted:', id);
    } catch (error) {
        console.error('Error deleting album:', error);
    }
}

// Initial Fetch of Albums
getAlbums();
