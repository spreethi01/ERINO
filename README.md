# Contact Management System

The **Contact Management System** is a web application that allows users to manage their contacts efficiently. The app provides a simple interface to **add**, **view**, **edit**, and **delete** contacts. It uses a **React.js** frontend with **Material UI** (MUI) components for the user interface, and a **Node.js** backend with **MongoDB** for storing contact information.

This application is designed to help users easily manage customer or client data, keeping track of essential contact details such as names, email addresses, phone numbers, job titles, and companies. With features like sorting, pagination, and CRUD (Create, Read, Update, Delete) operations, it enables seamless interaction with contact information.

## Features

- **Add Contacts**: Users can create new contacts by entering details like First Name, Last Name, Email, Phone Number, Company, and Job Title.
- **View Contacts**: A table displays all contacts with options to sort and paginate, making it easy to find specific contacts.
- **Edit Contacts**: Users can update the information of existing contacts, ensuring the data remains current.
- **Delete Contacts**: Users can delete outdated or incorrect contacts to keep the contact list clean.
- **CRUD Operations**: The system fully supports CRUD operations to manage contact information in an efficient manner.

## Project Structure

This repository contains two main parts:
1. **Frontend**: Built using **React.js** and **Material UI** (MUI) for the user interface.
2. **Backend**: Built using **Node.js**, **Express.js**, and **MongoDB** for handling the API and storing data.

## Setup Instructions

The setup process for the frontend and backend is included in their respective folders. Please follow the steps below for each part of the application.

### 1. Backend Setup

The backend is located in the `server` folder. It is built using **Node.js** and **MongoDB**. Follow these steps to set it up:

#### Steps:

1. Navigate to the `server` folder:

    ```bash
    cd server
    ```

2. Install the required dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root of the `server` folder with the following content:

    ```bash
    DB_URI=mongodb://localhost:27017/Contact
    PORT=4000
    ```

   - `DB_URI`: Set this to your MongoDB connection string. If using a local instance of MongoDB, `mongodb://localhost:27017/Contact` should work. You can also use MongoDB Atlas for a cloud-based instance.
   - `PORT`: The port where the server will run (default is 4000).

4. Start the server:

    ```bash
    npm start
    ```

The backend will now be running at `http://localhost:4000`, and you can access the API endpoints for managing contacts.

### 2. Frontend Setup

The frontend is located in the `client` folder. It is built using **React.js** and **Material UI** (MUI). Follow these steps to set it up:

#### Steps:

1. Navigate to the `client` folder:

    ```bash
    cd client
    ```

2. Install the required dependencies:

    ```bash
    npm install
    ```

3. Start the frontend development server:

    ```bash
    npm start
    ```

The frontend will now be running at `http://localhost:3000`. You can interact with the Contact Management system through the user interface.

## API Endpoints

The backend exposes the following endpoints for managing contacts:

- **POST /contacts**: Create a new contact.
- **GET /contacts**: Fetch all contacts.
- **PUT /contacts/**: Update a contact by First Name and Last Name.
- **DELETE /contacts?fName:""&lName:""**: Delete a contact by ID.

For more details, refer to the backend API documentation in the `server/README.md`.

## Tech Stack

- **Frontend**: React.js, Material UI (MUI)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (NoSQL)
- **Libraries/Tools**:
  - **Mongoose**: ODM for MongoDB
  - **dotenv**: For managing environment variables
  - **cors**: Middleware for handling Cross-Origin Resource Sharing
  - **Nodemon**: For automatic server restarts during development

## Challenges and Solutions

- **Challenge**: Handling validation and error management in the backend.
  - **Solution**: I used Mongoose's built-in validation for required fields, unique constraints, and proper error handling for database operations.

- **Challenge**: Integrating the frontend and backend smoothly.
  - **Solution**: I used **Axios** for making HTTP requests from the frontend to the backend API, ensuring seamless communication between the two parts of the app.

## Conclusion

The **Contact Management System** is a full-stack application that provides users with an intuitive way to manage their contacts. The project demonstrates a typical React-Node.js-MongoDB stack and includes key functionalities such as CRUD operations, validation, and a clean UI.

For any issues, questions, or contributions, feel free to reach out or create an issue in this repository.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
