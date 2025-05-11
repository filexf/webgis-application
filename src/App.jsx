import "leaflet/dist/leaflet.css";
import React, { useRef, useState } from "react";
import { GeoJSON, MapContainer, TileLayer } from "react-leaflet";
import BaseMapSelector from "./components/BaseMapSelector";
import PopulationChart from "./components/PopulationChart";
import SearchBar from "./components/SearchBar";
import { demoData } from "./data/parisData.geojson";

const App = () => {
  const [showData, setShowData] = useState(true);
  const [activeArrondissement, setActiveArrondissement] = useState(null);
  const [baseMap, setBaseMap] = useState("osm");
  const geoJsonLayerRef = useRef(null);

  const baseMapLayers = {
    osm: {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
    satellite: {
      url: "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
      attribution: "&copy; Google",
    },
  };

  const handleBaseMapChange = (newBaseMap) => {
    setBaseMap(newBaseMap);
  };

  // Fonction pour déterminer la couleur en fonction de la population
  const getColorByPopulation = (population) => {
    return population > 200000
      ? "#FF6B6B" // rouge clair pour les plus grandes populations
      : population > 150000
      ? "#FF8585" // rouge plus clair
      : population > 100000
      ? "#FFA07A" // saumon clair
      : population > 75000
      ? "#FFB347" // orange clair
      : population > 50000
      ? "#FFC000" // orange plus clair
      : population > 25000
      ? "#FFE5B4" // pêche clair
      : "#FFF8DC"; // beige très clair pour les plus petites populations
  };

  // Style pour les arrondissements
  const style = (feature) => {
    return {
      fillColor:
        activeArrondissement === feature.properties.l_ar
          ? "#6AAE8F" // vert légèrement plus vif pour la sélection
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

  const handleArrondissementChange = (arrondissement) => {
    setActiveArrondissement(arrondissement);
    if (arrondissement && geoJsonLayerRef.current) {
      const layer = findLayerByArrondissement(arrondissement);
      if (layer) {
        layer.openPopup();
      }
    }
  };

  const findLayerByArrondissement = (arrondissement) => {
    let targetLayer = null;
    geoJsonLayerRef.current?.eachLayer((layer) => {
      if (layer.feature.properties.l_ar === arrondissement) {
        targetLayer = layer;
      }
    });
    return targetLayer;
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
            setActiveArrondissement={handleArrondissementChange}
          />
          <MapContainer center={[48.8566, 2.3522]} zoom={12} className="h-full">
            <TileLayer
              url={baseMapLayers[baseMap].url}
              attribution={baseMapLayers[baseMap].attribution}
            />
            <GeoJSON
              ref={geoJsonLayerRef}
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
                layer.on({
                  click: () => {
                    handleArrondissementChange(feature.properties.l_ar);
                  },
                });
              }}
            />
          </MapContainer>
          <BaseMapSelector onBaseMapChange={handleBaseMapChange} />
        </div>
        {showData && (
          <div className="p-4">
            <PopulationChart
              data={demoData}
              setActiveArrondissement={handleArrondissementChange}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
