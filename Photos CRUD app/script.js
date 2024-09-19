// Base URL for Photos API
const photosApiUrl = 'https://jsonplaceholder.typicode.com/photos';

// DOM Elements
const photosContainer = document.getElementById('photosContainer');
const createPhotoForm = document.getElementById('createPhotoForm');

// Local storage for photos
let photosData = [];

// Fetch and Display Photos
async function getPhotos() {
    try {
        const response = await axios.get(photosApiUrl);
        photosData = response.data.slice(0, 10); // Display only the first 10 photos
        renderPhotos(photosData);
    } catch (error) {
        console.error('Error fetching photos:', error);
    }
}

// Render Photos to the DOM
function renderPhotos(photos) {
    photosContainer.innerHTML = '';
    photos.forEach(photo => {
        photosContainer.innerHTML += `
            <div class="col-md-4">
                <div class="card">
                    <img src="${photo.thumbnailUrl}" class="card-img-top" alt="${photo.title}">
                    <div class="card-body">
                        <h5 class="card-title">${photo.title}</h5>
                        <a href="${photo.url}" target="_blank" class="btn btn-info">View Full Image</a>
                        <button class="btn btn-warning btn-edit" onclick="editPhoto(${photo.id})">Edit</button>
                        <button class="btn btn-danger btn-delete" onclick="deletePhoto(${photo.id})">Delete</button>
                    </div>
                </div>
            </div>
        `;
    });
}

// Create Photo
createPhotoForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const url = document.getElementById('url').value;

    try {
        const response = await axios.post(photosApiUrl, {
            title: title,
            url: url,
            thumbnailUrl: url // Using the same URL for thumbnail
        });

        // Add the newly created photo to local photos array
        const newPhoto = response.data;
        photosData.unshift(newPhoto); // Add to the beginning
        renderPhotos(photosData);

        console.log('Photo Created:', newPhoto);
    } catch (error) {
        console.error('Error creating photo:', error);
    }
});

// Edit Photo
function editPhoto(id) {
    const photoToEdit = photosData.find(photo => photo.id === id);

    const newTitle = prompt("Enter new photo title:", photoToEdit.title);
    const newUrl = prompt("Enter new photo URL:", photoToEdit.url);

    if (newTitle && newUrl) {
        updatePhoto(id, newTitle, newUrl);
    }
}

// Update Photo
async function updatePhoto(id, title, url) {
    try {
        const response = await axios.put(`${photosApiUrl}/${id}`, {
            title: title,
            url: url,
            thumbnailUrl: url // Using the same URL for thumbnail
        });

        // Update the photo locally
        const photoIndex = photosData.findIndex(photo => photo.id === id);
        photosData[photoIndex].title = title;
        photosData[photoIndex].url = url;

        renderPhotos(photosData);

        console.log('Photo Updated:', response.data);
    } catch (error) {
        console.error('Error updating photo:', error);
    }
}

// Delete Photo
async function deletePhoto(id) {
    try {
        await axios.delete(`${photosApiUrl}/${id}`);

        // Remove photo from local array
        photosData = photosData.filter(photo => photo.id !== id);
        renderPhotos(photosData);

        console.log('Photo Deleted:', id);
    } catch (error) {
        console.error('Error deleting photo:', error);
    }
}

// Initial Fetch of Photos
getPhotos();
