import React, { FormEvent, useState } from "react";
import axios from "axios";

interface Sign {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
}

const SignUp: React.FC = () => {
  const [signData, setSignData] = useState<Sign>({
    id: 0,
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:5005/sign", signData);
      if (result) {
        alert("User succesfully signed in!");
      } else {
        alert("Something is wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={signData.email}
          type="email"
          placeholder="input your email"
          onChange={(e) => setSignData({ ...signData, email: e.target.value })}
        />
        <input
          value={signData.password}
          type="password"
          placeholder="enter your password"
          onChange={(e) =>
            setSignData({ ...signData, password: e.target.value })
          }
        />
        <input
          value={signData.name}
          placeholder="please enter your name"
          type="text"
          onChange={(e) => setSignData({ ...signData, name: e.target.value })}
        />
        <label>Select your role</label>
        <select
          id="role"
          onChange={(e) => setSignData({ ...signData, role: e.target.value })}
        >
          <option value={signData.role}>Buyer</option>
          <option value={signData.role}>Seller</option>
        </select>
        <button type="submit">click me</button>
      </form>
    </div>
  );
};

export default SignUp;
