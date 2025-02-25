import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      const resp = await signInWithEmailAndPassword(auth, email, password);
      alert(`User ${email} logged in!`);
      navigate("/dashboard");
      return resp.user.uid;
    } catch (e) {
      alert((e as Error).message);
    }
  }

  return (
    <form onSubmit={handleLogin} className="p-4">
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 border"
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 border"
      />
      <button type="submit" className="bg-green-500 text-white p-2">
        Login
      </button>
    </form>
  );
}
