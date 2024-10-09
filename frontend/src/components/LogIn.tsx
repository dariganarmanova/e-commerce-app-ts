import axios from "axios";
import React, { useState } from "react";

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

  const handleSubmit = async (e: React.FormEvent) => {
    const token = "";
    e.preventDefault();
    try {
      const result = await axios.post(
        "http://localhost:5005/log",
        { user },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //const token = result.data.token;
      localStorage.setItem("token", token);
      if (result) {
        alert("User logged in");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
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
