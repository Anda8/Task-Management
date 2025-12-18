// src/components/Footer.jsx
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function Footer(){
    const { state } = useContext(AppContext);

    return(
    <footer 
        className={`text-center py-2 text-sm flex-none ${state.isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-400'}`}
    >
    
      </footer>
    )
}