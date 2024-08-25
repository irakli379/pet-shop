import React from "react";

const Spinner = () => {
  const spinnerStyle = {
    border: "8px solid #f3f3f3" /* Light grey */,
    borderTop: "8px solid #3498db" /* Blue */,
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    animation: "spin 1s linear infinite",
    margin: "auto",
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f9f9f9",
  };

  return (
    <div style={containerStyle}>
      <div style={spinnerStyle}></div>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Spinner;
