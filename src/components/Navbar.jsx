import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useLocation } from "react-router-dom"; // <-- مهم

export default function Navbar() {
  const { state, dispatch } = useContext(AppContext);
  const { isDarkMode } = state;
  const location = useLocation(); // <-- هنا نجيب الـ pathname الحالي

  const toggleDarkMode = () => {
    dispatch({ type: "TOGGLE_DARK_MODE" });
  };

  return (
    <nav
      className={`px-6 py-4 flex justify-between items-center flex-none ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-purple-700 text-white"
      }`}
    >
      <div
        className={`flex items-center gap-2 font-bold text-xl ${
          isDarkMode ? "text-purple-400" : "text-purple-100"
        }`}
      >
        TaskFlow
      </div>

      <div className="flex items-center gap-4">
        {/* زر Dark Mode */}
        <button
          onClick={toggleDarkMode}
          className={`px-3 py-1 rounded text-sm transition-colors duration-200 ${
            isDarkMode
              ? "bg-purple-600 hover:bg-purple-700 text-white"
              : "bg-purple-500 hover:bg-purple-600 text-white"
          }`}
        >
          {isDarkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>

        {/* زر Add Project يظهر فقط في Dashboard */}
        {location.pathname === "/" && (
          <Link to="/add-project">
            <button
              className={`px-4 py-2 rounded text-sm transition-colors duration-200 ${
                isDarkMode
                  ? "bg-purple-500 hover:bg-purple-600 text-white"
                  : "bg-purple-800 hover:bg-purple-900 text-purple-100"
              }`}
            >
              Add Project
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}
