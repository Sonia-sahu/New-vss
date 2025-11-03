import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../actions/communityActions";

export default function FollowButton({ userId }) {
  const dispatch = useDispatch();
  const following = useSelector((state) => state.community.following);
  const isFollowing = following.includes(userId);

  const handleClick = () => {
    if (isFollowing) {
      dispatch(unfollowUser(userId));
    } else {
      dispatch(followUser({ following: userId }));
    }
  };

  return (
    <Button variant="outlined" onClick={handleClick} sx={{ mt: 2 }}>
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
}
