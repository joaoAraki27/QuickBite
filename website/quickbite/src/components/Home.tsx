// components/Home.js
import React, { useState } from "react";
import Waves from "./backgroundWaves";
import Navbar from "./NavBar";
import Modal from "./Modal";
import Login from "./Login";
import { Link, Route, Routes } from "react-router-dom";

function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Waves />
      <Navbar />
      <div className="flex items-center justify-center h-screen p-8">
        <div className="flex items-center justify-between w-full max-w-6xl mt-[-10%]">
          <div className="flex-1 max-w-xl">
            <h1 className="text-5xl font-bold mb-6">Digital Menu</h1>
            <p className="text-xl mb-8">Take your restaurant to the next level</p>
            <button 
              onClick={openModal}
              className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
              Get Started
            </button>
          </div>
          <div className="flex-2 flex justify-end">
            <img src="/olaclick-menu-digital.png" alt="Main" className="w-full max-w-3xl h-auto" />
          </div>
        </div>
        {/* Link to test navigation */}
        <Link to="/dashboard">Go to Dashboard</Link>
      </div>

      {/* Modal handling */}
      {modalOpen && (
        <Modal closeModal={closeModal}>
          <Routes>
            <Route path="/" element={<Login onClose={closeModal} onSwitchToRegister={() => { /* handle switch to register */ }} />} />
          </Routes>
        </Modal>
      )}
    </>
  );
}

export default Home;
