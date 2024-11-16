# Contact Management API

This is the backend API for a Contact Management system built using Node.js and MongoDB. The API allows users to perform CRUD (Create, Read, Update, Delete) operations on contact information, which is stored in a MongoDB database.

## Technologies Used

- **Node.js**: JavaScript runtime for building the backend application.
- **Express.js**: Web framework for building the RESTful API.
- **MongoDB**: NoSQL database to store contact data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB to manage schema and data.
- **dotenv**: For managing environment variables.
- **cors**: Middleware for handling Cross-Origin Resource Sharing (CORS).
- **Nodemon**: For automatically restarting the server during development.

## Prerequisites

- **Node.js** (version 14 or higher)
- **MongoDB** (You can either set up MongoDB locally or use MongoDB Atlas for a cloud-based instance)

## Installation

1. Clone the repository:

   ```bash
    git clone https://github.com/spreethi01/ERINO.git
    ```

2. Install dependencies:
    ```bash
   npm start
   ```
3. Create a `.env` file in the root of the project with the following content:
    ```bash
    DB_URI=mongodb://localhost:27017/Contact 
    PORT=4000  # Port on which the server will run

    ```
4. Run the application:
    ```bash
    npm start

    ```
The server will start and be available at http://localhost:4000.