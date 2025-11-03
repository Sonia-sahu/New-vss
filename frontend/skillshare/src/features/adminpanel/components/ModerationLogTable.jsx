import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchModerationLogs } from "../actions/adminActions";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";

export default function ModerationLogTable() {
  const dispatch = useDispatch();
  const logs = useSelector((state) => state.admin.logs);

  useEffect(() => {
    dispatch(fetchModerationLogs());
  }, [dispatch]);

  return (
    <Paper sx={{ mt: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Admin</TableCell>
            <TableCell>Skill</TableCell>
            <TableCell>Action</TableCell>
            <TableCell>Reason</TableCell>
            <TableCell>Timestamp</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {logs.map((log) => (
            <TableRow key={log.id}>
              <TableCell>{log.admin.username}</TableCell>
              <TableCell>{log.skill.title}</TableCell>
              <TableCell>{log.action}</TableCell>
              <TableCell>{log.reason}</TableCell>
              <TableCell>{log.timestamp}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
