import "leaflet/dist/leaflet.css";
import React, { useState } from "react";
import { GeoJSON, MapContainer, TileLayer } from "react-leaflet";
import PopulationChart from "./components/PopulationChart";
import SearchBar from "./components/SearchBar";
import { demoData } from "./data/parisData.js";

const App = () => {
  const [showData, setShowData] = useState(true);
  const [activeArrondissement, setActiveArrondissement] = useState(null);

  // Fonction pour déterminer la couleur en fonction de la population
  const getColorByPopulation = (population) => {
    return population > 200000
      ? "#08306b" // bleu très foncé pour les plus grandes populations
      : population > 150000
      ? "#08519c" // bleu foncé
      : population > 100000
      ? "#2171b5" // bleu moyen-foncé
      : population > 75000
      ? "#4292c6" // bleu moyen
      : population > 50000
      ? "#6baed6" // bleu clair
      : population > 25000
      ? "#9ecae1" // bleu très clair
      : "#c6dbef"; // bleu le plus clair pour les plus petites populations
  };

  // Style pour les arrondissements
  const style = (feature) => {
    return {
      fillColor:
        activeArrondissement === feature.properties.l_ar
          ? "#ff7800"
          : getColorByPopulation(feature.properties.population),
      weight: 2,
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: activeArrondissement === feature.properties.l_ar ? 0.9 : 0.7,
    };
  };

  // Convertir les données en format GeoJSON
  const geojsonData = {
    type: "FeatureCollection",
    features: demoData.map((item) => ({
      type: "Feature",
      properties: {
        l_ar: item.l_ar,
        l_aroff: item.l_aroff,
        c_ar: item.c_ar,
        surface: item.surface,
        population: item.population,
      },
      geometry: item.geom.geometry,
    })),
  };

  return (
    <div className="h-screen flex flex-col">
      <header className="bg-sky-700 text-white p-4 text-center text-xl font-bold flex justify-between items-center">
        <h1 className="text-center">Paris - Données des Arrondissements</h1>
        <button
          onClick={() => setShowData(!showData)}
          className="bg-white text-sky-600 px-4 py-2 rounded hover:bg-blue-100 transition-colors"
        >
          {showData ? "Carte complète" : "Afficher données"}
        </button>
      </header>
      <main
        className={`flex-grow ${
          showData ? "grid grid-cols-1 md:grid-cols-2" : ""
        } gap-4`}
      >
        <div className={`h-full ${!showData ? "w-full" : ""} relative`}>
          <SearchBar
            data={geojsonData.features}
            setActiveArrondissement={setActiveArrondissement}
          />
          <MapContainer center={[48.8566, 2.3522]} zoom={12} className="h-full">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <GeoJSON
              data={geojsonData}
              style={style}
              onEachFeature={(feature, layer) => {
                layer.bindPopup(
                  `<h3 class="text-xl font-bold text-center">${
                    feature.properties.l_ar
                  }</h3>
                   <p>Nom officiel: ${feature.properties.l_aroff}</p>
                   <p>Population: ${feature.properties.population.toLocaleString()} habitants</p>
                   `
                );
              }}
            />
          </MapContainer>
        </div>
        {showData && (
          <div className="p-4">
            <PopulationChart
              data={demoData}
              setActiveArrondissement={setActiveArrondissement}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
