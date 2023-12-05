const backHomeButton = document.querySelector('.back-home-button');
const detailedProductContainer = document.getElementById('detailed-product-container');

backHomeButton.addEventListener('click', () => {
    window.location.href = 'index.html';
});

document.addEventListener('DOMContentLoaded', () => {
    const productId = getProductIdFromUrl();

    fetch(`https://dummyjson.com/products/${productId}`)
        .then(response => response.json())
        .then(product => {
            detailedProductContainer.innerHTML = createProductHTML(product);
        })
        .catch(error => {
            console.error('Error fetching detailed product data:', error);
        });
});

function createProductGalleryHTML(images) {
    if (images && Array.isArray(images) && images.length > 0) {
        return images.map(imageUrl => `<img src="${imageUrl}" alt="Gallery Image" class="gallery-image">`).join('');
    }
    return 'No images available.';
}

function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

function createProductHTML(product) {
    const {
        thumbnail,
        title,
        description,
        price,
        discountPercentage,
        category,
        stock,
        brand,
        rating,
        images
    } = product;

    return `
        <img src="${thumbnail}" alt="${title}" class="thumbnail">
        <h2>${title}</h2>
        <p>${description}</p>
        <p>Price: $${price.toFixed(2)}</p>
        <p>Discount: ${discountPercentage}% off</p>
        <p>Category: ${category}</p>
        <p>Stock: ${stock} available</p>
        <p>Brand: ${brand}</p>
        <p>Rating: ${rating}/5</p>
        <div class="product-gallery">
            ${createProductGalleryHTML(images)}
        </div>
    `;
}
