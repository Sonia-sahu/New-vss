import { useDispatch, useSelector } from "react-redux";
import AppRouter from "../router/AppRouter";
import { useEffect } from "react";
import { fetchMyRegistrations } from "../features/workshops/actions/workshopActions";

export default function AuthWrapper() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(fetchMyRegistrations());
    }
  }, [dispatch, user]);

  return <AppRouter />;
}
