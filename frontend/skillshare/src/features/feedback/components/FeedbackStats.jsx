import { Box, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function FeedbackStats({ feedbacks }) {
  const grouped = {};

  feedbacks.forEach((fb) => {
    const title = fb.workshop_title || "Untitled";
    if (!grouped[title]) grouped[title] = [];
    grouped[title].push(fb);
  });

  const data = Object.entries(grouped).map(([title, items]) => {
    const avgRating =
      items.reduce((sum, fb) => sum + fb.rating, 0) / items.length;
    const recommendRate =
      items.filter((fb) => fb.recommend === "yes").length / items.length;
    return {
      title,
      avgRating: Number(avgRating.toFixed(2)),
      recommendRate: Number((recommendRate * 100).toFixed(1)),
    };
  });

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Workshop Feedback Analytics
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
          barCategoryGap="20%"
        >
          <XAxis
            dataKey="title"
            angle={-45}
            textAnchor="end"
            interval={0}
            height={100}
            stroke="#f3f4f6" // Light text for dark background
            tick={{ fontSize: 12 }}
          />
          <YAxis stroke="#f3f4f6" tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937", // dark tooltip
              border: "none",
              color: "#f3f4f6",
            }}
            itemStyle={{ color: "#f3f4f6" }}
            labelStyle={{ color: "#f3f4f6" }}
          />
          <Bar
            dataKey="avgRating"
            fill="#6366f1"
            name="Avg Rating"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="recommendRate"
            fill="#10b981"
            name="% Recommended"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}
