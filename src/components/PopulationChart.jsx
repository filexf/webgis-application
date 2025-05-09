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
        text: "Population par Arrondissement",
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

  const chartData = {
    labels: data.map((item) => item.l_ar),
    datasets: [
      {
        label: "Population",
        data: data.map((item) => item.surface), // On utilisera la surface en attendant d'avoir les données de population
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-4">
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default PopulationChart;
