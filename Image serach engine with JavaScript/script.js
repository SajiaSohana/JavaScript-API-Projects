const ACCESS_KEY = ''; //api key 
const API_URL = `https://api.unsplash.com/photos/random?client_id=${ACCESS_KEY}&count=10`;

const searchInput = document.querySelector('.search-box input');
const imagesContainer = document.querySelector('.images');
const loadMoreButton = document.querySelector('.load-more');
const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox.querySelector('.preview-img img');
const photographerName = lightbox.querySelector('.photographer span');
const closeLightbox = lightbox.querySelector('.close-icon');

let currentPage = 1;
let isLoading = false;

// Fetch images from Unsplash API
async function fetchImages(page = 1, query = '') {
    isLoading = true;
    const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${ACCESS_KEY}&count=10`);
    const data = await response.json();
    displayImages(data);
    isLoading = false;
}

// Display images in the gallery
function displayImages(images) {
    images.forEach(image => {
        const li = document.createElement('li');
        li.className = 'card';
        li.innerHTML = `
            <img src="${image.urls.small}" alt="${image.alt_description}" />
            <div class="details">
                <div class="photographer">
                    <i class="uil uil-camera"></i>
                    <span>${image.user.name}</span>
                </div>
                <button class="download-btn" onclick="downloadImage('${image.urls.regular}')">Download</button>
            </div>
        `;
        li.querySelector('img').addEventListener('click', () => {
            openLightbox(image);
        });
        imagesContainer.appendChild(li);
    });
}

// Open lightbox to view the image
function openLightbox(image) {
    lightbox.classList.add('show');
    lightboxImage.src = image.urls.regular;
    photographerName.textContent = image.user.name;
}

// Close lightbox
closeLightbox.addEventListener('click', () => {
    lightbox.classList.remove('show');
});

// Load more images
loadMoreButton.addEventListener('click', () => {
    if (!isLoading) {
        fetchImages(currentPage);
        currentPage++;
    }
});

// Download image function
function downloadImage(url) {
    window.open(url, '_blank');
}

// Search functionality
searchInput.addEventListener('input', (event) => {
    const searchTerm = event.target.value.trim();
    if (searchTerm.length > 0) {
        searchImages(searchTerm);
    } else {
        imagesContainer.innerHTML = '';
        fetchImages(currentPage);
    }
});

// Search images by term
async function searchImages(term) {
    const response = await fetch(`https://api.unsplash.com/search/photos?client_id=${ACCESS_KEY}&query=${term}`);
    const data = await response.json();
    imagesContainer.innerHTML = '';
    displayImages(data.results);
}

// Initial fetch
fetchImages(currentPage);
