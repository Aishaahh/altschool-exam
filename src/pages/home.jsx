import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container">
      <h1>Welcome!</h1>
      <Link to="/login">Login to continue</Link>
    </div>
  );
};

export default Home;
