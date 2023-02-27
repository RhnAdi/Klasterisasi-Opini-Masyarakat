import React from "react";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

export const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function KMeans(props) {
  return (
    <Scatter
      options={options}
      data={{
        datasets: [
          {
            label: "data test",
            data: [
              { x: 3, y: 4 },
              { x: 5, y: 7 },
              { x: 6, y: 6 },
              { x: 8, y: 3 },
              { x: 9, y: 2 },
            ],
            backgroundColor: "red",
          },
        ],
      }}
    />
  );
}
