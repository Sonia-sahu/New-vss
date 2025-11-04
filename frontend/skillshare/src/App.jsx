import AppRouter from "./router/AppRouter";
import DashboardLayout from "./layouts/DashboardLayout";
import ThemeProvider from "./theme/ThemeProvider";
import AuthWrapper from "./components/AuthWrapper"; // new wrapper
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function App() {
  return (
    <ThemeProvider>
      <AuthWrapper />
      <ToastContainer position="top-center" autoClose={3000} />
    </ThemeProvider>
  );
}
