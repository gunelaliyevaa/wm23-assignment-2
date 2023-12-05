// Constants and Variables
const apiUrl = 'https://dummyjson.com/products';
const itemsPerPage = 10;

let currentPage = 1;
let totalItemsFetched = 0;
let selectedCategory = '';
let currentFilteredPage = 1;

// DOM Elements
const productContainer = document.querySelector('.product-container');
const currentPageDisplay = document.getElementById('current-page');
const categoryDropdown = document.getElementById('categories');
const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');
const resetButton = document.querySelector('.reset-button');
const prevPageButton = document.getElementById('prev-page');
const nextPageButton = document.getElementById('next-page');
const filterButton = document.querySelector('input[type="submit"]');

// Event Listeners
prevPageButton.addEventListener('click', handlePrevPage);
nextPageButton.addEventListener('click', handleNextPage);
searchButton.addEventListener('click', handleSearch);
filterButton.addEventListener('click', handleFilter);
resetButton.addEventListener('click', handleReset);


// Initial Data Fetch
fetchData();

// Functions
function fetchData() {
    fetchAndDisplayData(`${apiUrl}?skip=${calculateSkip(currentPage)}&limit=${itemsPerPage}`);
}

function fetchAndDisplayData(url) {
    fetch(url)
        .then(handleResponse)
        .then(displayProducts)
        .catch(handleError);
}

function calculateSkip(page) {
    return (page - 1) * itemsPerPage;
}

function handleResponse(response) {
    if (!response.ok) {
        throw new Error(`Network response was not OK, status code: ${response.status}`);
    }
    return response.json();
}

function displayProducts(data) {
    console.log('Fetched data:', data);
    totalItemsFetched += data.products.length;

    productContainer.innerHTML = '';

    if (isValidData(data)) {
        data.products.forEach(product => {
            const productDiv = createProductElement(product);
            productContainer.appendChild(productDiv);
            console.log("Appended before on click");
        });
        updatePaginationDisplay();
    } else {
        throw new Error('Data is not in the expected format');
    }
}

function isValidData(data) {
    return data && data.products && Array.isArray(data.products);
}

function createProductElement(product) {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');

    productDiv.innerHTML = `
        <a href="product-info.html?id=${product.id}">
            <div class="thumbnail-container">
                <img src="${product.thumbnail}" alt="${product.title}" class="thumbnail">
            </div>
            <div class="product-details">
                <h2>${product.title}</h2>
                <h4>${product.category}</h4>
                <div class="price-discount">
                    <p class="price">$${product.price.toFixed(2)}</p>
                    <p class="discount">${product.discountPercentage}% off</p>
                </div>
                <p class="stock">Stock: ${product.stock} available</p>
            </div>
        </a>
    `;
    return productDiv;
}

function updatePaginationDisplay() {
    currentPageDisplay.textContent = `Page ${currentPage}`;
}

function handleError(error) {
    console.error('Fetch error:', error.message);
}

// Event Handlers
function handlePrevPage() {
    if (currentPage > 1) {
        currentPage--;
        fetchData();
    }
}

function handleNextPage() {
    if (currentPage < Math.floor(totalItemsFetched / itemsPerPage)) currentPage++;
    fetchData();
}
