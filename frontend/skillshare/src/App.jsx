import AppRouter from "./router/AppRouter";
import ThemeProvider from "./theme/ThemeProvider"; // Your custom theme wrapper
import AuthWrapper from "./components/AuthWrapper"; // Handles auth + layout
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

export default function App() {
  return (
    <ThemeProvider>
      {/* AuthWrapper decides whether to show layout or just routes */}
      <AuthWrapper />

      {/* Global toast notifications */}
      <ToastContainer position="top-center" autoClose={3000} />
    </ThemeProvider>
  );
}
