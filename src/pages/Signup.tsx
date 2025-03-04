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
        <div className="h-screen flex justify-center items-center bg-gray-900 text-white">
            <form onSubmit={handleSignup} className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 space-y-4">
                <h1 className="text-2xl font-bold">Sign Up</h1>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button type="submit" className="w-full bg-blue-500 p-2 rounded hover:bg-blue-600">
                    Sign Up
                </button>
            </form>
        </div>
    );
}
