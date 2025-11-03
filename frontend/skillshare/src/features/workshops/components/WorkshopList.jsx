import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWorkshops } from "../actions/workshopActions";
import WorkshopCard from "./WorkshopCard";
import { Box } from "@mui/material";

export default function WorkshopList() {
  const dispatch = useDispatch();
  const workshops = useSelector((state) => state.workshops.workshops);

  useEffect(() => {
    dispatch(fetchWorkshops());
  }, [dispatch]);

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {workshops.map((workshop) => (
        <WorkshopCard key={workshop.id} workshop={workshop} />
      ))}
    </Box>
  );
}
