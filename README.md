# 💰 Expense Tracker Dashboard

> A modern full-stack Expense Management Application built using **React, Spring Boot, MySQL, JWT Authentication, Axios, Bootstrap, and Spring Data JPA**.

This application enables users to securely log in and efficiently manage their daily expenses through a clean dashboard interface with complete CRUD operations, search, filtering, sorting, and real-time analytics.

---

## 🚀 Project Overview

Managing personal expenses manually can be difficult and time-consuming. This project provides a centralized dashboard where users can track expenses, categorize spending, monitor transactions, and manage records through a secure authentication system.

The project demonstrates end-to-end full-stack development including:

- Frontend Development with React
- REST API Development using Spring Boot
- Database Integration with MySQL
- JWT Authentication
- CRUD Operations
- State Management
- Client-Server Communication using Axios
- Responsive UI Design using Bootstrap
- API Testing using Postman
- Version Control using Git & GitHub

---

# ✨ Features

## 🔐 Authentication

- JWT-based Login System
- Secure Token Generation
- Local Storage Token Management
- Session Persistence
- Logout Functionality

---

## 📊 Dashboard Analytics

- Total Expenses Spent
- Total Transactions Count
- Top Spending Category
- Real-Time Dashboard Updates

---

## 💳 Expense Management

### Create Expense
Users can add expenses with:

- Expense Title
- Category
- Payment Mode
- Amount
- Expense Date

### Read Expense
- View all expenses in a responsive table
- Automatically fetch records from database

### Update Expense
- Edit any existing expense
- Update details instantly

### Delete Expense
- Delete expense records
- Confirmation popup before deletion

---

## 🔍 Search & Filtering

### Search
Search by:

- Expense Title
- Category
- Payment Mode

### Category Filter

Filter records by:

- Food
- Travel
- Shopping
- Bills
- Education
- Other

### Amount Sorting

Sort expenses:

- High → Low
- Low → High

---

## 📅 Smart Date Selection

Users can:

- Select any date manually
- Use "Today's Date" checkbox for quick entry

---

# 🛠️ Tech Stack

## Frontend

- React
- Vite
- Axios
- Bootstrap 5
- JavaScript (ES6+)
- CSS3

---

## Backend

- Java 17
- Spring Boot
- Spring Web
- Spring Data JPA
- Spring Security
- JWT (JSON Web Token)
- Lombok
- Maven

---

## Database

- MySQL

---

## Development Tools

- IntelliJ IDEA
- VS Code
- Postman
- Git
- GitHub

---

# 🏗️ System Architecture

```text
React Frontend
      │
      ▼
Axios HTTP Requests
      │
      ▼
Spring Boot REST APIs
      │
      ▼
Controller Layer
      │
      ▼
Repository Layer (JPA)
      │
      ▼
MySQL Database
      │
      ▼
JSON Response
      │
      ▼
React UI Update
```

---

# 📂 Project Structure

```text
ExpenseTracker
│
├── backend
│   │
│   ├── config
│   │   └── SecurityConfig.java
│   │
│   ├── controller
│   │   ├── AuthController.java
│   │   └── ExpenseController.java
│   │
│   ├── entity
│   │   └── Expense.java
│   │
│   ├── repository
│   │   └── ExpenseRepository.java
│   │
│   ├── security
│   │   └── JwtUtil.java
│   │
│   ├── application.properties
│   │
│   └── ExpensetrackerApplication.java
│
└── frontend
    │
    ├── src
    │   ├── App.jsx
    │   ├── App.css
    │   └── main.jsx
    │
    └── package.json
```

---

# 🗄️ Database Schema

## Expense Table

| Column | Data Type |
|----------|----------|
| id | BIGINT |
| title | VARCHAR |
| category | VARCHAR |
| paymentMode | VARCHAR |
| amount | DOUBLE |
| expenseDate | DATE |

---

# 🔗 REST API Endpoints

## Authentication

### Login

```http
POST /api/auth/login
```

Request:

```json
{
  "username": "admin",
  "password": "admin123"
}
```

Response:

```json
{
  "token": "JWT_TOKEN",
  "message": "Login successful"
}
```

---

## Expense APIs

### Get All Expenses

```http
GET /api/expenses
```

---

### Add Expense

```http
POST /api/expenses
```

---

### Update Expense

```http
PUT /api/expenses/{id}
```

---

### Delete Expense

```http
DELETE /api/expenses/{id}
```

---

### Dashboard Analytics

```http
GET /api/expenses/dashboard
```

---

# 🔑 JWT Authentication Flow

```text
User Login
      │
      ▼
React Login Form
      │
      ▼
POST /api/auth/login
      │
      ▼
Spring Boot Authentication
      │
      ▼
JWT Token Generated
      │
      ▼
Token Returned To React
      │
      ▼
Stored In Browser Local Storage
      │
      ▼
Dashboard Access Granted
```

---

# ⚙️ Installation & Setup

## Clone Repository

```bash
git clone https://github.com/SoumyaDhole/expense-tracker-dashboard.git
```

---

# Backend Setup

### Create Database

```sql
CREATE DATABASE expensedb;
```

---

### Configure MySQL

Update:

```properties
backend/src/main/resources/application.properties
```

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/expensedb
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

server.port=8080
```

---

### Run Backend

Open backend folder in IntelliJ IDEA and run:

```text
ExpensetrackerApplication.java
```

Backend URL:

```text
http://localhost:8080
```

---

# Frontend Setup

Open frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start application:

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

# 🎯 Login Credentials

```text
Username : admin
Password : admin123
```

> Note: These credentials are used for demonstration purposes. In a production environment, credentials should be stored securely in the database with encrypted passwords.

---

# 🧪 Testing

API testing performed using:

- Postman
- Browser Testing
- Manual CRUD Validation

Verified Operations:

- Login Authentication
- Add Expense
- Fetch Expenses
- Update Expense
- Delete Expense
- Search Functionality
- Category Filtering
- Amount Sorting
- Dashboard Statistics

---

# 📚 Concepts Demonstrated

### Spring Boot

- REST APIs
- Controllers
- Dependency Injection
- Spring Security
- JWT Authentication
- Spring Data JPA
- Hibernate ORM

### React

- Components
- JSX
- useState
- useEffect
- Event Handling
- Conditional Rendering
- Form Handling
- Dynamic Rendering

### Database

- MySQL Integration
- Table Mapping
- CRUD Operations
- Entity Relationships

### API Communication

- Axios
- JSON Data Exchange
- HTTP Methods
  - GET
  - POST
  - PUT
  - DELETE

---

# 🎓 Learning Outcomes

Through this project I gained practical experience in:

- Full Stack Application Development
- Frontend & Backend Integration
- REST API Design
- Database Management
- Authentication & Authorization Concepts
- React State Management
- Spring Boot Architecture
- Version Control using Git & GitHub
- Professional Project Structuring

---

# 📈 Future Enhancements

Potential improvements:

- User Registration
- Database-Based Authentication
- Expense Categories Dashboard Charts
- Monthly Reports
- PDF Export
- Docker Deployment
- JUnit & Mockito Testing
- Role-Based Access Control
- Microservices Architecture
- Cloud Deployment

---

# 📝 Resume Description

**Expense Tracker Dashboard | React, Spring Boot, MySQL, JWT**

Developed a full-stack Expense Tracker Dashboard using React, Spring Boot, MySQL, JWT Authentication, Axios, Bootstrap, and Spring Data JPA. Implemented secure login, complete CRUD operations, dashboard analytics, category filtering, amount sorting, payment mode tracking, and responsive UI design. Integrated frontend and backend through REST APIs and persisted data using MySQL with JPA/Hibernate.

---

# 👨‍💻 Author

### Soumya Dhole

🔗 GitHub: https://github.com/SoumyaDhole

---

⭐ If you found this project useful, consider giving the repository a star.
