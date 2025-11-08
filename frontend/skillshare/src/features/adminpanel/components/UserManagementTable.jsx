import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, deleteUser, editUser } from "../actions/adminActions";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  Box,
  CircularProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TableContainer,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function UserManagementTable() {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.admin);

  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    is_admin: false,
    is_mentor: false,
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      is_admin: user.is_admin,
      is_mentor: user.is_mentor,
    });
    setOpen(true);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
    }
  };

  const handleEditSubmit = () => {
    if (selectedUser) {
      dispatch(editUser({ id: selectedUser.id, ...formData }));
      setOpen(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "is_admin" || name === "is_mentor" ? value === "true" : value,
    }));
  };

  const cellStyle = { color: "#2c3e50" };

  return (
    <Box sx={{ p: { xs: 2, sm: 4 } }}>
      {status === "loading" ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Paper
          sx={{
            mt: 4,
            overflowX: "auto",
            bgcolor: "#b3afafff",
            color: "#2c3e50",
          }}
        >
          <TableContainer>
            <Table size={isMobile ? "small" : "medium"}>
              <TableHead>
                <TableRow>
                  <TableCell sx={cellStyle}>Username</TableCell>
                  <TableCell sx={cellStyle}>Email</TableCell>
                  <TableCell sx={cellStyle}>Role</TableCell>
                  <TableCell sx={cellStyle}>Mentor</TableCell>
                  <TableCell sx={cellStyle}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell sx={cellStyle}>{user.username}</TableCell>
                    <TableCell sx={cellStyle}>{user.email}</TableCell>
                    <TableCell sx={cellStyle}>
                      {user.is_admin ? "Admin" : "User"}
                    </TableCell>
                    <TableCell sx={cellStyle}>
                      {user.is_mentor ? "Yes" : "No"}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="edit"
                        onClick={() => handleEditClick(user)}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDeleteClick(user.id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ color: "#2c3e50" }}>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Username"
            name="username"
            fullWidth
            value={formData.username}
            onChange={handleChange}
            sx={{ input: { color: "#2c3e50" } }}
          />
          <TextField
            margin="dense"
            label="Email"
            name="email"
            fullWidth
            value={formData.email}
            onChange={handleChange}
            sx={{ input: { color: "#2c3e50" } }}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel sx={{ color: "#2c3e50" }}>Role</InputLabel>
            <Select
              name="is_admin"
              value={formData.is_admin ? "true" : "false"}
              onChange={handleChange}
              label="Role"
              sx={{ color: "#2c3e50" }}
            >
              <MenuItem value="true" sx={cellStyle}>
                Admin
              </MenuItem>
              <MenuItem value="false" sx={cellStyle}>
                User
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel sx={{ color: "#2c3e50" }}>Mentor</InputLabel>
            <Select
              name="is_mentor"
              value={formData.is_mentor ? "true" : "false"}
              onChange={handleChange}
              label="Mentor"
              sx={{ color: "#2c3e50" }}
            >
              <MenuItem value="true" sx={cellStyle}>
                Yes
              </MenuItem>
              <MenuItem value="false" sx={cellStyle}>
                No
              </MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleEditSubmit} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
