import AppRouter from "./router/AppRouter";
import DashboardLayout from "./layouts/DashboardLayout";
import ThemeProvider from "./theme/ThemeProvider";
import AuthWrapper from "./components/AuthWrapper"; // new wrapper

export default function App() {
  return (
    <ThemeProvider>
      <AuthWrapper />
    </ThemeProvider>
  );
}
