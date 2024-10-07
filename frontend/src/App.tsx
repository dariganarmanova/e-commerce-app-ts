import React from "react";
import NavBar from "./pages/NavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import LogIn from "./components/LogIn";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/sign" element={<SignUp />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/log" element={<LogIn />} />
      </Routes>
    </Router>
  );
}

export default App;
