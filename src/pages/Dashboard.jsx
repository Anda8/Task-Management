import { useContext, useEffect } from "react";
import ProjectCard from "../components/ProjectCard";
import { AppContext } from "../context/AppContext";

const Dashboard = () => {
  const { state } = useContext(AppContext);
  const { projects, tasks } = state;

  useEffect(() => {
    console.log(projects);
    console.log(tasks);
  }, [projects, tasks]);

  return (
    <main className="text-center p-6 bg-purple-50 flex-1 min-h-screen">
      <h1 className="text-3xl font-bold mb-2 text-purple-800">
        Welcome to TaskFlow!
      </h1>
      <p className="text-purple-600 mb-6">
        Your central hub for managing all your projects and tasks with ease.
      </p>

      <h2 className="text-xl font-semibold mb-4 text-purple-700">
        Your Projects
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj) => {
          const projectTasks = tasks.filter((t) => t.projectId === proj.id);

          return (
            <ProjectCard
              key={proj.id}
              {...proj}
              tasks={projectTasks}
              cardBg="bg-purple-100"
              cardBorder="border-purple-200"
              taskCountBg="bg-purple-200"
              taskCountText="text-purple-800"
              buttonBg="border-purple-700"
              buttonText="text-purple-700"
            />
          );
        })}
      </div>
    </main>
  );
};

export default Dashboard;
