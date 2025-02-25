import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1>Welcome to your dashboard!</h1>
      <h2>Logged In as {user?.email}</h2>
    </div>
  );
}
