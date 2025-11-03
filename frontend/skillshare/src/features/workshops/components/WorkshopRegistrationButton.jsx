import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { registerWorkshop } from "../actions/workshopActions";

export default function WorkshopRegistrationButton({ workshopId }) {
  const dispatch = useDispatch();

  const handleRegister = () => {
    dispatch(registerWorkshop({ workshop: workshopId }));
  };

  return (
    <Button variant="outlined" onClick={handleRegister}>
      Register
    </Button>
  );
}
