import React, { useState } from "react";
import axios from "axios";

interface Sign {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "seller" | "buyer";
}

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [role, setRole] = useState<"buyer" | "seller">("buyer");

  const handleSubmit = async (e: React.FormEvent) => {
    const token = "";
    e.preventDefault();
    try {
      const newUser: Sign = {
        id: 0,
        name: "",
        password: "",
        email: "",
        role,
      };
      const result = await axios.post(
        "http://localhost:5005/sign",
        { newUser },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //const token = result.data.token;
      localStorage.setItem("token", token);
      if (result) {
        alert("User successfuly signed in");
      } else {
        alert("Some problem with server");
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
        />
        <input
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
        />
        <label>Select your role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as "buyer" | "seller")}
        >
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
        </select>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignUp;
