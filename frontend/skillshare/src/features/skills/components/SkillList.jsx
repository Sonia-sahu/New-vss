import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSkills } from "../actions/skillActions";
import SkillCard from "./SkillCard";
import { Box } from "@mui/material";

export default function SkillList() {
  const dispatch = useDispatch();
  const skills = useSelector((state) => state.skills.skills);

  useEffect(() => {
    dispatch(fetchSkills());
  }, [dispatch]);

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {skills.map((skill) => (
        <SkillCard key={skill.id} skill={skill} />
      ))}
    </Box>
  );
}
