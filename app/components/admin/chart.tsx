"use client";
import React from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Chart(analytics) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "New users by Google Analytics",
      },
    },
  };

  console.log("Analytics: ", analytics);

  const data = {
    labels: analytics.analytics.rows.forEach((row) => {
      row.dimensionValues[0].value;
    }),
    datasets: [
      {
        label: "Dataset 1",
        data: analytics
          ? analytics.analytics.rows.forEach((row) => row.metricValues[0].value)
          : 0,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
}
