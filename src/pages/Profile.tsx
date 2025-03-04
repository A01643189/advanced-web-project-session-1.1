import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const { user } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            const userRef = doc(db, "users", user.uid);
            getDoc(userRef).then((docSnap) => {
                if (docSnap.exists()) {
                    setUsername(docSnap.data().username);
                    setBio(docSnap.data().bio);
                }
            });
        }
    }, [user]);

    async function handleSave() {
        if (user) {
            try {
                await setDoc(doc(db, 'users', user.uid), {
                    username: username,
                    bio: bio
                });
                alert('Profile Updated!');
                navigate('/profile');
            } catch (e) {
                alert((e as Error).message);
            }
        }
    }

    return (
        <div className="p-4">
            <h1>Edit Profile</h1>
            <h3>Username:</h3>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="p-2 border"
            />
            <br /><br />
            <h3>Bio:</h3>
            <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Bio"
                className="p-2 border"
            />
            <br /><br />
            <button onClick={handleSave} className="bg-blue-500 text-white p-2">
                Save
            </button>
        </div>
    );
}
