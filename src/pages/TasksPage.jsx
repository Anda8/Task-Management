import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function TasksPage() {
  const { projectId } = useParams();
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  // فلترة المهام الخاصة بالمشروع
  const tasks = state.tasks.filter((task) => task.projectId === projectId);

  const columns = {
    todo: tasks.filter((t) => t.status === "todo"),
    inprogress: tasks.filter((t) => t.status === "inprogress"),
    done: tasks.filter((t) => t.status === "done"),
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
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const task = state.tasks.find((t) => t.id === draggableId);
    if (task) {
      const newStatus = destination.droppableId;
      dispatch({
        type: "UPDATE_TASK",
        payload: { ...task, status: newStatus },
      });
    }
  };

  return (
    <div className="min-h-screen p-6 bg-purple-50 flex flex-col">
      {/* زر Add Task */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-purple-900">
          Tasks for Project {projectId}
        </h2>
        <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
          Add Task
        </button>
        <button
          onClick={() => navigate("/")}
          className="bg-purple-400 text-white px-4 py-2 rounded hover:bg-purple-500"
        >
          Back to Dashboard
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
          {["todo", "inprogress", "done"].map((col) => (
            <Droppable droppableId={col} key={col}>
              {(provided) => (
                <div
                  className={`bg-purple-100 p-4 rounded shadow min-h-[300px]`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h3 className="text-purple-800 font-semibold mb-3 capitalize">
                    {col === "todo"
                      ? "To Do"
                      : col === "inprogress"
                      ? "In Progress"
                      : "Done"}
                  </h3>
                  {columns[col].map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          className={`bg-white p-3 mb-3 rounded shadow hover:shadow-md`}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <h4 className="font-semibold text-purple-900">
                            {task.title}
                          </h4>
                          <p className="text-purple-700 text-sm mb-2">
                            {task.description}
                          </p>
                          <div className="flex justify-between mt-2">
                            <button
                              onClick={() => moveTask(task)}
                              className="bg-purple-500 text-white px-2 py-1 rounded text-sm hover:bg-purple-600"
                            >
                              Move
                            </button>
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
