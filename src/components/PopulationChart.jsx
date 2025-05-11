import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import React from "react";
import { Bar } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PopulationChart = ({ data, setActiveArrondissement }) => {
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Surface par Arrondissement",
      },
    },
    onHover: (event, elements) => {
      if (elements && elements.length > 0) {
        const arrondissement = data.labels[elements[0].index];
        setActiveArrondissement(arrondissement);
      } else {
        setActiveArrondissement(null);
      }
    },
  };

  // Trier les données par numéro d'arrondissement
  const sortedData = [...data].sort((a, b) => a.c_ar - b.c_ar);

  const chartData = {
    labels: sortedData.map((item) => item.l_ar),
    datasets: [
      {
        label: "Surface (m²)",
        data: sortedData.map((item) => item.surface),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <div className="p-4">
        <Bar data={chartData} options={chartOptions} />
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Légende des surfaces</h3>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center">
            <div
              className="w-6 h-6 mr-2"
              style={{ backgroundColor: "#08306b" }}
            ></div>
            <span>{"> 10 000 000 m²"}</span>
          </div>
          <div className="flex items-center">
            <div
              className="w-6 h-6 mr-2"
              style={{ backgroundColor: "#08519c" }}
            ></div>
            <span>{"8 000 000 - 10 000 000 m²"}</span>
          </div>
          <div className="flex items-center">
            <div
              className="w-6 h-6 mr-2"
              style={{ backgroundColor: "#2171b5" }}
            ></div>
            <span>{"6 000 000 - 8 000 000 m²"}</span>
          </div>
          <div className="flex items-center">
            <div
              className="w-6 h-6 mr-2"
              style={{ backgroundColor: "#4292c6" }}
            ></div>
            <span>{"4 000 000 - 6 000 000 m²"}</span>
          </div>
          <div className="flex items-center">
            <div
              className="w-6 h-6 mr-2"
              style={{ backgroundColor: "#6baed6" }}
            ></div>
            <span>{"2 000 000 - 4 000 000 m²"}</span>
          </div>
          <div className="flex items-center">
            <div
              className="w-6 h-6 mr-2"
              style={{ backgroundColor: "#9ecae1" }}
            ></div>
            <span>{"1 000 000 - 2 000 000 m²"}</span>
          </div>
          <div className="flex items-center">
            <div
              className="w-6 h-6 mr-2"
              style={{ backgroundColor: "#c6dbef" }}
            ></div>
            <span>{"< 1 000 000 m²"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopulationChart;
