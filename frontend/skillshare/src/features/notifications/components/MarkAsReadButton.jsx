import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { markNotificationRead } from "../actions/notificationActions";

export default function MarkAsReadButton({ id }) {
  const dispatch = useDispatch();
  const handleClick = () => dispatch(markNotificationRead(id));

  return (
    <Button variant="text" size="small" onClick={handleClick}>
      Mark as Read
    </Button>
  );
}
