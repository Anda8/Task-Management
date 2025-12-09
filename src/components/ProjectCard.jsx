const ProjectCard = ({ title, description, tasks }) => {
  return (
    <div className="bg-white p-5 rounded shadow-sm border border-gray-200 flex flex-col justify-between">
      <div>
        <h3 className=" text-center  font-semibold text-lg mb-1">{title}</h3>
        <p className=" text-center text-gray-600 text-sm mb-3">{description}</p>
      </div>
      <div className="flex justify-between items-center">
        <span className="bg-pink-200 text-pink-800 text-xs px-2 py-1 rounded-full">{tasks.length} Tasks</span>
        <button className="border border-pink-700 text-pink-700 px-3 py-1 rounded text-sm hover:bg-pink-50">
          View Tasks
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
