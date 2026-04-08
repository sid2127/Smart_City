# 🌆 Smart City Management System

A full-stack web application designed to improve communication between citizens and city authorities. This platform enables efficient complaint management with role-based access for Users, Officers, and Admin.

---

## 🚀 Features

### 👤 User

* Register & Login
* Raise complaints (roads, garbage, water, electricity, etc.)
* Track complaint status
* Give feedback after resolution

---

### 👮 Officer

* View complaints assigned to their department
* Update complaint status:

  * Pending → In Progress → Resolved
* Add remarks or updates on complaints

---

### 🛡️ Admin

* Manage all users and officers
* Assign complaints to officers/departments
* Delete invalid or spam complaints
* Monitor overall system activity

---

## 🔐 Role-Based Access Control (RBAC)

The system implements **Role-Based Access Control (RBAC)**:

* **User** → Can create and track complaints
* **Officer** → Can handle and resolve complaints
* **Admin** → Full control over system

---

## 🗄️ Database Schema (Updated)

### Users Table

* id
* name
* email
* password
* role (user / officer / admin)
* department (for officers)

---

### Complaints Table

* id
* user_id
* title
* description
* status
* assigned_officer_id
* created_at

---

## 📌 Workflow

1. User raises complaint
2. Admin assigns complaint to officer
3. Officer updates status
4. User tracks progress & gives feedback


🏗️ Tech Stack
Frontend
React.js
HTML, CSS, JavaScript
Backend
Node.js
Express.js
Database
MySQL
Other Tools
JWT Authentication
REST APIs

---
