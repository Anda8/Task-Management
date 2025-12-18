// src/pages/AddProject.jsx
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const AddProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { dispatch, state } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProject = {
      // نستخدم Date.now() ثم نحوله لـ String في Context لضمان التوافق مع D&D
      id: Date.now(), 
      title,
      description,
    };

    dispatch({ type: "ADD_PROJECT", payload: newProject });
    navigate("/"); // go back to Dashboard
  };

  return (
    <div className={`max-w-md mx-auto p-6 flex-1 ${state.isDarkMode ? 'bg-gray-900' : 'bg-purple-50'}`}>
      <h2 className="text-2xl font-bold mb-4 text-purple-800 dark:text-white">
        Add Project
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* حقل العنوان */}
        <input
          type="text"
          placeholder="Project Title"
          className="w-full border p-3 rounded shadow-sm focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* حقل الوصف */}
        <textarea
          placeholder="Project Description"
          rows="4"
          className="w-full border p-3 rounded shadow-sm focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        {/* زر الإضافة */}
        <button
          type="submit"
          className="w-full bg-purple-700 text-white p-3 rounded font-semibold hover:bg-purple-800 transition-colors duration-200 dark:bg-purple-600 dark:hover:bg-purple-700"
        >
          Add Project
        </button>
      </form>
    </div>
  );
};

export default AddProject;