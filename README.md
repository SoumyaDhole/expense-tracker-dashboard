# Expense Tracker Dashboard

A full-stack Expense Tracker Dashboard built using React, Spring Boot, MySQL, JWT Authentication, Axios, Bootstrap, and Spring Data JPA.

This project allows users to securely log in and manage daily expenses with add, update, delete, search, filter, sort, and dashboard analytics features.

---

## Features

### Authentication
- JWT-based login
- Logout functionality
- Token stored in browser localStorage

### Expense Management
- Add new expenses
- View all expenses
- Edit existing expenses
- Delete expenses with confirmation
- Search expenses by title, category, or payment mode
- Filter expenses by category
- Sort expenses by amount: High to Low / Low to High

### Dashboard
- Total spent amount
- Total number of transactions
- Top spending category

### Expense Fields
- Title
- Category
- Payment Mode
- Amount
- Date

---

## Tech Stack

### Frontend
- React
- Vite
- Axios
- Bootstrap
- JavaScript
- CSS

### Backend
- Java
- Spring Boot
- Spring Web
- Spring Data JPA
- Spring Security
- JWT
- Lombok
- Maven

### Database
- MySQL

### Tools
- Postman
- IntelliJ IDEA
- VS Code
- Git & GitHub

---

## Project Structure

```text
ExpenseTracker
├── backend
│   ├── src/main/java/com/expense/expensetracker
│   │   ├── config
│   │   ├── controller
│   │   ├── entity
│   │   ├── repository
│   │   ├── security
│   │   └── ExpensetrackerApplication.java
│   └── src/main/resources/application.properties
│
└── frontend
    ├── src
    │   ├── App.jsx
    │   ├── App.css
    │   └── main.jsx
    └── package.json
