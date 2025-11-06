import React, { useEffect } from "react";
import { Container, Typography, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSkills } from "../features/skills/actions/skillActions";
import AdminDashboard from "../features/adminpanel/components/AdminDashboard";
import UserManagementTable from "../features/adminpanel/components/UserManagementTable";
import ModerationLogTable from "../features/adminpanel/components/ModerationLogTable";
import SkillModerationCard from "../features/adminpanel/components/SkillModerationCard";

export default function AdminPanelPage() {
  const dispatch = useDispatch();
  const skills = useSelector((state) => state.admin.skills);

  useEffect(() => {
    dispatch(fetchAllSkills());
  }, [dispatch]);

  return (
    <Container sx={{ mt: 4 }}>
      <AdminDashboard />
      <Divider sx={{ my: 4 }} />

      <UserManagementTable />
      <ModerationLogTable />
    </Container>
  );
}
