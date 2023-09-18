/** @format */

import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Test from "./Test.jsx";
import Navbar from "./components/Common/Navbar.jsx";

export default function App() {
  return (
    <div className="flex min-h-screen w-screen flex-col bg-richblack-900 font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Testing" element={<Test />} />
      </Routes>
    </div>
  );
}
