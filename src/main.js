const apiUrl = 'https://dummyjson.com/products';
const itemsPerPage = 10;

let currentPage = 1;
let totalItemsFetched = 0;
let selectedCategory = '';
let currentFilteredPage = 1;

const productContainer = document.querySelector('.product-container');
const currentPageDisplay = document.getElementById('current-page');
const categoryDropdown = document.getElementById('categories');
const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');
const resetButton = document.querySelector('.reset-button');
const prevPageButton = document.getElementById('prev-page');
const nextPageButton = document.getElementById('next-page');
const filterButton = document.querySelector('input[type="submit"]');

prevPageButton.addEventListener('click', handlePrevPage);
nextPageButton.addEventListener('click', handleNextPage);
searchButton.addEventListener('click', handleSearch);
filterButton.addEventListener('click', handleFilter);
resetButton.addEventListener('click', handleReset);


fetchData();


// Fetch from dummyjson
function fetchData() {
    fetchAndDisplayData(`${apiUrl}?skip=${calculateSkip(currentPage)}&limit=${itemsPerPage}`);
}

function fetchAndDisplayData(url) {
    fetch(url)
        .then(handleResponse)
        .then(displayProducts)
        .catch(handleError);
}

function displayProducts(data) {
    console.log('Fetched data:', data);
    totalItemsFetched += data.products.length; //incremented by the length of the data.products array

    productContainer.innerHTML = '';  //clear current content

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

function createProductElement(product) {
    const {
        id,
        thumbnail,
        title,
        category,
        price,
        discountPercentage,
        stock
    } = product;

    const productDiv = document.createElement('div');
    productDiv.classList.add('product');

    productDiv.innerHTML = `
        <a href="product-info.html?id=${id}">
            <div class="thumbnail-container">
                <img src="${thumbnail}" alt="${title}" class="thumbnail">
            </div>
            <div class="product-details">
                <h2>${title}</h2>
                <h4>${category}</h4>
                <div class="price-discount">
                    <p class="price">$${price.toFixed(2)}</p>
                    <p class="discount">${discountPercentage}% off</p>
                </div>
                <p class="stock">Stock: ${stock} available</p>
            </div>
        </a>
    `;
    return productDiv;
}

function calculateSkip(page) {
    return (page - 1) * itemsPerPage;
}

function updatePaginationDisplay() {
    currentPageDisplay.textContent = `Page ${currentPage}`;
}

function handleError(error) {
    console.error('Fetch error:', error.message);
    alert(`Error: ${error.message}`);
}

function handleResponse(response) {
    if (!response.ok) {
        throw new Error(`Network response was not OK, status code: ${response.status}`);
    }
    return response.json();
}

function isValidData(data) {
    return data && data.products && Array.isArray(data.products);
}

// Event Handlers
function handlePrevPage() {
    if (currentPage > 1) {
        currentPage--;
        fetchData();
    }
}

function handleNextPage() {
    currentPage++;
    fetchData();
}

function handleReset() {
    currentPage = 1;
    searchInput.value = '';
    categoryDropdown.value = '';
    fetchData();
}

function handleSearch() {
    currentPage = 1;
    const searchTerm = searchInput.value.toLowerCase();
    selectedCategory = categoryDropdown.value;

    fetchAndDisplayData(`${apiUrl}/search?q=${searchTerm}&category=${selectedCategory}&skip=${calculateSkip(currentPage)}&limit=${itemsPerPage}`);
}

function handleFilter() {
    currentPage = 1;
    selectedCategory = categoryDropdown.value;
    currentFilteredPage = 1; // Reset current page when applying a filter

    fetchAndDisplayData(`${apiUrl}/category/${selectedCategory}?skip=${calculateSkip(currentFilteredPage)}&limit=${itemsPerPage}`);
}



