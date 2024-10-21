# Google Calendar

This is the backend of a task management system built using **Node.js** and **Express**. It provides APIs for user authentication, task creation, assignment, and management, with role-based access control for Managers and Employees.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Available Routes](#available-routes)
- [Database Setup](#database-setup)
- [Running the Server](#running-the-server)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **User Authentication:** Register and login using JWT authentication.
- **Role-Based Access Control:** Managers can assign tasks; Employees can view assigned tasks.
- **Task Management:** Create, edit, and delete tasks based on user roles.
- **MongoDB Integration:** All data is stored in MongoDB.
- **Express Server:** Handles HTTP requests and responses.
- **Error Handling:** Global error handling for unhandled routes.

---

## Technologies Used

- **Node.js**: JavaScript runtime
- **Express.js**: Web framework for Node.js
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling for Node.js
- **JWT (Json Web Token)**: For secure authentication
- **Cors**: Middleware to handle cross-origin requests

---

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/node-backend.git

2. **Run the following command to install the required dependencies:**

   ```bash
   npm install

