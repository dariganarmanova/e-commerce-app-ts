import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context";
import "../index.css";

interface User {
  id: number;
  email: string;
  password: string;
}

const LogIn: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [user, setUser] = useState<User>({
    id: 0,
    email: "",
    password: "",
  });

  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("LoginComponent must be used within an AuthProvider");
  }
  const { setIsLoggedIn } = context;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:5005/log", user);
      const token = result.data.token;
      localStorage.setItem("token", token);
      if (result) {
        alert("User logged in");
        setIsLoggedIn(true);
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="containerSign">
      <form onSubmit={handleSubmit} className="formSign">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="enter your email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="enter your password"
        />
        <button>Log In</button>
      </form>
    </div>
  );
};

export default LogIn;
