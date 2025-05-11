import React from "react";
import "../styles/BaseMapSelector.css";

const BaseMapSelector = ({ onBaseMapChange }) => {
  return (
    <div className="basemap-selector">
      <select
        onChange={(e) => onBaseMapChange(e.target.value)}
        defaultValue="osm"
      >
        <option value="osm">OpenStreetMap</option>
        <option value="satellite">Satellite</option>
      </select>
    </div>
  );
};

export default BaseMapSelector;
