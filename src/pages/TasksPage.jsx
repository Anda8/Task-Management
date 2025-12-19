// src/pages/TasksPage.jsx
import { useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function TasksPage() {
  const { projectId } = useParams();
  // نحتاج إلى Number للمقارنة مع task.projectId
  const projectIdNum = Number(projectId); 
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  // فلترة المهام الخاصة بالمشروع
  const tasksForProject = state.tasks.filter(
    (task) => task.projectId === projectIdNum
  );
  const taskCount = tasksForProject.length;

  const currentProject = state.projects.find(p => p.id === projectId);

  const columns = {
    todo: {
      id: "todo",
      title: "To Do",
      tasks: tasksForProject.filter((t) => t.status === "todo"),
      color: "border-blue-500",
      darkColor: "dark:border-blue-400"
    },
    inprogress: {
      id: "inprogress",
      title: "In Progress",
      tasks: tasksForProject.filter((t) => t.status === "inprogress"),
      color: "border-yellow-500",
      darkColor: "dark:border-yellow-400"
    },
    done: {
      id: "done",
      title: "Done",
      tasks: tasksForProject.filter((t) => t.status === "done"),
      color: "border-green-500",
      darkColor: "dark:border-green-400"
    },
  };

  const moveTask = (task) => {
    let newStatus;
    if (task.status === "todo") newStatus = "inprogress";
    else if (task.status === "inprogress") newStatus = "done";
    else newStatus = "done";

    dispatch({ type: "UPDATE_TASK", payload: { ...task, status: newStatus } });
  };

  const deleteTask = (taskId) => {
    dispatch({ type: "DELETE_TASK", payload: taskId });
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    // استخراج المهمة من الحالة
    const task = tasksForProject.find(t => t.id === draggableId);
    if (!task) return;

    // تطبيق التغيير على الـ status 
    const newStatus = destination.droppableId; 
    dispatch({ type: "UPDATE_TASK", payload: { ...task, status: newStatus } });
  };


  return (
    // 💡 أنماط الوضع الداكن للخلفية
    <div className={`p-6 flex-1 min-h-screen ${state.isDarkMode ? 'bg-gray-900' : 'bg-purple-50'}`}>
      
      {/* رأس الصفحة وزر العودة */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-purple-800 dark:text-white">
             {currentProject?.title || "Tasks"}
          </h1>
          <p className="text-purple-600 dark:text-purple-300">
            {taskCount} Tasks total
          </p>
        </div>

        <div className="flex items-center space-x-3">
            {/* زر العودة */}
            <button
                onClick={() => navigate("/")}
                className="px-4 py-2 text-sm rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
                ← Back to Dashboard
            </button>
            
            {/* زر Add Task */}
            <Link to={`/add-task?projectId=${projectId}`}>
                <button className="bg-purple-700 text-white px-4 py-2 rounded text-sm hover:bg-purple-800 transition-colors dark:bg-purple-600 dark:hover:bg-purple-700">
                    + Add Task
                </button>
            </Link>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex space-x-6 overflow-auto">
          {Object.values(columns).map((column) => (
            <Droppable droppableId={column.id} key={column.id}>
              {(provided) => (
                // 💡 أنماط الوضع الداكن لعمود المهام
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`min-w-[300px] w-[300px] p-4 rounded-lg flex-1   shadow-md border-t-4 ${column.color} 
                    ${state.isDarkMode ? 'bg-gray-800 dark:shadow-lg dark:shadow-gray-700/50' : 'bg-white shadow-xl'}
                    ${column.darkColor}
                  `}
                >
                  <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-white">
                    {column.title} ({column.tasks.length})
                  </h3>

                  {column.tasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        // 💡 أنماط الوضع الداكن لبطاقة المهمة
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="p-3 mb-3 bg-purple-100 rounded shadow cursor-grab active:shadow-lg border-l-4 border-purple-500 dark:bg-gray-700 dark:border-purple-400"
                        >
                          <h4 className="font-semibold text-purple-900 dark:text-white">
                            {task.title}
                          </h4>
                          <p className="text-purple-700 text-sm mb-2 dark:text-purple-300">
                            {task.description}
                          </p>
                          <div className="flex justify-between mt-2">
                            {/* زر Move */}
                            <button
                              onClick={() => moveTask(task)}
                              className="bg-purple-500 text-white px-2 py-1 rounded text-sm hover:bg-purple-600 dark:bg-purple-700 dark:hover:bg-purple-800"
                            >
                              Move
                            </button>
                            {/* زر Delete */}
                            <button
                              onClick={() => deleteTask(task.id)}
                              className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}