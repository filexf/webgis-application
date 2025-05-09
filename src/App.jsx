import React from "react";
import {useState} from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Enregistrer les composants de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const App = () => {
  const [showData, setShowData] = useState(true);

  // Exemple de données GeoJSON pour des données démographiques
  const demoData = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          name: "Region A",
          population: 500000,
        },
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [2.3522, 48.8566],
              [2.3622, 48.8566],
              [2.3622, 48.8666],
              [2.3522, 48.8666],
              [2.3522, 48.8566],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: {
          name: "Region B",
          population: 300000,
        },
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [2.3422, 48.8466],
              [2.3522, 48.8466],
              [2.3522, 48.8566],
              [2.3422, 48.8566],
              [2.3422, 48.8466],
            ],
          ],
        },
      },
    ],
  };

  // Style pour les régions démographiques
  const style = {
    fillColor: "#87CEEB", // Sky blue color
    weight: 2,
    opacity: 1,
    color: "white",
    dashArray: "3",
    fillOpacity: 0.7,
  };

  // Préparer les données pour Chart.js
  const chartData = {
    labels: demoData.features.map((feature) => feature.properties.name),
    datasets: [
      {
        label: "Population",
        data: demoData.features.map((feature) => feature.properties.population),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Population par Région",
      },
    },
  };

  return (
    <div className="h-screen flex flex-col">
      <header className="bg-sky-700 text-white p-4 text-center text-xl font-bold flex justify-between items-center">
        <h1 className="text-center">Visualization of demographic data</h1>
        <button
          onClick={() => setShowData(!showData)}
          className="bg-white text-sky-600 px-4 py-2 rounded hover:bg-blue-100 transition-colors"
        >
          {showData ? 'Full map' : 'Show datas'}
        </button>
      </header>
      <main className={`flex-grow ${showData ? 'grid grid-cols-1 md:grid-cols-2' : ''} gap-4`}>
        <div className={`h-full ${!showData ? 'w-full' : ''}`}>
          <MapContainer center={[48.8566, 2.3522]} zoom={12} className="h-full">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <GeoJSON data={demoData} style={style} onEachFeature={(feature, layer) => {
              layer.bindPopup(
                `<h3>${feature.properties.name}</h3>` +
                `<p>Population: ${feature.properties.population}</p>`
              );
            }} />
          </MapContainer>
        </div>
        {showData && (
          <div className="p-4">
            <Bar data={chartData} options={chartOptions} />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
