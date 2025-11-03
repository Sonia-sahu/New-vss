import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { exploreUsers } from "../actions/communityActions";
import UserCard from "./UserCard";
import { Box } from "@mui/material";

export default function ExploreUsersList() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.community.users);

  useEffect(() => {
    dispatch(exploreUsers());
  }, [dispatch]);

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </Box>
  );
}
