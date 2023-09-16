/** @format */

import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";

export default function App() {
  return (
    <div className="flex min-h-screen w-screen flex-col bg-richblack-900 font-inter">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}
