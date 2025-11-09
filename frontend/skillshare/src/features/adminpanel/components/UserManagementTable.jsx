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
  Avatar,
  Chip,
  Tooltip,
  Stack,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function UserManagementTable() {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.admin);
  const user = useSelector((state) => state.auth?.user);
  const profileImageUrl = user?.profile_picture
    ? `http://127.0.0.1:8000${user.profile_picture}`
    : "/default-profile.png";
  console.log("Profile Image URL:", profileImageUrl);
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
            bgcolor: "#f0f4f8",
            color: "#2c3e50",
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <TableContainer>
            <Table size={isMobile ? "small" : "medium"}>
              <TableHead>
                <TableRow sx={{ bgcolor: "#2c3e50" }}>
                  {["Username", "Email", "Role", "Mentor", "Actions"].map(
                    (header) => (
                      <TableCell
                        key={header}
                        sx={{ color: "#dedde4ff", fontWeight: "bold" }}
                      >
                        {header}
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user, index) => (
                  <TableRow
                    key={user.id}
                    sx={{
                      backgroundColor:
                        index % 2 === 0 ? "#d3d1d1ff" : "#d3d1d1ff",
                      "&:hover": {
                        backgroundColor: "#838282ff",
                        cursor: "pointer",
                      },
                    }}
                  >
                    <TableCell sx={{ color: "#2b283bff" }}>
                      <Box display="flex" alignItems="center">
                        <Avatar
                          alt={user?.username || "User"}
                          src={profileImageUrl}
                          sx={{ mr: 1 }}
                        >
                          {user.username[0]}
                        </Avatar>
                        {user.username}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ color: "#2b283bff" }}>
                      {user.email}
                    </TableCell>
                    <TableCell sx={{ color: "#2b283bff" }}>
                      <Chip
                        label={user.is_admin ? "Admin" : "User"}
                        sx={{
                          bgcolor: "#403f43ff", // dark background
                          color: "#fff", // white text
                          fontWeight: "bold",
                        }}
                        size="small"
                      />
                    </TableCell>
                    <TableCell sx={{ color: "#2b283bff" }}>
                      <Chip
                        label={user.is_mentor ? "Yes" : "No"}
                        color="#524e4eff"
                        size="small"
                        sx={{
                          bgcolor: "#434245ff", // dark background
                          color: "#fff", // white text
                          fontWeight: "bold",
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Edit User">
                        <IconButton
                          aria-label="edit"
                          onClick={() => handleEditClick(user)}
                          color="primary"
                        >
                          <EditIcon sx={{ color: "#2b283bff" }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete User">
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleDeleteClick(user.id)}
                          color="error"
                        >
                          <DeleteIcon sx={{ color: "#2b283bff" }} />
                        </IconButton>
                      </Tooltip>
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
          <Stack spacing={2}>
            <TextField
              label="Username"
              name="username"
              fullWidth
              value={formData.username}
              onChange={handleChange}
            />
            <TextField
              label="Email"
              name="email"
              fullWidth
              value={formData.email}
              onChange={handleChange}
            />
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                name="is_admin"
                value={formData.is_admin ? "true" : "false"}
                onChange={handleChange}
                label="Role"
              >
                <MenuItem value="true">Admin</MenuItem>
                <MenuItem value="false">User</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Mentor</InputLabel>
              <Select
                name="is_mentor"
                value={formData.is_mentor ? "true" : "false"}
                onChange={handleChange}
                label="Mentor"
              >
                <MenuItem value="true">Yes</MenuItem>
                <MenuItem value="false">No</MenuItem>
              </Select>
            </FormControl>
          </Stack>
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
