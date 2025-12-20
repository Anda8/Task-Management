// src/context/AppContext.jsx
import React, { createContext, useReducer, useEffect } from "react";
import { getProjects, getTasks } from "../api";

// 1. تحميل حالة الوضع الداكن من LocalStorage
const loadInitialDarkMode = () => {
  try {
    const saved = localStorage.getItem("taskflow_darkmode");
    return saved ? JSON.parse(saved) : false;
  } catch (error) {
    console.error("Error loading dark mode:", error);
    return false;
  }
};

// 2. تحميل المشاريع والمهام من LocalStorage
const loadInitialLocalData = () => {
  try {
    const saved = localStorage.getItem("taskapp_state_v1");
    if (saved) {
      const parsed = JSON.parse(saved);
      const updatedTasks = parsed.tasks.map((task) => ({
        ...task,
        projectId: Number(task.projectId),
      }));
      return {
        projects: parsed.projects || [],
        tasks: updatedTasks || [],
        deletedTaskIds: parsed.deletedTaskIds || [], // 🔹 جلب IDs المحذوفة
      };
    }
  } catch (error) {
    console.error("Error loading local storage data:", error);
  }
  return { projects: [], tasks: [], deletedTaskIds: [] };
};

const initialLocalData = loadInitialLocalData();

const initialState = {
  projects: initialLocalData.projects,
  tasks: initialLocalData.tasks,
  loading: true,
  error: null,
  isDarkMode: loadInitialDarkMode(),
  deletedTaskIds: initialLocalData.deletedTaskIds, // 🔹 خديها من localStorage
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };

    case "SET_DATA": {
      const apiProjects = action.payload.projects;
      const apiTasks = action.payload.tasks;

      const saved = loadInitialLocalData(); // نستخدمه بس للمحلية القديمة

      const mergedProjects = [
        ...apiProjects.filter(
          (p) => !saved.projects.some((sp) => sp.id === p.id)
        ),
        ...saved.projects,
      ];

      // 🔹 merge مع تجاهل المحذوفة runtime من state فقط
      const mergedTasks = [
        ...apiTasks.filter(
          (t) =>
            !saved.tasks.some((st) => st.id === t.id) &&
            !state.deletedTaskIds.includes(t.id)
        ),
        ...saved.tasks,
      ];

      return {
        ...state,
        projects: mergedProjects,
        tasks: mergedTasks,
        loading: false,
        error: null,
      };
    }

    case "ADD_PROJECT":
      // تحويل الـ ID إلى String للتوافق مع Drag&Drop (بما أننا نستخدم Date.now() في AddProject.jsx)
      const newProj = { ...action.payload, id: String(action.payload.id) };
      return { ...state, projects: [...state.projects, newProj] };

    case "ADD_TASK":
      // تحويل الـ ID إلى String للتوافق مع Drag&Drop
      const newTask = { ...action.payload, id: String(action.payload.id) };
      return { ...state, tasks: [...state.tasks, newTask] };

    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload),
        deletedTaskIds: [...state.deletedTaskIds, action.payload], // 🔹 حفظ الـ ID
      };

    case "TOGGLE_DARK_MODE":
      return { ...state, isDarkMode: !state.isDarkMode };

    default:
      return state;
  }
}

export const AppContext = createContext({
  state: initialState,
  dispatch: () => {},
});

export const AppProvider = ({ children, baseUrl }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // 1. جلب البيانات من الـ API
  useEffect(() => {
    let active = true;
    (async () => {
      if (state.loading === false) {
        dispatch({ type: "SET_LOADING", payload: true });
      }

      try {
        if (baseUrl) {
          const [projects, tasks] = await Promise.all([
            getProjects(baseUrl),
            getTasks(baseUrl),
          ]);

          if (!active) return;

          const updatedTasks = tasks.map((task) => ({
            ...task,
            id: String(task.id),
            projectId: Number(task.projectId),
          }));

          const updatedProjects = projects.map((p) => ({
            ...p,
            id: String(p.id),
          }));

          dispatch({
            type: "SET_DATA",
            payload: { projects: updatedProjects, tasks: updatedTasks },
          });
        }
      } catch (err) {
        if (!active) return;
        console.error("API failed, persisting with local data:", err);
        dispatch({ type: "SET_ERROR", payload: err.message });
        dispatch({ type: "SET_LOADING", payload: false });
      }
    })();
    return () => {
      active = false;
    };
  }, [baseUrl]);

  // 2. حفظ حالة المشاريع والمهام في LocalStorage
  useEffect(() => {
    localStorage.setItem(
      "taskapp_state_v1",
      JSON.stringify({
        projects: state.projects,
        tasks: state.tasks,
        deletedTaskIds: state.deletedTaskIds, // 🔹 حفظ IDs المحذوفة
      })
    );
  }, [state.projects, state.tasks, state.deletedTaskIds]);

  // 3. حفظ حالة الوضع الداكن في LocalStorage
  useEffect(() => {
    localStorage.setItem("taskflow_darkmode", JSON.stringify(state.isDarkMode));
  }, [state.isDarkMode]);

  const contextValue = {
    state,
    dispatch,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
