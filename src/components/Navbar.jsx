export default function Navbar() {
  return (
    <>
       <nav className="text-white px-6 py-4 flex justify-between items-center flex-none" style={{backgroundColor:"#92487A"}}>
      <div className="flex items-center gap-2 font-bold text-xl" style={{color:"#6B1000"}}>
        TaskFlow
      </div>
      <button className=" hover:bg-red-800 px-4 py-2 rounded text-sm" style={{backgroundColor:"#6B1000"}}>
     Add Project
      </button>
    </nav>
    </>
  );
}
