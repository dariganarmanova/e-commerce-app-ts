import React from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

const AuthPage = () => {
  const navigate = useNavigate();
  const handleLog = () => {
    navigate("/log");
  };
  const handleSign = () => {
    navigate("/sign");
  };
  return (
    <div className="authText">
      <h1>Are you new here? Do you want to sign?</h1>
      <button onClick={handleSign}>Click here then</button>
      <h1>Already have an account?</h1>
      <button onClick={handleLog}>Click here then</button>
    </div>
  );
};

export default AuthPage;
