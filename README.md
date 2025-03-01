# User Management Application

This **User Management Application** is a full-stack web application built with React, Node.js, Express.js, and MongoDB. This app allows users to manage information such as first name, last name, date of birth, address, phone number, and email. Users can perform basic CRUD (Create, Read, Update, Delete) operations through a simple and intuitive user interface.

The goal of this project was to provide a clean and interactive platform to manage user data, validate inputs, and maintain data persistence through MongoDB.

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#installation)
- [Usage](#usage)
- [Features](#features)
- [Screenshots](#screenshots)
- [File Structure](#file-structure)
- [Code Snippets](#code-snippets)
- [Challenges Faced And Solutions Implemented](#challenges-faced-and-solutions-implemented)

## Project Overview

The **User Management Application** is a simple web application for managing users. It allows you to:

- **Add Users**: Create new user entries.
- **View Users**: Display a list of all users.
- **Update Users**: Edit user details

## Technologies Used
### Frontend
- **React.js** -A JavaScript library for building dynamic and interactive user interfaces.
- **React Router** - Handles navigation and routing between different pages in the application.
- **Evergreen UI** -  Provides pre-built, customizable components for a sleek and modern UI.
- **Bootstrap** - A responsive framework to ensure the application looks great on all devices.
- **CSS** - Custom styling to enhance the overall appearance and user experience.
- **JavaScript (ES6)** - he primary programming language used for the frontend logic.

### Backend
- **Node.js** - A JavaScript runtime for executing server-side code and building scalable applications.
- **Express.js** - A lightweight web framework for creating APIs and handling HTTP requests.
- **MongoDB** - A NoSQL database used for storing and managing user data efficiently.
- **Mongoose** - An ODM (Object Data Modeling) library for MongoDB that simplifies database interactions.

### Additional Tools
- **Axios for API requests** - Handles HTTP requests for data retrieval and submission.
- **ag-Grid for data display** -  Displays data in a dynamic, customizable, and responsive grid format.
- **dotenv for environment configuration** - Manages environment variables, such as database connection strings, securely.


## Prerequisites

Before running the application, ensure to have the following installed:

- **Node.js (v14+)**: Download and install [Node.js](https://nodejs.org/) (which includes npm).
- **MongoDB**:A NoSQL database used to store user data in the application. We can a cloud-hosted service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
- **npm**: Node Package Manager comes with Node.js.
- **Git**: For version control and cloning the repository. You can download [Git](https://git-scm.com/).

## Installation

### Steps to Set Up

1. **Clone the repository**:

    ```bash
    git clone https://github.com/kshitijchaudhary/mern-user-management-app
    ```

2. **Navigate to the project folder**:

    ```bash
    cd mern-user-management-app
    ```

3. **Install project dependencies for both frontend and backend**:

    ```bash
    #Frontend
    cd client
    npm install

    #Backend
    cd ../server
    npm install
    ```

    This will install all required libraries and dependencies listed in the `package.json` file.
3. **Set up environment variables:**:
    ```bash
    1. Sign in to MongoDB Atlas (https://www.mongodb.com/cloud/atlas) and Create a cluster
    2. Create a new database called userManagement and add a users collection.
    3. Obtain the connection string (eg:mongodb+srv://<username>:<password>@cluster.mongodb.net/userManagement)
    ```

4. **Set up environment variables:**: Create a .env file in the server directory and add the following
    ```
    MONGO_URI=your_mongodb_connection_string
    PORT=5000
    ```

## Usage

### Run the Application

1. **Start the development server**:

    ```bash
    #Backend
    cd server
    npm run dev

    #Frontend
    cd ../client
    npm start
    ```

2. **Accessing the Application**

- Open your browser and visit [http://localhost:3000](http://localhost:3000).
- The backend server will run on (http://localhost:5000)
- You will be redirected to the home page that displays the list of users. You can navigate to the **Add User** and **Update User** pages using the buttons and links available in the app.

 ### Navigate through the pages:

- **Home Page**: Displays a list of all users.
- **Add User Page**: A form to add a new user.
- **Update User Page**: Allows you to update existing user details.

## Features

- **Add User**: Provides a form to create new users, including fields like name and email.
- **View Users**: Displays a list of users, including options to edit or delete them.
- **Update User**: Allows you to update user details such as name and email.
- **Responsive Design**: The application is fully responsive, meaning it adapts to different screen sizes and devices.
- **Modern UI**: Built with Evergreen UI for a sleek and modern user interface.
- **Dark Mode**: A Toggle Bar is added to switch between states like dark mode and light mode. The selected state persists after page reloads.   Simply click the toggle in the top-right corner to switch modes.

### 1. **Home Page (User List)**

![Home Page](./screenshots/userlist.png)

The Home Page displays the list of all users in a clean and organized grid. You can click on the "Edit" or "Delete" buttons to modify or remove a user.

### 2. **Add User Page**

![Add User Page](./screenshots/adduserpage.png)

This page allows you to add new users by filling out a simple form with fields for name, date of birth, address, phone number, and email. The form is validated, and missing required fields trigger error messages.

### 3. **Edit User Page**

![Edit User Page](./screenshots/edituserpage.png)

The Edit User page lets you edit the details of an existing user. You can update their first name, last name, and other information and save the changes.

### 4. **Express Server**

![Running Express Server](./screenshots/running-express-server.png)

---

## Screenshots
### Functionality of App
i) **Adding New User**
![Adding New User](./screenshots/useradded.png)
![Added User in List](./screenshots/addeduserinlist.png)

ii) **Editing User**
![Editing Existing User](.//screenshots/edituserRyan.png)
![Edited user with new data](.//screenshots/userupdatednew.png)



iii) **Deleting user**
![Deleting User inside Edit User Page](./screenshots/deletinguserinsideedit.png)
![User Deleted](./screenshots/userdeletedfromedit.png)
![Deleting Users from User List Page](./screenshots/deleting-user-from-userlist.png)


iv) **Sorting from Table**
![Sorting from table](./screenshots/sorting-from-table.png)

v) **Powerful Search**
![Search working with any info in table](./screenshots/search-functionality.png)

vi) **Proper Pagination**
![Proper Pagination](./screenshots/proper-pagination.png)


#### Form Validations
i) **Asking for User Input if submitted empty**
![](./screenshots/empty-firstname.png)

ii) **Validating Correct Email**
![](./screenshots/validating-correct-email.png)

#### Screenshots of Application Setup

i) **Creating React App**
![Creating React App](./screenshots/creating-react-app.jpg)


ii) **Installing express server and Initializing packages**
![Installing Express Server and Initializing Packages](./screenshots/installing-express-and-initializing-packages.jpg)


iii) **Installing Ag Grid React**
![Installing Ag Grid React](./screenshots/installing-grid.jpg)

iv) **Installing Evergreen UI**
![Installing Evergreen UI](./screenshots/installing-evergreen-ui.jpg)

v) **Checking Status in Browser**
![Checking Status in Browser](./screenshots/checking-in-browser.jpg)

vi) **Running React as Frontend and Express as Backend**
![Running React as Frontend and Express as Backend](./screenshots/running-backend-frontend.png)

vii) **Using Postman API**
![Using Postman API](./screenshots/using-postman-api.jpg)

viii) **Uploading Code on Github**
![Uploading Code on Github](./screenshots/uploading-code-github.jpg)

### Database Connection
i) **User data stored in MongoDB**
![User data stored in MongoDB](./screenshots/user-data-in-mongo-atlas.png)

---

## File Structure

Here is the file structure of the project:
```
User-Management-App/
├── client/                # React Frontend
│   ├── public/
│   └── src/
│       ├── components/    # React Components
│       │   ├── Navbar.js
│       │   ├── AddUser.js
│       │   ├── UserList.js
│       │   └── EditUser.js
│       ├── api/           # API Logic
│       │   └── UserApi.js
│       ├── css/           # Stylesheets
│       │   └── styles.css
│       ├── App.js       
│       └── index.js     
├── server/              #Backend Express Server
│   ├── controller/      
│   │   └── usercontroller.js
│   ├── models/          
│   │   └── user.js
│   ├── routes/          
│   │   └── userroutes.js
│   ├── .env             
│   └── index.js         
├── README.md            
├── package.json         
└── node_modules/        
```
## Code Snippets

### Backend Examples
i) **User Controller (userController.js)**
![User Controller ](./screenshots/user-controller.png)

ii) **User Routes (userRoutes.js)**
![User Routes](./screenshots/user-routes.png)

iii) **User Model (User.js)**
![User Model](./screenshots/user.png)

iv) **Express Server (index.js)** 
![Express Server](./screenshots/express-server.png)


### Frontend Examples
i) **API (userApi.js)**
![API](./screenshots/api.png)

ii) **Components (AddUser.js)**
![Add User](./screenshots/add-user.png)

iii) **Components (EditUser.js)**
![Edit User](./screenshots/edit-user.png)

iv) **Components (UserList.js)**
![User List](./screenshots/user-list.png)

v) **Static (styles.css)**
![Styles](./screenshots/styles.png)

vi) **Main App (App.js)**
![Main App](./screenshots/main-app.png)

## Challenges Faced and Solutions Implemented
### 1. Data Validation
**Challenge:** One of the main challenges was ensuring proper validation of user inputs, especially on the form fields. This required ensuring that required fields like the first name, last name, and email were filled out correctly.

**Solution:** I used React's state management to store form data and display error messages dynamically. For example, when the user attempts to submit the form without filling out a required field, the application shows a validation message next to the corresponding input field. Additionally, regular expressions were used to validate email formatting.

### 2. Handling Asynchronous Operations
**Challenge:** Making asynchronous calls to the backend (for adding, updating, and deleting users) while maintaining a smooth user experience proved to be tricky. Initially, there were issues with the UI not reflecting changes immediately after a user was updated or deleted.

**Solution:** I resolved this by ensuring that the frontend made asynchronous requests (using Axios) to the backend and then updated the state using setState to re-render the UI with the updated list of users. This ensures the app remains responsive and the changes are reflected immediately after the database is updated.

### 3. Database Connection
**Challenge:** Setting up the database connection with MongoDB was another hurdle, particularly when configuring the MongoDB Atlas cloud database.

**Solution:** I used the Mongoose library to define schemas and interact with the MongoDB database. After setting up the MongoDB Atlas cluster, I connected to it using Mongoose, ensuring that the app can successfully store and retrieve user data. Additionally, I used environment variables to securely store the MongoDB URI.

### 4. Cross-Browser Compatibility
**Challenge:** Ensuring that the application worked seamlessly across different browsers (e.g., Chrome, Firefox, Safari) was a challenge, especially with some UI elements not rendering as expected.

**Solution:** I utilized Bootstrap for styling, which provided cross-browser compatibility. Additionally, I performed testing on different browsers and adjusted the CSS to fix minor layout issues that were causing inconsistencies.

### Conclusion
This User Management Application demonstrates a full-stack approach to building modern web applications. It leverages popular technologies like React, Node.js, Express.js, and MongoDB to offer a smooth and efficient solution for managing user data. While there were several challenges faced during development, such as data validation and database connection, the solutions implemented have resulted in a robust and user-friendly application.

The project has provided valuable experience in working with modern web development tools and frameworks, and the application is now ready for further enhancements and deployment at scale.

