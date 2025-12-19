# Task Management Dashboard (Mini Trello)

## Project Overview
This project is a **Task Management Dashboard** inspired by Trello and Asana. It is a simplified SPA built with **React**, **Vite**, and **Tailwind CSS**.  

The dashboard allows users to:  
- View a list of projects.  
- View tasks for each project in **To Do**, **In Progress**, and **Done** columns.  
- Add new tasks and projects.  
- Move tasks between columns using **Drag & Drop**.  
- Search for tasks by title or description.  
- Enable **Dark Mode**.  
- Save all projects and tasks in **LocalStorage** for persistence.

---

## Features

### Dashboard (Projects List Page `/`)
- Displays all projects fetched from the API.  
- Each project shows:
  - Title  
  - Short description  
  - Task count  
  - "View Tasks" button  
- Button to navigate to **Add Project** page.

### Project Tasks Page (`/tasks/:projectId`)
- Displays project title.  
- Shows tasks divided into three columns: **To Do**, **In Progress**, **Done**.  
- Each task card shows title, description, status, and actions:  
  - Move task between columns  
  - Delete task  
- Search bar to find tasks by title or description.  
- Button to navigate to **Add Task** page.  
- Supports **Drag & Drop**.

### Add Project Page (`/add-project`)
- Form fields:  
  - Project Title  
  - Project Description  
- On submit: adds project to local state and redirects to Dashboard.

### Add Task Page (`/add-task`)
- Form fields:  
  - Task Title  
  - Task Description  
  - Select Project (dropdown)  
  - Select Status (To Do, In Progress, Done)  
- On submit: adds task to local state and redirects to Project page.

### Optional / Advanced Features Implemented
- Search for tasks  
- Drag & Drop tasks  
- Dark Mode  
- LocalStorage persistence  

---

## Technology Stack
- **React** (SPA)  
- **Vite** (Bundler)  
- **Tailwind CSS** (Styling)  
- **LocalStorage** for persistent data  

---

## Installation & Running the Project

1. Clone the repository:
```bash
git clone https://github.com/Anda8/Task-Management.git
cd Task-Management
Install dependencies:
npm install
Start the development server:
npm run dev
Open your browser at the displayed URL (usually http://localhost:5173/)

**Team Roles**
Anda:- Built the Dashboard and Project List UI
Rola:- Set up API & implemented Add Project page
Dalia:- Implemented Project Tasks page, Search for Tasks, and Drag & Drop,handle localstorage
Rahma:- Implemented Add Task page and Dark Mode feature

Repository Link""
https://github.com/Anda8/Task-Management

