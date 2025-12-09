import { useContext, useEffect } from "react";
import ProjectCard from "../components/ProjectCard";
import { AppContext } from "../context/AppContext";
// const projects = [
//   {
//     title: "TaskFlow Redesign",
//     description:
//       "Revamping the TaskFlow user interface for improved aesthetics and usability, focusing on modern design",
//     tasks: 12,
//   },
//   {
//     title: "Mobile App Development",
//     description:
//       "Building a native mobile application for iOS and Android to extend TaskFlow functionality on the go",
//     tasks: 8,
//   },
//   {
//     title: "API Integration with Slack",
//     description:
//       "Integrating TaskFlow with Slack to enable seamless task notifications and quick actions directly from chat",
//     tasks: 5,
//   },
//   {
//     title: "Marketing Campaign Launch",
//     description:
//       "Planning and executing the new marketing campaign for the TaskFlow 2.0 release, targeting new user acquisition",
//     tasks: 7,
//   },
//   {
//     title: "User Feedback Analysis",
//     description:
//       "Collecting and analyzing user feedback from various channels to identify pain points and prioritize future",
//     tasks: 9,
//   },
// ];

const Dashboard = () => {
   const { state } = useContext(AppContext);
  const { projects, tasks } = state;
  useEffect(()=>{
    console.log(projects);
    console.log(tasks);
  
  })
  return (
    <main className=" text-center p-6 bg-gray-50 flex-1">
        <h1 className="text-2xl font-bold mb-2 text-gray-800">
          Welcome to TaskFlow!
        </h1>
        <p className="text-gray-500 mb-6">
          Your central hub for managing all your projects and tasks with ease.
        </p>

        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Your Projects
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
           {projects.map((proj) => {

          const projectTasks = tasks.filter(t => t.projectId === proj.id);
          console.log(projectTasks);
          

          return (
            <ProjectCard
              key={proj.id}
              {...proj}
              tasks={projectTasks}
            />
          );
        })}
        </div>
    </main>
  );
};

export default Dashboard;
