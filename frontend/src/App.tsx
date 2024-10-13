import React from "react";
import NavBar from "./pages/NavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import LogIn from "./components/LogIn";
import ProductPage from "./pages/ProductPage";
import ProductList from "./pages/ProductList";
import AnalyticsPage from "./pages/AnalyticsPage";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/sign" element={<SignUp />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/log" element={<LogIn />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
