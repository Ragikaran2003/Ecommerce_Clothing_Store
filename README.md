# MyShop - MERN E-Commerce System

A fullstack e-commerce web application built with **MongoDB, Express, React (Vite), and Node.js**, featuring user authentication, product management, cart, orders, and email notifications.

## 📋 Features

### Frontend
- User authentication (Login/Register)
- Product browsing with filters (search, category, size, price range)
- Shopping cart functionality
- Order management
- Responsive design for all devices
- Guest cart persistence

### Backend
- RESTful API with Express.js
- JWT authentication
- MongoDB database
- Product management
- Cart and order processing
- Email notifications for orders

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm package manager

## Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/Ragikaran2003/Ecommerce_Clothing_Store.git
    cd Ecommerce_Clothing_Store
    ```
2. Setup backend
    ```bash
    cd backend
    npm install

    Next => ***Setup 3***

    -After Setup 3
        npm run seed
        npm run dev
        Success run Backend...
    ```
3. .env file Config
    ```bash
    copy .env.example .env

    chnage your values

        PORT=5000
        MONGO_URI=your_mongodb_connection_string_here
        JWT_SECRET=your_jwt_secret_here
        EMAIL_USER=your_email@example.com
        EMAIL_PASS=your_email_app_password
    ```
4. Setup Frontend
    Open New Terminal
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

## Application URLs
    Frontend: http://localhost:5173
    Backend API: http://localhost:5000/api