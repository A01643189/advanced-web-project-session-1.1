import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

interface Review {
    movieId: number;
    movieTitle: string;  
    review: string;
    userName: string;
    userId: string;
}

export default function MyReviews() {
    const { user } = useContext(AuthContext);
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        if (user) {
            const reviewsRef = collection(db, "reviews");
            const q = query(reviewsRef, where("userId", "==", user.uid));
            getDocs(q).then((snapshot) => {
                setReviews(snapshot.docs.map((doc) => doc.data() as Review));
            });
        }
    }, [user]);

    return (
        <div className="bg-gray-800 p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-2">My Reviews</h2>
            {reviews.length === 0 ? (
                <p>You haven't written any reviews yet.</p>
            ) : (
                <ul className="space-y-2">
                    {reviews.map((r, index) => (
                        <li key={index}>
                            <strong>{r.movieTitle}</strong><br />  {}
                            Review: <span className="italic">{r.review}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
