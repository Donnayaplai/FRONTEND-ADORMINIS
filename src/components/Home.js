import React from "react";

function Home() {
  const buttonstyle = {
    backgroundColor: "#C7E5F0",
    color: "#000",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: "300px",
    width: "90%",
    maxHeight: "50px",
    height: "100%",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "4px",
    cursor: "pointer",
  };

  return (
    <div className="container-fluid" style={{ height: "250px" }}>
      <h1 className="header mt-4 text-center">Join with Adorminis today!</h1>
      <a
        href="/register"
        className="btn mt-4"
        role="button"
        style={buttonstyle}
      >
        Join now
      </a>
      <a href="./login" className="btn mt-4" role="button" style={buttonstyle}>
        Login
      </a>
      <div className="web-content"></div>
    </div>
  );
}
export default Home;
