import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    try {
      const resp = await createUserWithEmailAndPassword(auth, email, password);
      alert(`User ${email} created!`);
      navigate("/login");
      return resp.user.uid;
    } catch (e) {
      alert((e as Error).message);
    }
  }

  return (
    <form onSubmit={handleSignup} className="p-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 border"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 border"
      />
      <button type="submit" className="bg-blue-500 text-white p-2">
        Sign Up
      </button>
    </form>
  );
}
