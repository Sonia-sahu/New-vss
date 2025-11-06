// components/SearchBar.js
import { TextField, Box } from "@mui/material";

export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <Box sx={{ mb: 3 }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search by name or skill..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </Box>
  );
}
