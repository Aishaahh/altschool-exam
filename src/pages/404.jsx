import React from "react";
import { Link } from "react-router-dom";

const Error404Page = () => {
  return (
    <div className="container">
      <h3>Page not found.</h3>
      <Link to="/dashboard">Go to dashboard</Link>
    </div>
  );
};

export default Error404Page;
