const apiUrl = 'https://dummyjson.com/products';

function fetchData() {
    fetch(`${apiUrl}?page=${currentPage}&limit=${itemsPerPage}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not OK, status code: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched data:', data);

        })
        .catch(error => {
            console.error('Fetch error:', error.message);
        });
}

fetchData();
