// src/context/AppContext.jsx
import React, { createContext, useReducer, useEffect } from "react";
import { getProjects, getTasks } from "../api";

const initialState = {
  projects: [],
  tasks: [],
  loading: true,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "SET_DATA":
      return {
        ...state,
        projects: action.payload.projects,
        tasks: action.payload.tasks,
        loading: false,
        error: null,
      };
    case "ADD_PROJECT":
      return { ...state, projects: [...state.projects, action.payload] };
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };
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
      };
    default:
      return state;
  }
}

export const AppContext = createContext({
  state: initialState,
  dispatch: () => {},
});


export function AppProvider({ children, baseUrl }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let active = true;
    (async () => {
      dispatch({ type: "SET_LOADING", payload: true });
      try {
        const [projects, tasks] = await Promise.all([
          getProjects(baseUrl),
          getTasks(baseUrl),
        ]);
        if (!active) return;
        dispatch({ type: "SET_DATA", payload: { projects, tasks } });
      } catch (err) {
        if (!active) return;
        dispatch({ type: "SET_ERROR", payload: err.message });
      }
    })();
    return () => {
      active = false;
    };
  }, [baseUrl]);

  // (Optional) persist to localStorage:
  useEffect(() => {
    if (!state.loading && !state.error) {
      localStorage.setItem(
        "taskapp_state_v1",
        JSON.stringify({ projects: state.projects, tasks: state.tasks })
      );
    }
  }, [state.projects, state.tasks, state.loading, state.error]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}
