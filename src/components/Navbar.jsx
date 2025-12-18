// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function Navbar() {
  const { state, dispatch } = useContext(AppContext);
  const { isDarkMode } = state;

  const toggleDarkMode = () => {
    dispatch({ type: "TOGGLE_DARK_MODE" });
  };

  return (
    <nav
      // 💡 أنماط الوضع الداكن للشريط بالكامل
      className={`px-6 py-4 flex justify-between items-center flex-none ${
        isDarkMode ? 'bg-gray-800 text-white' : 'bg-purple-700 text-white'
      }`}
    >
      <div
        className={`flex items-center gap-2 font-bold text-xl ${
          isDarkMode ? 'text-purple-400' : 'text-purple-100'
        }`}
      >
        TaskFlow
      </div>

      <div className="flex items-center gap-4">
        {/* 💡 زر تبديل الوضع الداكن */}
        <button
          onClick={toggleDarkMode}
          className={`px-3 py-1 rounded text-sm transition-colors duration-200 ${
            isDarkMode
              ? 'bg-purple-600 hover:bg-purple-700 text-white'
              : 'bg-purple-500 hover:bg-purple-600 text-white'
          }`}
        >
          {isDarkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </button>

        <Link to="/add-project">
          <button
            // 💡 أنماط الوضع الداكن لزر Add Project
            className={`px-4 py-2 rounded text-sm transition-colors duration-200 ${
              isDarkMode
                ? 'bg-purple-500 hover:bg-purple-600 text-white'
                : 'bg-purple-800 hover:bg-purple-900 text-purple-100'
            }`}
          >
            Add Project
          </button>
        </Link>
      </div>
    </nav>
  );
}