import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container-fluid" style={{ height: "250px" }}>
      <h1 className="header mt-4 text-center">Join with Adorminis today!</h1>
      <div className="d-grid gap-2 col-4 mx-auto mt-3">
        <Link to={"/register"} className="btn btn-outline-primary mt-2">
          Join now
        </Link>
        <Link to={"/login"} className="btn btn-outline-primary mt-3">
          Login
        </Link>
      </div>
    </div>
  );
}
export default Home;
