// App.js
import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import ClientMenu from './components/ClientMenu';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/client-menu" element={<ClientMenu />} />
      </Routes>
  );
}

export default App;


