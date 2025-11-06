import { Button } from "@mui/material";
import { styled } from "@mui/system";

const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  borderRadius: 8,
  fontWeight: 500,

  padding: "8px 20px",
  fontSize: "0.95rem",
  transition: "all 0.3s ease",
  boxShadow: "none",
  background: "linear-gradient(135deg, #766ffbff, #6366f1)",
  color: "#fff",
  "&:hover": {
    transform: "translateY(-1px)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    background: "linear-gradient(135deg, #4338ca, #6366f1)",
  },
  "&:disabled": {
    backgroundColor: theme.palette.grey[300],
    color: theme.palette.text.disabled,
  },
}));

export default StyledButton;
