import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import TasksPage from "./pages/TasksPage";
import { AppContext } from "./context/AppContext.jsx";
import AddProject from "./pages/AddProject";


function App() {
  const { state } = useContext(AppContext);

  if (state.loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }
  if (state.error) {
    return (
      <div className="p-8 text-center text-red-600">Error: {state.error}</div>
    );
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Routes>
          
          {/* Dashboard مع Navbar */}
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
          {/* TasksPage بدون Navbar */}
          <Route
            path="/tasks/:projectId"
            element={
              <div className="flex flex-col flex-1">
                <TasksPage />
              </div>
            }
          />
        </Routes>
        {/* Footer يظل ثابت أسفل الصفحة */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
