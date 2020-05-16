import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="nav">
      <div className="App">
        <div>
          <Link to="/home">Home</Link>
        </div>
        <h1>Lambda Eats</h1>
        <div>
          <Link to="/help">help</Link>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
