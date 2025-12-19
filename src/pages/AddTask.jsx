// src/pages/AddTask.jsx
import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function AddTask() {
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");
  const [projectId, setProjectId] = useState("");

  const [searchParams] = useSearchParams();
  const projectIdFromUrl = searchParams.get("projectId");

  useEffect(() => {
    if (projectIdFromUrl) {
      setProjectId(projectIdFromUrl);
    }
  }, [projectIdFromUrl]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !projectId) return;

    const newTask = {
      // ID كسلسلة نصية
      id: Date.now().toString(),
      title,
      description,
      status,
      // projectId كرقم للمقارنة
      projectId: Number(projectId),
    };

    dispatch({ type: "ADD_TASK", payload: newTask });
    //navigate(`/tasks/${projectId}`);
    //navigate("/add-project");
    navigate("/");
  };

  return (
    <div
      className={`max-w-xl mx-auto p-4 flex-1 ${
        state.isDarkMode ? "bg-gray-900" : "bg-purple-50"
      }`}
    >
      <h2 className="text-2xl font-bold mb-4 text-purple-800 dark:text-white">
        Add Task
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* حقل العنوان */}
        <input
          className="w-full border p-3 rounded shadow-sm focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* حقل الوصف */}
        <textarea
          rows="3"
          className="w-full border p-3 rounded shadow-sm focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* قائمة المشاريع المنسدلة */}
        <select
          className="w-full border p-3 rounded shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          required
        >
          <option value="">Select Project</option>
          {state.projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title}
            </option>
          ))}
        </select>

        {/* قائمة الحالة المنسدلة */}
        <select
          className="w-full border p-3 rounded shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="todo">To Do</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
        </select>

        {/* زر الإضافة */}
        <button
          type="submit"
          className="w-full bg-purple-700 text-white p-3 rounded font-semibold hover:bg-purple-800 transition-colors duration-200 dark:bg-purple-600 dark:hover:bg-purple-700"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}
