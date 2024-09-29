const apiKey = 'c0a5ec2a5a091dd645228ef2';
const baseURL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

let rates = {};
let favoriteCurrencies = JSON.parse(localStorage.getItem('favoriteCurrencies')) || [];
let editIndex = null;

// Fetch exchange rates from API
async function fetchExchangeRates() {
    try {
        const response = await axios.get(baseURL);
        rates = response.data.conversion_rates;
        displayRates();
        displayFavorites();
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
    }
}

// Display current exchange rates
function displayRates() {
    const ratesList = document.getElementById('ratesList');
    ratesList.innerHTML = ''; // Clear previous rates
    let index = 1;
    for (const currency in rates) {
        const row = `<tr>
            <td>${index++}</td>
            <td>${currency}</td>
            <td>${rates[currency]}</td>
        </tr>`;
        ratesList.innerHTML += row;
    }
}

// Add currency to favorites
function addCurrencyToFavorites(currency) {
    if (!favoriteCurrencies.includes(currency)) {
        favoriteCurrencies.push(currency);
        localStorage.setItem('favoriteCurrencies', JSON.stringify(favoriteCurrencies));
        displayFavorites();
    } else {
        alert('Currency already in favorites!');
    }
}

// Display favorite currencies
function displayFavorites() {
    const favoritesList = document.getElementById('favoritesList');
    favoritesList.innerHTML = ''; // Clear previous favorites
    if (favoriteCurrencies.length === 0) {
        favoritesList.innerHTML = '<tr><td colspan="4">No favorite currencies added yet.</td></tr>';
        return;
    }
    let index = 1;
    favoriteCurrencies.forEach((currency, idx) => {
        const row = `<tr>
            <td>${index++}</td>
            <td>${currency}</td>
            <td>${rates[currency] || 'N/A'}</td>
            <td>
                <button class="btn btn-warning btn-sm me-1" onclick="openEditModal(${idx})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteCurrency(${idx})">Delete</button>
            </td>
        </tr>`;
        favoritesList.innerHTML += row;
    });
}

// Open edit modal
function openEditModal(index) {
    editIndex = index;
    const currency = favoriteCurrencies[index];
    document.getElementById('editCurrencyInput').value = currency;
    const editModal = new bootstrap.Modal(document.getElementById('editCurrencyModal'));
    editModal.show();
}

// Save changes in edit modal
document.getElementById('saveEditButton').onclick = function () {
    const newCurrency = document.getElementById('editCurrencyInput').value.trim().toUpperCase();
    if (newCurrency) {
        favoriteCurrencies[editIndex] = newCurrency;
        localStorage.setItem('favoriteCurrencies', JSON.stringify(favoriteCurrencies));
        displayFavorites();
        const editModal = bootstrap.Modal.getInstance(document.getElementById('editCurrencyModal'));
        editModal.hide();
    }
};

// Delete a currency from favorites
function deleteCurrency(index) {
    favoriteCurrencies.splice(index, 1);
    localStorage.setItem('favoriteCurrencies', JSON.stringify(favoriteCurrencies));
    displayFavorites();
}

// Event listeners
document.getElementById('addCurrencyButton').onclick = function () {
    const currencyInput = document.getElementById('currencyInput').value.trim().toUpperCase();
    if (currencyInput) {
        addCurrencyToFavorites(currencyInput);
        document.getElementById('currencyInput').value = ''; // Clear input
        const addModal = bootstrap.Modal.getInstance(document.getElementById('addCurrencyModal'));
        addModal.hide();
    }
};

document.getElementById('showRatesBtn').onclick = function () {
    document.getElementById('exchangeRatesSection').style.display = 'block';
    document.getElementById('favoritesSection').style.display = 'none';
    fetchExchangeRates(); // Fetch rates when viewing the section
};

document.getElementById('showFavoritesBtn').onclick = function () {
    document.getElementById('exchangeRatesSection').style.display = 'none';
    document.getElementById('favoritesSection').style.display = 'block';
    displayFavorites();
};

// Initial fetch of exchange rates
fetchExchangeRates();
