import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSkill,
  fetchModerationLogs,
  moderateSkill,
} from "../actions/adminActions";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  IconButton,
  Stack,
  TextField,
  Chip,
  MenuItem,
  Select,
  FormControl,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  InputLabel,
  DialogTitle,
} from "@mui/material";
import { fetchAllSkills } from "../../skills/actions/skillActions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DeleteIcon from "@mui/icons-material/Delete";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";

export default function ModerationTable() {
  const dispatch = useDispatch();
  const skills = useSelector((state) => state.skills.skills) || [];
  const moderationLogs = useSelector((state) => state.admin.logs) || [];

  const [reasons, setReasons] = useState({});
  const [statusFilter, setStatusFilter] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedSkillId, setSelectedSkillId] = useState(null);
  useEffect(() => {
    dispatch(fetchAllSkills({ status: statusFilter }))
      .unwrap()
      .catch((err) => toast.error(`Failed to fetch skills: ${err}`));

    dispatch(fetchModerationLogs())
      .unwrap()
      .catch((err) => toast.error(`Failed to fetch moderation logs: ${err}`));
  }, [dispatch, statusFilter]);

  const handleModeration = async (id, action) => {
    const reason = reasons[id]?.trim();
    if (!reason) {
      toast.error("Please enter a reason before submitting.");
      return;
    }

    try {
      await dispatch(moderateSkill({ id, data: { action, reason } })).unwrap();
      toast.success(`Skill ${action} successfully`);
      dispatch(fetchAllSkills({ status: statusFilter }));
      dispatch(fetchModerationLogs());
    } catch (err) {
      toast.error(`Failed to ${action} skill: ${err}`);
    }
  };

  const handleReasonChange = (id, value) => {
    setReasons((prev) => ({ ...prev, [id]: value }));
  };
  const handleDeleteClick = (skillId) => {
    setSelectedSkillId(skillId);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteSkill(selectedSkillId));
    setOpenDeleteDialog(false);
  };

  const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
  };
  const cellStyle = { color: "#2c3e50" };

  return (
    <Paper sx={{ mt: 4, p: 2, bgcolor: "#c7c6c6ff", color: "#2c3e50" }}>
      <FormControl sx={{ mb: 2, minWidth: 200 }}>
        <InputLabel id="status-filter-label" sx={{ color: "#2c3e50" }}>
          Status Filter
        </InputLabel>
        <Select
          labelId="status-filter-label"
          value={statusFilter}
          label="Status Filter"
          onChange={(e) => setStatusFilter(e.target.value)}
          sx={{ color: "#2c3e50" }}
        >
          <MenuItem value="" sx={cellStyle}>
            All
          </MenuItem>
          <MenuItem value="in review" sx={cellStyle}>
            In Review
          </MenuItem>
          <MenuItem value="approved" sx={cellStyle}>
            Approved
          </MenuItem>
          <MenuItem value="rejected" sx={cellStyle}>
            Rejected
          </MenuItem>
          <MenuItem value="on_hold" sx={cellStyle}>
            On Hold
          </MenuItem>
        </Select>
      </FormControl>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={cellStyle}>Title</TableCell>
            <TableCell sx={cellStyle}>Description</TableCell>
            <TableCell sx={cellStyle}>Certification</TableCell>
            <TableCell sx={cellStyle}>User ID</TableCell>
            <TableCell sx={cellStyle}>Reason</TableCell>
            <TableCell sx={cellStyle}>Status</TableCell>
            <TableCell sx={cellStyle}>Actions</TableCell>
            <TableCell sx={cellStyle}></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {skills.map((skill) => {
            const rawStatus = skill.status?.toLowerCase();
            const status =
              rawStatus === "approve" ? "approved" : rawStatus || "unknown";
            const isFinalized = ["approved", "rejected"].includes(status);
            const isOnHold = status === "on_hold";

            const log = moderationLogs
              .filter((entry) => entry.skill_id === skill.id)
              .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];

            const reasonValue = isFinalized
              ? log?.reason || ""
              : reasons[skill.id] !== undefined
              ? reasons[skill.id]
              : log?.reason || "";

            return (
              <TableRow key={skill.id}>
                <TableCell sx={cellStyle}>{skill.title}</TableCell>
                <TableCell sx={cellStyle}>{skill.description}</TableCell>
                <TableCell sx={cellStyle}>
                  {skill.certification_url ? (
                    <a
                      href={skill.certification_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#2c3e50", textDecoration: "underline" }}
                    >
                      View PDF
                    </a>
                  ) : (
                    "No certification uploaded"
                  )}
                </TableCell>
                <TableCell sx={cellStyle}>{skill.user}</TableCell>
                <TableCell>
                  <TextField
                    value={reasonValue}
                    onChange={(e) =>
                      handleReasonChange(skill.id, e.target.value)
                    }
                    placeholder="Enter reason"
                    size="small"
                    fullWidth
                    InputProps={{
                      readOnly: isFinalized,
                    }}
                    sx={{
                      "& .MuiInputBase-input": {
                        color: "#123043ff",
                      },
                      input: { color: "#2c3e50" },
                    }}
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
                    <IconButton
                      color="success"
                      onClick={() => handleModeration(skill.id, "approve")}
                      disabled={isFinalized}
                      title="Approve"
                    >
                      <CheckCircleIcon sx={{ color: "#57b696ff" }} />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleModeration(skill.id, "rejected")}
                      disabled={isFinalized}
                      title="Reject"
                    >
                      <CancelIcon sx={{ color: "#c92623ff" }} />
                    </IconButton>
                    <IconButton
                      color="warning"
                      onClick={() => handleModeration(skill.id, "on_hold")}
                      disabled={isFinalized}
                      title="On Hold"
                    >
                      <PauseCircleIcon sx={{ color: "#2d5653ff" }} />
                    </IconButton>

                    <IconButton
                      onClick={() => handleDeleteClick(skill.id)}
                      aria-label="delete"
                    >
                      <DeleteIcon sx={{ color: "#2b283bff" }} />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this skill?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer position="top-right" autoClose={3000} />
    </Paper>
  );
}
