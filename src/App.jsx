import "./App.css";
import { ProtectRoute, UserProvider } from "./context/user-context";
import { Route, Routes } from "react-router";
import Login from "./pages/login";
import { AuthProvider } from "./context/auth-context";
import Error404Page from "./pages/404";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/profile";
import Account from "./pages/account";
import Home from "./pages/home";
import RootErrorBoundary from "./components/RootErrorBoundary";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <Routes>
          <Route
            errorElement={<RootErrorBoundary />}
            path="/"
            element={<Home />}
          />
          <Route
            errorElement={<RootErrorBoundary />}
            path="/login"
            element={<Login />}
          />
          <Route
            path="/dashboard"
            errorElement={<RootErrorBoundary />}
            element={
              <ProtectRoute>
                <Dashboard />
              </ProtectRoute>
            }
          />

          <Route
            path="/dashboard/profile"
            element={
              <ProtectRoute>
                <Profile />
              </ProtectRoute>
            }
          />
          <Route
            path="/dashboard/account"
            element={
              <ProtectRoute>
                <Account />
              </ProtectRoute>
            }
          />
          <Route path="*" element={<Error404Page />} />
        </Routes>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
