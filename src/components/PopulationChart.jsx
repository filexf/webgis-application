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
  // Trier les données par numéro d'arrondissement
  const sortedData = [...data].sort((a, b) => a.c_ar - b.c_ar);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Population par Arrondissement",
      },
      tooltip: {
        callbacks: {
          title: (items) => {
            const index = items[0].dataIndex;
            return `${sortedData[index].l_ar} - ${sortedData[index].l_aroff}`;
          },
          label: (item) => {
            return `Population: ${item.raw.toLocaleString()} habitants`;
          },
        },
      },
    },
    onClick: (event, elements) => {
      if (elements && elements.length > 0) {
        const index = elements[0].index;
        setActiveArrondissement(sortedData[index].l_ar);
      }
    },
    onHover: (event, elements) => {
      event.native.target.style.cursor = elements?.length
        ? "pointer"
        : "default";
    },
  };

  const chartData = {
    labels: sortedData.map((item) => item.l_ar),
    datasets: [
      {
        label: "Population",
        data: sortedData.map((item) => item.population),
        backgroundColor: sortedData.map((item) =>
          item.population > 200000
            ? "#FF6B6B"
            : item.population > 150000
            ? "#FF8585"
            : item.population > 100000
            ? "#FFA07A"
            : item.population > 75000
            ? "#FFB347"
            : item.population > 50000
            ? "#FFC000"
            : item.population > 25000
            ? "#FFE5B4"
            : "#FFF8DC"
        ),
        borderColor: "white",
        borderWidth: 1,
        hoverBackgroundColor: "#6AAE8F",
      },
    ],
  };

  return (
    <div>
      <div className="p-4">
        <Bar data={chartData} options={chartOptions} />
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Légende des populations</h3>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center">
            <div
              className="w-6 h-6 mr-2"
              style={{ backgroundColor: "#FF6B6B" }}
            ></div>
            <span>{"> 200 000 habitants"}</span>
          </div>
          <div className="flex items-center">
            <div
              className="w-6 h-6 mr-2"
              style={{ backgroundColor: "#FF8585" }}
            ></div>
            <span>{"150 000 - 200 000 habitants"}</span>
          </div>
          <div className="flex items-center">
            <div
              className="w-6 h-6 mr-2"
              style={{ backgroundColor: "#FFA07A" }}
            ></div>
            <span>{"100 000 - 150 000 habitants"}</span>
          </div>
          <div className="flex items-center">
            <div
              className="w-6 h-6 mr-2"
              style={{ backgroundColor: "#FFB347" }}
            ></div>
            <span>{"75 000 - 100 000 habitants"}</span>
          </div>
          <div className="flex items-center">
            <div
              className="w-6 h-6 mr-2"
              style={{ backgroundColor: "#FFC000" }}
            ></div>
            <span>{"50 000 - 75 000 habitants"}</span>
          </div>
          <div className="flex items-center">
            <div
              className="w-6 h-6 mr-2"
              style={{ backgroundColor: "#FFE5B4" }}
            ></div>
            <span>{"25 000 - 50 000 habitants"}</span>
          </div>
          <div className="flex items-center">
            <div
              className="w-6 h-6 mr-2"
              style={{ backgroundColor: "#FFF8DC" }}
            ></div>
            <span>{"< 25 000 habitants"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopulationChart;
