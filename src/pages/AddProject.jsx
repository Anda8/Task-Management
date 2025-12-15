import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const AddProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProject = {
      id: Date.now(),
      title,
      description,
    };

    dispatch({ type: "ADD_PROJECT", payload: newProject });
    navigate("/"); // go back to Dashboard
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Add Project</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Project Title"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Project Description"
          className="w-full border p-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <button className="bg-purple-600 text-white px-4 py-2 rounded">
          Add Project
        </button>
      </form>
    </div>
  );
};

export default AddProject;
