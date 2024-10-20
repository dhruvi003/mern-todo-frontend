# Task Management App

A simple and efficient Task Management App built with a MERN stack (MongoDB, Express.js, React, Node.js) that allows users to manage their tasks effectively. The application features real-time updates using WebSockets or Server-Sent Events (SSE).

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Instructions](#instructions)
- [Challenges and Decisions](#challenges-and-decisions)
- [License](#license)

## Features

- Create, read, update, and delete tasks
- Real-time updates with WebSockets or Server-Sent Events (SSE)
- Responsive design for mobile and desktop

## Technologies Used

- **Frontend**: 
  - React.js for building user interfaces
  - Bootstrap for responsive styling
  - WebSockets or Server-Sent Events for real-time communication
- **Backend**: 
  - Node.js and Express.js for server-side logic
  - MongoDB for database management
  - Mongoose for object data modeling (ODM)
- **Development Tools**:
  - Nodemon for automatic server restarts during development
  - Axios for making HTTP requests from the frontend

## Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB installed and running locally or access to a MongoDB Atlas cluster
- npm (Node Package Manager)

### Setting Up the Backend

1. Clone the repository:
   ```bash
   git clone https://github.com/dhruvi003/todoList-mern.git
   cd task-management-app/backend

2. Install backend dependencies:
   ```bash
   npm install

3. Set up your MongoDB connection. In config/db.js, replace the  connection string with your MongoDB URI.
    ```bash
    npm start

### Setting Up the Frontend

1. **Open a New Terminal**: Once the backend is running, open a new terminal window.

2. **Navigate to the Frontend Directory**:
   ```bash
   cd task-management-app/frontend

3. **Install Frontend Dependencies**:
   ```bash
   npm install

4. **Start the React Application**:
   ```bash
   npm start

5. **Access the Application**:
   ```bash
   http://localhost:3000

### Challenges and Decisions
- Real-Time Updates: Implementing real-time updates posed a challenge as we had to choose between WebSockets and Server-Sent Events. Ultimately, we opted for WebSockets for bidirectional communication, allowing both the client and server to send messages to each other.

- State Management: Managing the application state for tasks was critical for ensuring the UI remained responsive. We decided to use React’s built-in state management with hooks, which simplified our code and improved performance.

- Responsive Design: Ensuring the application looked good on all devices required extensive testing and adjustments. We utilized Bootstrap to make the design responsive without excessive custom CSS.