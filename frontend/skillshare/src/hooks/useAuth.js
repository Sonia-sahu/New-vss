import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/slice/authSlice";

export default function useAuth() {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);

  const isAuthenticated = !!token;

  const signOut = () => {
    dispatch(logout());
  };

  return {
    user,
    token,
    isAuthenticated,
    signOut,
  };
}
