# JWT-UserRegistrationForm

# User Management System with Node.js, Express, and MongoDB

## Project Description

The User Management System is a robust web application built using Node.js, Express.js, and MongoDB, designed to provide efficient and secure user registration, authentication, and data management. This application adheres to the MVC (Model-View-Controller) architectural pattern, ensuring a well-organized and maintainable codebase.

### Features

- **User Registration and Authentication:**
  - **User Registration:** Users can easily create an account by providing their essential information, including a unique username, email address, and a secure password. Input data is validated using Joi, a powerful validation library for Node.js, to ensure data integrity and security.
  - **Password Hashing:** The application employs bcrypt, a strong cryptographic hashing algorithm, to securely store user passwords. This ensures that sensitive user information remains protected even in the event of a security breach.
  - **User Authentication:** Registered users can securely log in to their accounts using JWT (JSON Web Tokens) for authentication. JWTs are issued upon successful login and are used to authenticate users for subsequent requests.

- **User Management:**
  - **Display Single User:** The system allows authorized users to view their own profile details, including their username and email address.
  - **Fetch All Users:** Authorized users with the appropriate permissions can retrieve a list of all registered users in the system. This feature is useful for administrators or user management tasks.

- **Middleware for Authorization:**
  - **Authorization Middleware:** Middleware functions are implemented to ensure that only authenticated users with the necessary privileges can access specific routes and perform certain actions within the application. Unauthorized access attempts are effectively prevented.

- **Database Interaction:**
  - **MongoDB Integration:** The application utilizes MongoDB, a NoSQL database, for data storage and retrieval. MongoDB provides scalability and flexibility, making it an excellent choice for managing user data.

- **MVC Structure:**
  - **MVC Architecture:** The project follows the Model-View-Controller (MVC) architectural pattern to maintain a clean and structured codebase. This separation of concerns enhances code readability, maintainability, and scalability.

- **View Rendering:**
  - **EJS Templating Engine:** EJS (Embedded JavaScript) is used for rendering dynamic HTML views. It allows for the seamless integration of server-side data into the user interface, providing a smooth and interactive user experience.
 
- **Routes:**
- userRouter.get("/register", userController.getRegisterForm);
- userRouter.get("/login", userController.getLoginForm);
- userRouter.get("/logout", userController.getLogoutForm);
- userRouter.get("/allUsersForm", userController.getAllUsersForm);
- userRouter.get("/singleUserForm", userController.getSingleUserForm);

- userRouter.post("/register", userController.registerUser);
- userRouter.post("/login", userController.loginUser);
- userRouter.post("/logout", authentication, userController.logoutUser);
- userRouter.get("/fetch-all-users", authentication, userController.fetchAllUsers);
- userRouter.get("/single-user", authentication, userController.singleUser);

### Technologies Used

- Node.js: A server-side JavaScript runtime environment that powers the application.
- Express.js: A web application framework for Node.js, simplifying the creation of robust and scalable web applications.
- MongoDB: A NoSQL database for storing and managing user data efficiently.
- Joi: A validation library for ensuring the integrity and security of user input.
- JWT (JSON Web Tokens): A secure and efficient method for user authentication.
- Bcrypt: A cryptographic hashing library for securely storing user passwords.
- EJS (Embedded JavaScript): A templating engine for rendering dynamic web pages.
- Express router

## Summary

The User Management System is a feature-rich web application that provides a secure and efficient way to manage user registration, authentication, and data retrieval. Its use of modern technologies and best practices ensures the protection of user data and a smooth user experience. The MVC structure and middleware for authorization make it a well-structured and maintainable project, suitable for a variety of web-based applications.
