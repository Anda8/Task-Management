React Final Project
Task Management Dashboard (Mini Trello)

Using React (Vite) & Tailwind CSS

🔹 Project Overview

This project is a Task Management Dashboard inspired by Trello and Asana.
It is a Single Page Application (SPA) built using React, allowing users to manage projects and tasks.

Projects and tasks are initially fetched from a public API, while adding, deleting, and updating tasks and projects are handled locally using React state.

🔹 Main Features
1️⃣ Dashboard – Projects List Page (/)

Display list of projects fetched from API.

Each project is displayed in a ProjectCard.

ProjectCard includes:

Project title

Short description

Number of tasks

“View Tasks” button

Button to navigate to Add Project Page.

2️⃣ Project Tasks Page (/project/:id)

Display selected project title.

Show three task columns:

To Do

In Progress

Done

Each task is displayed in a TaskCard containing:

Task title

Task description

Task actions (move between columns, delete)

Users can:

Move tasks between columns (by press moving button or using dtag and drop).

Delete tasks.

Button to navigate to Add Task Page.

3️⃣ Add Task Page (/add-task)

Form fields:

Task Title

Task Description

Select Project

Select Status (To Do, In Progress, Done)

On submit:

Task is added to local state.

User is redirected to the selected project page.

4️⃣ Add Project Page (/add-project)

Form fields:

Project Title

Project Description

On submit:

Project is added to local state.

User is redirected to the Dashboard.

🔹 API 

We used MockAPI.io is used to simulate backend data.

رابعًا: Team Roles (حسب شغلكم الحقيقي)
👩‍💻 Team Members & Contributions

ندى

Implemented the main Dashboard layout and Projects List page.("Eng/ Anda")

داليا

Implemented the Project Tasks page with three columns (To Do, In Progress, Done) and Implemented task movement .("Eng/ Dalia Atef")

Designed and implemented the Mock API structure, Created the Add Project page and Implemented local project storage. .("Eng/ Rola")

Created the Add Task page and Implemented local project storage for it.("Eng/ Rahma")

Implemented local task storage and linking tasks to projects.


We Make a Bonus Features:-

🔍 Search tasks inside project page

🌙 Dark mode

🧲 Drag & Drop tasks

💾 Save data to LocalStorage
