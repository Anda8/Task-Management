// src/components/ProjectCard.jsx
import { useNavigate } from "react-router-dom";

const ProjectCard = ({ id, title, description, tasks }) => {
  const navigate = useNavigate();

  const handleViewTasks = () => {
    navigate(`/tasks/${id}`);
  };

  return (
    // 💡 أنماط الوضع الداكن للبطاقة
    <div className="bg-purple-100 p-5 rounded shadow-sm border border-purple-200 flex flex-col justify-between dark:bg-gray-800 dark:border-gray-700">
      <div>
        <h3 className="text-center font-semibold text-lg mb-1 text-purple-800 dark:text-white">
          {title}
        </h3>
        <p className="text-center text-purple-600 text-sm mb-3 dark:text-purple-300">
          {description}
        </p>
      </div>
      <div className="flex justify-between items-center">
        {/* 💡 أنماط الوضع الداكن لعداد المهام */}
        <span className="bg-purple-200 text-purple-800 text-xs px-2 py-1 rounded-full dark:bg-purple-900 dark:text-purple-200">
          {tasks.length} Tasks
        </span>
        {/* 💡 أنماط الوضع الداكن لزر View Tasks */}
        <button
          onClick={handleViewTasks}
          className="border border-purple-700 text-purple-700 px-3 py-1 rounded text-sm hover:bg-purple-50 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-gray-700"
        >
          View Tasks
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;