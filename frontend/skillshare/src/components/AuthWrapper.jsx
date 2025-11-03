import { useSelector } from "react-redux";
import AppRouter from "../router/AppRouter";
import DashboardLayout from "../layouts/DashboardLayout";

export default function AuthWrapper() {
  const { token } = useSelector((state) => state.auth);

  return token ? (
    <DashboardLayout>
      <AppRouter />
    </DashboardLayout>
  ) : (
    <AppRouter />
  );
}
