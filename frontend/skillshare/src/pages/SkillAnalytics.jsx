import React, { useEffect } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { getAnalytics } from "../features/skills/actions/skillActions";
import { IconButton, Typography, Box, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// Chart.js registration
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { JoinFullSharp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  ArcElement,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function SkillAnalytics() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, loading, error } = useSelector((state) => state.skills);

  useEffect(() => {
    dispatch(getAnalytics()).then((res) => {
      console.log("Analytics response:", res);
    });
  }, [dispatch]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!data) return null;

  const skillTypeChart = {
    labels: data.skill_types.map((s) => s.category || "Conut"),
    datasets: [
      {
        label: "Skills by Type",
        data: data.skill_types.map((s) => s.count),
        backgroundColor: [
          "#17405bff",
          "#807c7eff",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  const feedbackChart = {
    labels: data.avg_ratings.map((s) => s.skill_title || "Count"),
    datasets: [
      {
        label: "Average Rating",
        data: data.avg_ratings.map((s) => s.avg_rating || 0),
        backgroundColor: "rgba(232, 120, 144, 0.77)",
      },
    ],
  };

  const workshopChart = {
    labels: data.workshop_analysis.map((w) => w.skill__title || "Count"),
    datasets: [
      {
        label: "Workshops per Skill",
        data: data.workshop_analysis.map((w) => w.count),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  return (
    <div className="p-6 grid gap-8">
      <h2 className="text-2xl font-bold text-center">
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
        Skill Analytics Dashboard
      </h2>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Skills by Categories</h3>
        <div style={{ maxWidth: 400, margin: "0 auto" }}>
          <Pie
            data={skillTypeChart}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "bottom",
                  labels: {
                    boxWidth: 12,
                    font: { size: 12 },
                  },
                },
              },
            }}
            height={300}
          />
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Average Feedback per Skill</h3>
        <div style={{ maxWidth: 600, height: 300, margin: "0 auto" }}>
          <Bar
            data={feedbackChart}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: {
                  ticks: { color: "#ffffff" },
                  grid: { color: "rgba(255,255,255,0.1)" },
                },
                y: {
                  ticks: { color: "#ffffff" },
                  grid: { color: "rgba(255,255,255,0.1)" },
                },
              },
              plugins: {
                legend: {
                  labels: { color: "#ffffff" },
                },
              },
            }}
          />
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Workshops per Skill</h3>
        <div style={{ maxWidth: 600, height: 300, margin: "0 auto" }}>
          <Line
            data={workshopChart}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: {
                  ticks: { color: "#ffffff" },
                  grid: { color: "rgba(255,255,255,0.1)" },
                },
                y: {
                  ticks: { color: "#ffffff" },
                  grid: { color: "rgba(255,255,255,0.1)" },
                },
              },
              plugins: {
                legend: {
                  labels: { color: "#ffffff" },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
