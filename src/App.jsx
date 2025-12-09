import { useContext } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import { AppContext } from "./context/AppContext.jsx";

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
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Dashboard />
      <Footer />
    </div>
  );
}

export default App;
