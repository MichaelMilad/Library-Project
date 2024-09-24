# Library Management System

A simple library management system built with **Node.js**, **Express**, **Sequelize**, and **MySQL** to manage books, borrowers, and borrowing operations.

## Table Of Contents

1. [Getting Started](#getting-started)
2. [Prerequisites](#prerequisites)
3. [Setup](#setup)
4. [API Documentation](#api-documentation)
5. [TODO List](#todo-list)

---

## Getting Started

Follow these instructions to get the project running on your local machine for development and testing.

### Prerequisites

- **Docker**

### Setup

1. **Clone the Repository**:

```
git clone https://github.com/MichaelMilad/Library-Project.git
cd library-project
```

2. **Have Docker Running**:

- Docker Desktop for Windows
- Docker for Linux Systems

3. **Run Docker Command**

- run the command

```
docker compose up --build
```

This will take care of:

- downloading the mysql image
- building the source code
- adding both to the same network
- source code will automatically connect to the DB (hard coded credentials, env variables in docker compose file)
- source code will automatically create the DB tables needed

_To Do_: Add steps for local initialization without docker

### API Documentation

- All APIs are documented using Swagger documentation at

```
localhost:3000/api/docs
/* Default port is 3000 */
```

### TODO List

- Add Auth (Librarian Role & Manager Role) (Use Tools like Keycloak?)

- Add Unit Testing

- Add Seeding Scripts to generate and populate the database when needed

- Add Reporting Endpoints
  - include node-mailer to send to email
  - include cron jobs to run periodically
