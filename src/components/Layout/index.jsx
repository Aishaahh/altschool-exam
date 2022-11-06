import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import { useUser } from "../../context/user-context";
const Layout = ({ children }) => {
  const { user, setUser } = useUser();
  const { signOut } = useAuth();

  return (
    <div className="min-h-screen h-full mr-5">
      <div className="grid grid-cols-1 h-full md:grid-cols-3">
        <div className="col-span-1 bg-primary relative">
          <div className="container px-4 md:px-8">
            <div className="flex items-center mt-[40px] z-50 relative">
              <p className="ml-2 text-white">Alt School</p>
            </div>
            <p className="text-white mt-8 z-50 relative">
              Welcome, {user ? user.name : ""}
            </p>
            <div>
              <nav>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/dashboard/profile">Profile</Link>
                <Link to="/dashboard/account">Account</Link>
                <Link to="/no-match">404</Link>
                <Link
                  onClick={() => {
                    signOut();
                    setUser(null);
                  }}
                  to="#"
                >
                  Sign out
                </Link>
              </nav>
            </div>
          </div>
        </div>
        <div className="col-span-2 flex ml-5 items-center h-screen">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
