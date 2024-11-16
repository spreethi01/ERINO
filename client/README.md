# Contact Management System - Frontend

This is the frontend for the Contact Management System built with **ReactJS** and **Material UI** (MUI). It provides an interface for users to manage their contacts by performing CRUD (Create, Read, Update, Delete) operations. Users can add new contacts, view contact details in a table, edit contact information, and delete contacts.

## Table of Contents
1. [Tech Stack](#tech-stack)
2. [Features](#features)
3. [Setup Instructions](#setup-instructions)
4. [Usage](#usage)
5. [Pagination & Sorting](#pagination--sorting)
6. [Components](#components)
7. [Error Handling](#error-handling)
8. [License](#license)

## Tech Stack

- **Frontend**: ReactJS
- **State Management**: React `useState`, `useEffect`
- **HTTP Requests**: Axios
- **CSS**: Custom CSS for layout and styling

## Features

### 1. Add New Contact
- Users can add new contact details such as First Name, Last Name, Email, Phone Number, Company, and Job Title.

### 2. View Contacts
- Displays contacts in a table with sortable columns.
- Each contact has an **Edit** and **Delete** button for managing contact details.
- Pagination controls are available to browse through the list of contacts.

### 3. Edit Contact
- Users can click the **Edit** button to modify an existing contact's information and save the changes.

### 4. Delete Contact
- Users can delete a contact by clicking the **Delete** button, removing the contact from the system.

### 5. Pagination
- Pagination allows users to navigate through large lists of contacts by limiting the number of records displayed per page.

### 6. Dialog Box for Form Inputs
- A dialog box (modal) is used for adding or editing contact information, ensuring a smooth user experience.

## Setup Instructions

To set up and run this project locally, follow these steps:

1. **Clone the Repository**
    ```bash
    git clone https://github.com/spreethi01/ERINO.git
    ```

2. **Install Dependencies**
    Navigate to the project directory and install the required dependencies:
    ```bash
    cd client
    npm install
    ```

3. **Set Up the Backend**
    - This frontend application interacts with the backend (API server) running on **`http://localhost:4000`**. Make sure to have the backend running first.
    - If you're using the backend provided earlier, follow the instructions in the backend repository to set up the server and database.

4. **Start the Development Server**
    To start the frontend development server:
    ```bash
    npm start
    ```
    The app will be available at `http://localhost:3000`.

## Usage

Once the application is running, you will be able to:
- **Add New Contacts**: Click the `+ Add New Contact` button to open the contact form.
- **View Contacts**: All contacts will be displayed in a table with their basic information. You can click on **Edit** to modify a contact or **Delete** to remove it.
- **Pagination**: Navigate through the list of contacts with the **Previous** and **Next** buttons.

## Pagination & Sorting

The contact list is displayed with pagination and sorting:
- **Pagination**: The table fetches a limited number of contacts (e.g., 10 per page) to avoid overwhelming the user with too many records at once. You can switch pages using the **Previous** and **Next** buttons at the bottom of the table.
- **Sorting**: The table columns are sortable. Users can click on a column header to sort contacts by that attribute.

## Components

### 1. **App.js**
- This is the main entry point of the app where all states and logic are managed. It controls the data fetching, pagination, and handles CRUD operations using Axios.

### 2. **DialogBox.js**
- A modal dialog that opens when adding or editing a contact. This component is responsible for showing the contact form, validating inputs, and submitting data.

### 3. **Contact Table**
- Displays a list of contacts with sorting options. Each row contains a contact’s basic information and action buttons for editing and deleting contacts.

## Error Handling

- **API Failures**: If any API call (e.g., fetching contacts, adding, editing, or deleting) fails, an error message will be logged to the console, and an alert will notify the user of the failure.
- **Empty Table**: If no contacts are found, a message is displayed: "No contacts found".

## License

This project is licensed under the MIT License.

---

This **README.md** provides instructions on setting up and running the frontend of the Contact Management System. It covers the tech stack, features, and installation steps.

Feel free to customize this further based on your exact setup, and let me know if you need any changes or additions!
