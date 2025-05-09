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

const PopulationChart = ({ data, setActiveRegion }) => {
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
    onHover: (event, elements) => {
      if (elements && elements.length > 0) {
        const regionName = data.labels[elements[0].index];
        setActiveRegion(regionName);
      } else {
        setActiveRegion(null);
      }
    },
  };

  return (
    <div className="p-4">
      <Bar data={data} options={chartOptions} />
    </div>
  );
};

export default PopulationChart;
