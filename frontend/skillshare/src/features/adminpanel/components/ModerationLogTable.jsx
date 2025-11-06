import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { moderateSkill } from "../actions/adminActions";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  Button,
  Stack,
  TextField,
  Chip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { fetchAllSkills } from "../../skills/actions/skillActions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ModerationTable() {
  const dispatch = useDispatch();
  const skills = useSelector((state) => state.skills.skills) || [];
  const [reasons, setReasons] = useState({});
  const [localStatus, setLocalStatus] = useState({});
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    dispatch(fetchAllSkills({ status: statusFilter }))
      .unwrap()
      .catch((err) => toast.error(`Failed to fetch skills: ${err}`));
  }, [dispatch, statusFilter]);

  const handleModeration = async (id, action) => {
    const reason = reasons[id]?.trim();
    if (!reason) {
      toast.error("Please enter a reason before submitting.");
      return;
    }

    try {
      await dispatch(moderateSkill({ id, data: { action, reason } })).unwrap();
      setLocalStatus((prev) => ({ ...prev, [id]: action }));
      toast.success(`Skill ${action} successfully`);
    } catch (err) {
      toast.error(`Failed to ${action} skill: ${err}`);
    }
  };

  const handleReasonChange = (id, value) => {
    setReasons((prev) => ({ ...prev, [id]: value }));
  };

  const getStatus = (skill) => localStatus[skill.id] || skill.status;

  return (
    <Paper sx={{ mt: 4, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Moderation Panel
      </Typography>

      <FormControl sx={{ mb: 2, minWidth: 200 }}>
        <InputLabel id="status-filter-label">Status Filter</InputLabel>
        <Select
          labelId="status-filter-label"
          value={statusFilter}
          label="Status Filter"
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="in review">In Review</MenuItem>
          <MenuItem value="approve">Approved</MenuItem>
          <MenuItem value="rejected">Rejected</MenuItem>
          <MenuItem value="on_hold">On Hold</MenuItem>
        </Select>
      </FormControl>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Certification</TableCell>
            <TableCell>User ID</TableCell>

            <TableCell>Reason</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {skills.map((skill) => {
            const status = getStatus(skill);
            const isFinalized = ["approved", "rejected"].includes(status);

            return (
              <TableRow key={skill.id}>
                <TableCell>{skill.title}</TableCell>
                <TableCell>{skill.description}</TableCell>

                <TableCell>
                  {skill.certification_url ? (
                    <a
                      href={skill.certification_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View PDF
                    </a>
                  ) : (
                    "No certification uploaded"
                  )}
                </TableCell>

                <TableCell>{skill.user}</TableCell>

                <TableCell>
                  <TextField
                    value={reasons[skill.id] || ""}
                    onChange={(e) =>
                      handleReasonChange(skill.id, e.target.value)
                    }
                    placeholder="Enter reason"
                    size="small"
                    fullWidth
                    disabled={isFinalized ? true : false}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={status}
                    color={
                      status === "approved"
                        ? "success"
                        : status === "rejected"
                        ? "error"
                        : status === "on_hold"
                        ? "warning"
                        : "default"
                    }
                  />
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleModeration(skill.id, "approve")}
                      disabled={isFinalized}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleModeration(skill.id, "rejected")}
                      disabled={isFinalized}
                    >
                      Reject
                    </Button>
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={() => handleModeration(skill.id, "on_hold")}
                      disabled={isFinalized}
                    >
                      On Hold
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <ToastContainer position="top-right" autoClose={3000} />
    </Paper>
  );
}
