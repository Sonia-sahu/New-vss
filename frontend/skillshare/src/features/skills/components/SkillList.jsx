import React, { useState } from "react";
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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { deleteSkill, updateSkill } from "../actions/skillActions";

export default function SkillList({ skills, isOwner }) {
  const dispatch = useDispatch();

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedSkillId, setSelectedSkillId] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editSkill, setEditSkill] = useState({
    title: "",
    description: "",
    category: "",
  });

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
      dispatch(updateSkill({ id: selectedSkillId, data: editSkill }));
      setOpenEditDialog(false);
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
              <TableCell sx={{ fontWeight: "bold", color: "#2c3e50" }}>
                Title
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#2c3e50" }}>
                Description
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#2c3e50" }}>
                Category
              </TableCell>
              {isOwner && (
                <>
                  <TableCell sx={{ fontWeight: "bold", color: "#2c3e50" }}>
                    Certification
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#2c3e50" }}>
                    Status
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#2c3e50" }}>
                    Reason
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", color: "#2c3e50" }}
                    align="center"
                  >
                    Actions
                  </TableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {skills.map((skill) => (
              <TableRow key={skill.id}>
                <TableCell sx={{ fontWeight: "bold", color: "#2c3e50" }}>
                  {skill.title}
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#2c3e50" }}>
                  {skill.description}
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#2c3e50" }}>
                  {skill.category}
                </TableCell>
                {isOwner && (
                  <>
                    <TableCell sx={{ fontWeight: "bold", color: "#2c3e50" }}>
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
                    <TableCell sx={{ fontWeight: "bold", color: "#2c3e50" }}>
                      {skill.status}
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#2c3e50" }}>
                      {skill.moderation_reason || "-"}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: "bold", color: "#2c3e50" }}
                    >
                      <IconButton
                        size="small"
                        onClick={() => handleEditClick(skill)}
                      >
                        <EditIcon
                          sx={{ fontWeight: "bold", color: "#2c3e50" }}
                        />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteClick(skill.id)}
                      >
                        <DeleteIcon
                          sx={{ fontWeight: "bold", color: "#2c3e50" }}
                        />
                      </IconButton>
                    </TableCell>
                  </>
                )}
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
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button onClick={handleConfirmDelete}>Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Skill Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle
          sx={{
            backgroundColor: "#f9f9f9", // light background
            color: "#2c3e50", // dark text
          }}
        >
          Edit Skill
        </DialogTitle>

        <DialogContent
          sx={{
            backgroundColor: "#f9f9f9", // light background
          }}
        >
          <TextField
            label="Title"
            fullWidth
            value={editSkill.title}
            onChange={(e) =>
              setEditSkill({ ...editSkill, title: e.target.value })
            }
            margin="normal"
            sx={{
              "& .MuiInputBase-input": { color: "#2c3e50" },
              "& .MuiInputLabel-root": { color: "#2c3e50" },
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#2c3e50" },
            }}
          />

          <TextField
            label="Description"
            fullWidth
            value={editSkill.description}
            onChange={(e) =>
              setEditSkill({ ...editSkill, description: e.target.value })
            }
            margin="normal"
            sx={{
              "& .MuiInputBase-input": { color: "#2c3e50" },
              "& .MuiInputLabel-root": { color: "#2c3e50" },
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#2c3e50" },
            }}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel sx={{ color: "#2c3e50" }}>Category</InputLabel>
            <Select
              value={editSkill.category}
              onChange={(e) =>
                setEditSkill({ ...editSkill, category: e.target.value })
              }
              sx={{
                color: "#2c3e50",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#2c3e50",
                },
              }}
            >
              <MenuItem value="tech">Technology</MenuItem>
              <MenuItem value="art">Art & Design</MenuItem>
              <MenuItem value="cooking">Culinary Arts</MenuItem>
              <MenuItem value="music">Music & Audio</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>

        <DialogActions
          sx={{
            backgroundColor: "#f9f9f9", // light background
          }}
        >
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button onClick={handleEditSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
