import { Chip } from "@mui/material";

export default function WorkshopStatusBadge({ status }) {
  const colorMap = {
    upcoming: "primary",
    completed: "success",
    cancelled: "error",
  };

  return (
    <Chip label={status} color={colorMap[status] || "default"} size="small" />
  );
}
