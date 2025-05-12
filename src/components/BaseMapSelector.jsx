import React, { useState } from "react";
import "../styles/BaseMapSelector.css";

const BaseMapSelector = ({ onBaseMapChange }) => {
  const [currentMap, setCurrentMap] = useState("osm");

  const handleMapChange = (mapType) => {
    setCurrentMap(mapType);
    onBaseMapChange(mapType);
  };

  return (
    <div className="basemap-selector">
      <div className="basemap-options">
        <button
          className={`basemap-button ${currentMap === "osm" ? "active" : ""}`}
          onClick={() => handleMapChange("osm")}
          title="OpenStreetMap"
        >
          <div className="basemap-icon osm-icon"></div>
          <span>OSM</span>
        </button>
        <button
          className={`basemap-button ${
            currentMap === "satellite" ? "active" : ""
          }`}
          onClick={() => handleMapChange("satellite")}
          title="Satellite"
        >
          <div className="basemap-icon satellite-icon"></div>
          <span>Satellite</span>
        </button>
      </div>
    </div>
  );
};

export default BaseMapSelector;
