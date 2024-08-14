import React from "react";
import "./App.css";
import Waves from "./components/backgroundWaves"; // Import the Waves component
import Navbar from "./components/NavBar";

function App() {
  return (
    <div className="app-container">
      <Waves />
      <Navbar/>
      <div className="flex items-center justify-center h-screen p-8">
        <div className="flex items-center justify-between w-full max-w-6xl mt-[-10%]">
          <div className="flex-1 max-w-xl">
            <h1 className="text-5xl font-bold mb-6">Digital Menu</h1>
            <p className="text-xl mb-8">Take your restaurant to the next level</p>
            <button className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
              Get Started
            </button>
          </div>
          <div className="flex-2 flex justify-end">
            <img src="/olaclick-menu-digital.png" alt="Main" className="w-full max-w-3xl h-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
