import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      className="text-white px-6 py-4 flex justify-between items-center flex-none"
      style={{ backgroundColor: "#7E3AF2" }}
    >
      <div
        className="flex items-center gap-2 font-bold text-xl"
        style={{ color: "#F5F3FF" }}
      >
        TaskFlow
      </div>

      <Link to="/add-project">
        <button
          className="hover:bg-purple-800 px-4 py-2 rounded text-sm"
          style={{ backgroundColor: "#6D28D9", color: "#F5F3FF" }}
        >
          Add Project
        </button>
      </Link>
    </nav>
  );
}

