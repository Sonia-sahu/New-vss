import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchSkills, deleteSkill, updateSkill } from "../actions/skillActions";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
} from "@mui/material";

export default function SkillList({ userId: propUserId }) {
  const dispatch = useDispatch();
  const skills = useSelector((state) => state.skills.skills);
  const userId = propUserId || useSelector((state) => state.community.user?.id);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedSkillId, setSelectedSkillId] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editSkill, setEditSkill] = useState({
    title: "",
    description: "",
    category: "",
  });

  useEffect(() => {
    if (userId) {
      dispatch(fetchSkills(userId));
    }
  }, [dispatch, userId]);

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

  const handleEditClick = (skill) => {
    setSelectedSkillId(skill.id);
    setEditSkill({
      title: skill.title,
      description: skill.description,
      category: skill.category,
    });
    setOpenEditDialog(true);
  };

  const handleEditSubmit = () => {
    if (selectedSkillId) {
      console.log("Updating skill with ID:", selectedSkillId);
      dispatch(updateSkill({ id: selectedSkillId, data: editSkill }));
      setOpenEditDialog(false);
    } else {
      console.error("Skill ID is missing");
    }
  };

  if (!Array.isArray(skills) || skills.length === 0) {
    return <div>No skills to display</div>;
  }

  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#2c3e50", fontWeight: "bold" }}>
                Title
              </TableCell>
              <TableCell sx={{ color: "#2c3e50", fontWeight: "bold" }}>
                Description
              </TableCell>
              <TableCell sx={{ color: "#2c3e50", fontWeight: "bold" }}>
                Category
              </TableCell>
              <TableCell sx={{ color: "#2c3e50", fontWeight: "bold" }}>
                Certification
              </TableCell>
              <TableCell sx={{ color: "#2c3e50", fontWeight: "bold" }}>
                Status
              </TableCell>
              <TableCell sx={{ color: "#2c3e50", fontWeight: "bold" }}>
                Reason
              </TableCell>
              <TableCell
                sx={{ color: "#2c3e50", fontWeight: "bold" }}
                align="center"
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {skills.map((skill, index) => (
              <TableRow
                key={skill.id}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#d6d3d3ff" : "#d6d3d3ff",
                  "&:hover": { backgroundColor: "#b3b1b1ff" },
                }}
              >
                <TableCell sx={{ color: "#2c3e50" }}>{skill.title}</TableCell>
                <TableCell sx={{ color: "#2c3e50" }}>
                  {skill.description}
                </TableCell>
                <TableCell sx={{ color: "#2c3e50" }}>
                  {skill.category}
                </TableCell>
                <TableCell sx={{ color: "#2c3e50" }}>
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
                <TableCell sx={{ color: "#2c3e50" }}>{skill.status}</TableCell>
                <TableCell sx={{ color: "#2c3e50" }}>
                  {skill.moderation_reason || "-"}
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => handleEditClick(skill)}
                  >
                    <EditIcon fontSize="small" sx={{ color: "#2b283bff" }} />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDeleteClick(skill.id)}
                  >
                    <DeleteIcon fontSize="small" sx={{ color: "#2b283bff" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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

      {/* Edit Skill Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Skill</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            value={editSkill.title}
            onChange={(e) =>
              setEditSkill({ ...editSkill, title: e.target.value })
            }
            margin="normal"
          />
          <TextField
            label="Description"
            fullWidth
            value={editSkill.description}
            onChange={(e) =>
              setEditSkill({ ...editSkill, description: e.target.value })
            }
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              value={editSkill.category}
              onChange={(e) =>
                setEditSkill({ ...editSkill, category: e.target.value })
              }
            >
              <MenuItem value="tech">Tech</MenuItem>
              <MenuItem value="art">Art</MenuItem>
              <MenuItem value="cooking">Cooking</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
