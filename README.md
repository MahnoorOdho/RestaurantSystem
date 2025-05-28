# 🍽️ RestaurantSystem

**RestaurantSystem** is a full-stack, microservices-based restaurant management application designed to streamline operations such as menu management, order processing, and customer interactions. The system is built using modern technologies, ensuring scalability and maintainability.

---

## 🧰 Tech Stack

- **Frontend**: React.js (with Vite)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **API Gateway**: Express.js
- **Containerization**: Docker & Docker Compose
- **Deployment**: Render

---

## 📁 Project Structure

```bash
RestaurantSystem/
├── restaurant-frontend/ # React frontend application
├── restaurant-backend/
│ ├── api-gateway/ # API Gateway for routing requests
│ ├── menu-service/ # Microservice for menu management
│ ├── order-service/ # Microservice for order processing
│ ├── reservation-service/ # Microservice for reservations
│ └── contact-service/ # Microservice for contact forms/messages
├── docker-compose.yml # Docker Compose configuration
├── .gitignore # Git ignore file
└── README.md # Project documentation

```
---

## 🚀 Features

### 🔗 API Gateway

- Centralized entry point for all client requests.
- Routes requests to appropriate microservices.
- Handles cross-cutting concerns like authentication and logging.

### 📋 Menu Service

- **CRUD Operations**: Create, read, update, and delete menu items.
- **Categorization**: Organize menu items into categories.
- **Search Functionality**: Search for menu items by name or category.

### 🛒 Order Service

- **Order Placement**: Customers can place orders for menu items.
- **Order Tracking**: Track the status of orders (e.g., pending, in progress, completed).
- **Order History**: View past orders and their details.

### 📅 Reservation Service

- **Book a Table**: Customers can reserve tables for specific times/dates.
- **View Reservations**: Admin can view and manage reservations.

### ✉️ Contact Service

- **Contact Form Handling**: Receive and store customer messages.
- **Admin View**: Admins can review submitted messages.

### 💻 Frontend

- **User Interface**: Interactive and responsive UI built with React.js.
- **Routing**: Client-side routing for seamless navigation.
- **API Integration**: Communicates with the API Gateway to fetch and display data.

---

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- [Docker](https://www.docker.com/) installed
- [MongoDB](https://www.mongodb.com/) instance (local or cloud-based)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/MahnoorOdho/RestaurantSystem.git
   cd RestaurantSystem


2. **Set up environment variables**:
   ```
     Create .env files for each service based on the provided .env.example templates.
     Ensure all necessary variables like MONGODB_URI, PORT, and API_URL are set.

3. **Start the services using Docker Compose** :
```bash
    docker-compose up --build


