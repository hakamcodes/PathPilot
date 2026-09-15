import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./lib/AuthContext";
import AppShell from "./components/AppShell";
import AuthGate from "./components/AuthGate";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Intake from "./pages/Intake";
import Dashboard from "./pages/Dashboard";
import StepDetail from "./pages/StepDetail";
import Profile from "./pages/Profile";
import Catalogue from "./pages/Catalogue";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route element={<AuthGate />}>
            <Route element={<AppShell />}>
              <Route path="/intake" element={<Intake />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/step/:stepId" element={<StepDetail />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/catalogue" element={<Catalogue />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
