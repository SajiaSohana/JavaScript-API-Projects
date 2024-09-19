const apiKey = 'b840bcc25abc4362a99d5493a4c213da'; // Replace with your actual API key

document.addEventListener('DOMContentLoaded', () => {
    fetchPopularNews(); // Load popular news for the carousel on page load

    // Handle navbar link clicks
    document.getElementById('home-link').addEventListener('click', fetchNews);
    document.getElementById('world-news-link').addEventListener('click', fetchWorldNews);
    document.getElementById('sports-link').addEventListener('click', fetchSportsNews);
    document.getElementById('finance-link').addEventListener('click', fetchFinanceNews);
    document.getElementById('politics-link').addEventListener('click', fetchPoliticsNews);
    document.getElementById('contact-link').addEventListener('click', showContactForm);
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('subscribeForm').addEventListener('submit', handleSubscribe);

    initializeCarousel(); // Initialize carousel on page load
});

// Fetch popular news for the carousel
function fetchPopularNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            updateCarousel(data.articles);
        })
        .catch(error => {
            console.error('Error fetching popular news:', error);
        });
}

// Update carousel with popular news
function updateCarousel(articles) {
    const carouselInner = document.querySelector('#carouselExampleAutoplay .carousel-inner');
    carouselInner.innerHTML = ''; // Clear existing content

    articles.forEach((article, index) => {
        if (index < 3) { // Limit to 3 popular news items
            const carouselItem = `
                <div class="carousel-item ${index === 0 ? 'active' : ''}">
                    <img src="${article.urlToImage || 'https://via.placeholder.com/1200x400'}" class="d-block w-100" alt="${article.title}">
                    <div class="carousel-caption d-none d-md-block">
                        <h5>${article.title}</h5>
                        <p>${article.description || 'No description available'}</p>
                    </div>
                </div>
            `;
            carouselInner.innerHTML += carouselItem;
        }
    });
}

// Fetch top headlines (Home)
function fetchNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayNews(data.articles);
            document.getElementById('page-title').innerText = 'Latest News';
        })
        .catch(error => {
            console.error('Error fetching news:', error);
        });
}

// Fetch World News
function fetchWorldNews() {
    const url = `https://newsapi.org/v2/top-headlines?category=general&language=en&apiKey=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayNews(data.articles);
            document.getElementById('page-title').innerText = 'World News';
        })
        .catch(error => {
            console.error('Error fetching world news:', error);
        });
}

// Fetch Sports News
function fetchSportsNews() {
    const url = `https://newsapi.org/v2/top-headlines?category=sports&language=en&apiKey=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayNews(data.articles);
            document.getElementById('page-title').innerText = 'Sports News';
        })
        .catch(error => {
            console.error('Error fetching sports news:', error);
        });
}

// Fetch Finance News
function fetchFinanceNews() {
    const url = `https://newsapi.org/v2/top-headlines?category=business&language=en&apiKey=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayNews(data.articles);
            document.getElementById('page-title').innerText = 'Finance News';
        })
        .catch(error => {
            console.error('Error fetching finance news:', error);
        });
}

// Fetch Politics News
function fetchPoliticsNews() {
    const url = `https://newsapi.org/v2/top-headlines?category=politics&language=en&apiKey=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayNews(data.articles);
            document.getElementById('page-title').innerText = 'Politics News';
        })
        .catch(error => {
            console.error('Error fetching politics news:', error);
        });
}

// Display news articles
function displayNews(articles) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ''; // Clear existing content

    articles.forEach(article => {
        let newsCard = `
            <div class="col-md-4 mb-4">
                <div class="card news-card">
                    <img src="${article.urlToImage || 'https://via.placeholder.com/300x200'}" class="card-img-top" alt="${article.title}">
                    <div class="card-body">
                        <h5 class="card-title">${article.title}</h5>
                        <p class="card-text">${article.description || 'No description available'}</p>
                        <a href="${article.url}" target="_blank" class="btn btn-primary">Read more</a>
                    </div>
                </div>
            </div>
        `;
        newsContainer.innerHTML += newsCard;
    });
}

// Show Contact Form
function showContactForm() {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ''; // Clear existing content

    const contactForm = `
        <div class="col-md-6 mx-auto">
            <h3 class="text-center">Contact Us</h3>
            <form>
                <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" class="form-control" id="name" placeholder="Your Name">
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="email" placeholder="name@example.com">
                </div>
                <div class="mb-3">
                    <label for="message" class="form-label">Message</label>
                    <textarea class="form-control" id="message" rows="3" placeholder="Your Message"></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    `;

    document.getElementById('page-title').innerText = 'Contact Us';
    newsContainer.innerHTML = contactForm;
}

// Initialize the carousel
function initializeCarousel() {
    const carousel = document.querySelector('#carouselExampleAutoplay');
    if (carousel) {
        new bootstrap.Carousel(carousel, {
            interval: 2000, // Time between slides in milliseconds
            ride: 'carousel'
        });
    }
}

// Handle Login Form Submission
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Add your login functionality here
    console.log('Login:', email, password);
    alert('Login functionality is not implemented yet.');
}

// Handle Subscribe Form Submission
function handleSubscribe(event) {
    event.preventDefault();
    const email = document.getElementById('subscribeEmail').value;

    // Add your subscription functionality here
    console.log('Subscribe:', email);
    alert('Subscription functionality is not implemented yet.');
}
