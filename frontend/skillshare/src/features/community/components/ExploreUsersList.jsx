// components/ExploreUsersList.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { exploreUsers } from "../actions/communityActions";
import UserCard from "./UserCard";
import { Box, Typography } from "@mui/material";

export default function ExploreUsersList({ searchTerm }) {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.community.users);
  const loggedInUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(exploreUsers());
  }, [dispatch]);

  const filteredUsers = users
    .filter((user) => user.id !== loggedInUser?.id)
    .filter((user) => {
      const nameMatch = user.username
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      const skillMatch = user.skills?.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return nameMatch || skillMatch;
    });

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {filteredUsers.length > 0 ? (
        filteredUsers.map((user) => <UserCard key={user.id} user={user} />)
      ) : (
        <Typography variant="body1" mt={2} color="text.secondary">
          No users matched your search.
        </Typography>
      )}
    </Box>
  );
}
