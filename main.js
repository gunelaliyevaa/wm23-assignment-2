const apiUrl = 'https://dummyjson.com/products';
const itemsPerPage = 10;
let currentPage = 1;

const productContainer = document.querySelector('.product-container');

function fetchData() {
    fetch(`${apiUrl}?page=${currentPage}&limit=${itemsPerPage}`)
        .then(handleResponse)
        .then(displayProducts)
        .catch(handleError);
}

function handleResponse(response) {
    if (!response.ok) {
        throw new Error(`Network response was not OK, status code: ${response.status}`);
    }
    return response.json();
}

function displayProducts(data) {
    console.log('Fetched data:', data);

    if (data && data.products && Array.isArray(data.products)) {
        const products = data.products;
        products.forEach(product => {
            const productDiv = createProductElement(product);
            productContainer.appendChild(productDiv);
            console.log("Appended before on click");
        });
    } else {
        throw new Error('Data is not in the expected format');
    }
}

function createProductElement(product) {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');

    productDiv.innerHTML = `
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
    `;

    return productDiv;
}

function handleError(error) {
    console.error('Fetch error:', error.message);
}

fetchData();
