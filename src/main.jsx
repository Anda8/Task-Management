import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AppProvider } from "./context/AppContext.jsx";
import "./index.css"; 

const BASE_URL = "https://6936c794f8dc350aff32313c.mockapi.io";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProvider baseUrl={BASE_URL}>
      <App />
    </AppProvider>
  </StrictMode>
);
