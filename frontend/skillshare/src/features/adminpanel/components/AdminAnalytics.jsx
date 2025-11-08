import React, { useEffect, useState } from "react";
import API from "../../../services/api";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const AdminAnalytics = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [selectedSkillType, setSelectedSkillType] = useState("");
  const [userData, setUserData] = useState([]);
  const [skillData, setSkillData] = useState([]);
  const [workshopData, setWorkshopData] = useState([]);

  const navigate = useNavigate();

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#9C27B0",
    "#E91E63",
  ];
  const years = [2023, 2024, 2025];
  const skillTypes = ["Technical", "Soft Skills", "Design", "Management"];

  const handleBackClick = () => {
    navigate("/admin");
  };
  const fetchData = async () => {
    try {
      const [usersRes, skillsRes, workshopsRes] = await Promise.all([
        API.get(`/adminpanel/user-stats/?year=${year}`),
        API.get(
          `/adminpanel/skill-stats/${
            selectedSkillType ? `?type=${selectedSkillType}` : ""
          }`
        ),
        API.get(`/adminpanel/workshop-stats/?year=${year}`),
      ]);

      setUserData(usersRes.data.map(({ month, count }) => ({ month, count })));
      setSkillData(skillsRes.data.map(({ type, value }) => ({ type, value })));
      setWorkshopData(
        workshopsRes.data.map(({ month, workshops }) => ({
          month,
          count: workshops,
        }))
      );
    } catch (error) {
      console.error("Error fetching analytics:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [year, selectedSkillType]);

  return (
    <>
      <div className="p-4 sm:p-6">
        {/* Back Button */}
        <Button variant="outlined" onClick={handleBackClick}>
          🔙 Back to Admin Panel
        </Button>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-blue-800">
        📊 Admin Analytics Dashboard
      </h1>
      {/* filter */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
          mb: 5,
          p: 3,
          bgcolor: "rgba(59, 130, 246, 0.1)", // transparent blue
          borderRadius: 2,
          boxShadow: 3,
          flexWrap: "wrap",
        }}
      >
        {/* Year Filter */}
        <FormControl sx={{ minWidth: 160 }} size="medium">
          <InputLabel id="year-label">📅 Select Year</InputLabel>
          <Select
            labelId="year-label"
            value={year}
            label="Select Year"
            onChange={(e) => setYear(Number(e.target.value))}
          >
            {years.map((y) => (
              <MenuItem key={y} value={y}>
                {y}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Skill Type Filter */}
        <FormControl sx={{ minWidth: 200 }} size="medium">
          <InputLabel id="skill-type-label">🧠 Skill Type</InputLabel>
          <Select
            labelId="skill-type-label"
            value={selectedSkillType}
            label="Skill Type"
            onChange={(e) => setSelectedSkillType(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {skillTypes.map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Users Chart */}
        <div className="bg-white shadow-lg rounded-2xl p-4">
          <h2 className="text-lg font-semibold mb-3 text-gray-700">
            👥 Monthly Registered Users ({year})
          </h2>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={userData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#6366f1"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skills Chart */}
        <div className="bg-white shadow-lg rounded-2xl p-4">
          <h2 className="text-lg font-semibold mb-3 text-gray-700">
            🧠 Skill Type Distribution
          </h2>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={Array.isArray(skillData) ? skillData : []}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="type"
                  label
                >
                  {skillData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Workshops Chart */}
        <div className="bg-white shadow-lg rounded-2xl p-4 md:col-span-2">
          <h2 className="text-lg font-semibold mb-3 text-gray-700">
            🚀 Workshops Conducted ({year})
          </h2>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={workshopData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminAnalytics;
