// src/App.jsx
import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import TasksPage from "./pages/TasksPage";
import { AppContext } from "./context/AppContext.jsx";
import AddProject from "./pages/AddProject";
import AddTask from "./pages/AddTask";

function App() {
  const { state } = useContext(AppContext);

  if (state.loading) {
    // أنماط الوضع الداكن لصفحة التحميل
    return <div className={`p-8 text-center ${state.isDarkMode ? 'bg-gray-900 text-white' : 'bg-purple-50'}`}>Loading...</div>;
  }
  if (state.error) {
    // أنماط الوضع الداكن لصفحة الخطأ
    return (
      <div className={`p-8 text-center text-red-600 ${state.isDarkMode ? 'bg-gray-900' : 'bg-purple-50'}`}>
        Error: {state.error}
      </div>
    );
  }

  // 💡 التعديل: إضافة الكلاس dark بناءً على حالة isDarkMode
  return (
    <Router>
      <div className={`flex flex-col min-h-screen ${state.isDarkMode ? 'dark' : ''}`}> 
        <Routes>
          {/* ... بقية الـ Routes ... */}
          <Route
            path="/"
            element={
              <div className="flex flex-col flex-1">
                <Navbar />
                <Dashboard />
              </div>
            }
          />
          <Route
            path="/add-project"
            element={
              <div className="flex flex-col flex-1">
                <Navbar />
                <AddProject />
              </div>
            }
          />
          <Route
            path="/add-task"
            element={
              <div className="flex flex-col flex-1">
                <Navbar />
                <AddTask />
              </div>
            }
          />

          <Route
            path="/tasks/:projectId"
            element={
              <div className="flex flex-col flex-1">
                <TasksPage />
              </div>
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;