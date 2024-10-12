# Simple Product Management API

This is a RESTful API for managing products, built with Node.js, Express.js, and PostgreSQL using Sequelize ORM.


## Installation

1. Clone the repository:
   ```
   git clone https://github.com/Kevin222004/Arthalfa-API.git
   cd Arthalfa-API
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your configuration:
   ```
   PORT=3000
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=product_management
   DB_USER=your_username
   DB_PASSWORD=your_password
   ```


## Running the Application

To start the server in development mode with auto-reloading:

```
npm run dev
```

For production:

```
npm start
```

The server will start on the port specified in your `.env`

## API Endpoints

- `POST /products` - Add a new product
- `GET /products` - Get a list of all products
- `GET /products/search` - Search for the products
- `GET /products/:id` - Get details of a single product by ID
- `PUT /products/:id` - Update an existing product
- `DELETE /products/:id` - Delete a product by ID


<details>
<summary>Detailed Information</summary>

---

This documentation provides all the available API endpoints for interacting with the Product model. These endpoints allow you to create, retrieve, update, delete, and search products.

## Base URL: `/api/v1`

---

## 1. **Create a Product**
- **Endpoint**: `POST /api/v1/products`
- **Description**: Create a new product in the system.
- **Request Body**:
  ```json
  {
    "name": "Product Name",
    "price": 19.99,
    "description": "Product Description",
    "category": "Category Name"
  }
  ```
- **Response**:
  ```json
  {
    "id": 1,
    "name": "Product Name",
    "price": 19.99,
    "description": "Product Description",
    "category": "Category Name",
    "updatedAt": "2024-10-12T10:19:12.160Z",
    "createdAt": "2024-10-12T10:19:12.160Z"
  }
  ```

---

## 2. **Get All Products**
- **Endpoint**: `GET /api/v1/products`
- **Description**: Retrieve a paginated list of products.
- **Query Parameters**:
   - `limit` (optional): The number of products per page. Default is `5`.
   - `page` (optional): The page number to retrieve. Default is `1`.
- **Response**:
  ```json
  {
    "totalItems": 20,
    "totalPages": 4,
    "currentPage": 1,
    "data": [
      {
        "id": 1,
        "name": "Product Name",
        "price": 19.99,
        "description": "Product Description",
        "category": "Category Name"
      }
    ]
  }
  ```

---

## 3. **Search Products**
- **Endpoint**: `GET /api/v1/products/search`
- **Description**: Search for products by name and/or category.
- **Query Parameters**:
   - `name` (optional): A partial or full product name to search.
   - `category` (optional): A partial or full category name to search.
   - `limit` (optional): The number of products per page. Default is `5`.
   - `page` (optional): The page number to retrieve. Default is `1`.
- **Response**:
  ```json
  {
    "totalItems": 10,
    "totalPages": 2,
    "currentPage": 1,
    "data": [
      {
        "id": 1,
        "name": "Searched Product Name",
        "price": 29.99,
        "description": "Description of the searched product",
        "category": "Searched Category"
      }
    ]
  }
  ```

---

## 4. **Get Product by ID**
- **Endpoint**: `GET /api/v1/products/:id`
- **Description**: Retrieve details of a single product by its ID.
- **Path Parameter**:
   - `id` (required): The unique ID of the product.
- **Response**:
  ```json
  {
    "name": "Product Name",
    "price": 19.99,
    "description": "Product Description",
    "category": "Category Name"
  }
  ```

---

## 5. **Update a Product**
- **Endpoint**: `PUT /api/v1/products/:id`
- **Description**: Update an existing product's details.
- **Path Parameter**:
   - `id` (required): The unique ID of the product to update.
- **Request Body**:
  ```json
  {
    "name": "Updated Product Name",
    "price": 29.99,
    "description": "Updated Description",
    "category": "Updated Category"
  }
  ```
- **Response**:
  ```json
  {
    "name": "Updated Product Name",
    "price": 29.99,
    "description": "Updated Description",
    "category": "Updated Category"
  }
  ```

---

## 6. **Delete a Product**
- **Endpoint**: `DELETE /api/v1/products/:id`
- **Description**: Delete a product by its ID.
- **Path Parameter**:
   - `id` (required): The unique ID of the product to delete.
- **Response**:
  ```json
  {
    "msg": "Successfully deleted"
  }
  ```

---

This concludes the API documentation for the Product model. Each API endpoint is accessible through the `/api/v1/products` route with the specified method (GET, POST, PUT, DELETE).

</details>

## Data Validation

Data validation is implemented using Zod. The following fields are required for a product:

- `name` (string)
- `price` (number, positive)
- `category` (string)

The `description` field is optional.


