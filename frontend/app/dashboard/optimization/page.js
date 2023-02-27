"use client";

import { useContext } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import AppContext from "../../AppContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

export default function Optimization() {
  const { state } = useContext(AppContext);
  const data = {
    datasets: [
      {
        label: "SSE",
        data: state.clustering?.sse,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return (
    <div className="mb-10 mt-5">
      <p className="text-lg font-semibold text-slate-800">Optimization</p>
      <div>
        <Line options={options} data={data} />
      </div>
    </div>
  );
}
