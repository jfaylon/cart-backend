
# Cart Backend

A Backend API for retrieving products from fakestoreapi.com and creation of a shopping cart. This is in tandem with https://github.com/jfaylon/cart-frontend

## Prerequisites

- Node v18.17.1
- A Redis server
- Running the cart-frontend

## Installation

- Clone the repository and perform

```
npm install
```

- Add the ENVs to a `.env` file or copy the `.env.example` file

```
REDIS_URL=redis://localhost:6379
COOKIE_SECRET=cookie-secret
PORT=8000
```

## Running the Application

- Running the Application
```
npm run start
```

if you want to restart the process after code changes
```
npm run start:dev
```

## Unit Tests
```bash
# unit tests
$ npm run test
```

## API

### Cart
- GET /cart
  - Returns cart information based on the session
- POST /cart
  - Add new item to cart
- PATCH /cart/:productId
  - Modify cart quantity. If quantity for the item has become 0, it will be removed from the cart.

### Products
- GET /products
  - Query Parameters:
    - limit - number of products to show
    - offset - number of products to omit from the findings
  - Returns a list of products
- GET /products/categories
  - Returns a list of categories
- GET /products/categories/:category
  - Returns a list of products based on the category
- GET /products/:productId
  - Returns the product details


## Tech limitations and Assumptions
- express-session with redis was used as session store. 
- ExpressJS was used as the backend because this is the basic framework for creating APIs and some of the newer frameworks were built on top of express (Source: https://expressjs.com/en/resources/frameworks.html)
- I have used a separate backend API for the cart-frontend rather than the frontend calling the external APIs for easier decoupling and processing of data. It also helps increase the security aspect so that the fronend can only query the backend server and the backend will handle all the external APIs in its stead. Also, as there is a data layer (Redis), it is more secure to have the session handling in the backend.
- As of this writing (29 Jan 2024), the fakestoreapi does not have an offset feature. I have created a pagination feature for further improvements
- Node v18.17.1 was used in developing the API; there is no guarantee that it may work for other Node versions.

## Possible Improvements
- Better error handling
- Better error logging
- Integration tests
- Better `cors` handling for cookies
