import React from "react";

const Header = ({ showData, setShowData }) => (
  <header className="bg-sky-700 text-white p-4 text-center text-xl font-bold flex justify-between items-center">
    <h1 className="text-center">Visualization of demographic data</h1>
    <button
      onClick={() => setShowData(!showData)}
      className="bg-white text-sky-600 px-4 py-2 rounded hover:bg-blue-100 transition-colors"
    >
      {showData ? "Full map" : "Show datas"}
    </button>
  </header>
);

export default Header;
