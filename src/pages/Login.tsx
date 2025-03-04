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
        <div className="h-screen flex justify-center items-center bg-gray-900 text-white">
            <form onSubmit={handleLogin} className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 space-y-4">
                <h1 className="text-2xl font-bold">Login</h1>
                <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button type="submit" className="w-full bg-green-500 p-2 rounded hover:bg-green-600">
                    Login
                </button>
            </form>
        </div>
    );
}
