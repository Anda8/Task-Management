import { useNavigate } from "react-router-dom";

const ProjectCard = ({ id, title, description, tasks }) => {
  const navigate = useNavigate();

  const handleViewTasks = () => {
    navigate(`/tasks/${id}`);
  };

  return (
    <div className="bg-purple-100 p-5 rounded shadow-sm border border-purple-200 flex flex-col justify-between">
      <div>
        <h3 className="text-center font-semibold text-lg mb-1 text-purple-800">
          {title}
        </h3>
        <p className="text-center text-purple-600 text-sm mb-3">
          {description}
        </p>
      </div>
      <div className="flex justify-between items-center">
        <span className="bg-purple-200 text-purple-800 text-xs px-2 py-1 rounded-full">
          {tasks.length} Tasks
        </span>
        <button
          onClick={handleViewTasks}
          className="border border-purple-700 text-purple-700 px-3 py-1 rounded text-sm hover:bg-purple-50"
        >
          View Tasks
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
