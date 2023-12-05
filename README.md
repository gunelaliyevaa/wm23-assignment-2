# Product Display Web Application

This web application fetches product data from an external API, displays it on the home page, and provides additional features such as searching, filtering, and pagination. Here are the instructions for setting up and running the application.

## Setup Instructions

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/gunelaliyevaa/wm23-assignment-2.git
   cd your-repository
   ```

2. **Open the Project in a Code Editor:**
   Open the project folder in your preferred code editor (e.g., Visual Studio Code, Sublime Text).

3. **Explore the Files:**
   Familiarize yourself with the project structure. Key files include:
    - `index.html`: Home page for displaying products.
    - `product-info.html`: Detailed product information page.
    - `style/`: Folder containing CSS styles for the application.
    - `src/main.js`: JavaScript file for handling product display, searching, filtering, and pagination.
    - `src/product-info.js`: JavaScript file for handling detailed product information.

4. **API Integration:**
    - The application fetches product data from the [Dummy JSON Products API](https://dummyjson.com/products).
    - No API key is required for this public API.

5. **Run the Application:**
    - Open `index.html` in a web browser to launch the home page.
    - Navigate to `product-info.html?id={product_id}` to view detailed information for a specific product.

## Application Features

### 1. Product Display on Home Page
- Products are displayed with title, price, discount, category, stock, and thumbnail.
- Pagination controls allow navigation between pages.

### 2. Detailed Product Information Page
- Clicking on a product on the home page opens a detailed product information page.
- Displays additional details such as description, brand, rating, and a gallery of images.

### 3. Search and Filter Functionality on Home Page
- Use the search input to find products based on keywords (title, description, or category).
- Use the category dropdown to filter products by category.
- Click the "Apply Filter" button to update the product list.

### 4. Pagination
- If the response contains more than 10 products, only 10 are displayed on a page.
- Pagination navigation at the bottom of the list allows users to navigate between pages.

### 5. Reset Functionality
- Click the "Reset" button to reset search and filter criteria and display all products.
