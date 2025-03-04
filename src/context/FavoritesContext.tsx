import { createContext, useState, useEffect, ReactNode, useContext } from "react";
import { Movie } from '../pages/Home';
import { AuthContext } from './AuthContext';   
import { db } from '../config/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export interface ContextProps {
    favorites: Map<number, Movie>;
    setFavorite: (movie: Movie) => void;
}
export const FavoritesContext = createContext<ContextProps | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
    const [favorites, setFavorites] = useState(new Map<number, Movie>());
    const { user } = useContext(AuthContext);
    useEffect(() => {
        if (user) {
            console.log(`Loading favorites for user: ${user.uid}`);
            const userRef = doc(db, 'users', user.uid);

            getDoc(userRef).then((docSnap) => {
                if (docSnap.exists()) {
                    const loadedFavorites = new Map<number, Movie>();
                    const favoritesArray = docSnap.data().favorites || [];
                    favoritesArray.forEach((movie: Movie) => {
                        loadedFavorites.set(movie.id, movie);
                    });

                    console.log("Favorites loaded from Firestore:", loadedFavorites);
                    setFavorites(loadedFavorites);
                } else {
                    console.log("User document does not exist yet — starting fresh.");
                    setFavorites(new Map());
                }
            }).catch((error) => {
                console.error("Error loading favorites from Firestore:", error);
            });
        } else {
            setFavorites(new Map());  
        }
    }, [user]);

    function setFavorite(movie: Movie) {
        if (!user) {
            console.warn("User not logged in - cannot save favorites to Firestore.");
            return;
        }

        const updatedFavorites = new Map(favorites);

        if (updatedFavorites.has(movie.id)) {
            updatedFavorites.delete(movie.id);
            console.log(`Removed favorite: ${movie.title}`);
        } else {
            updatedFavorites.set(movie.id, movie);
            console.log(`Added favorite: ${movie.title}`);
        }

        setFavorites(updatedFavorites);

        const userRef = doc(db, 'users', user.uid);
        setDoc(userRef, { 
            favorites: Array.from(updatedFavorites.values())
        }, { merge: true })
        .then(() => {
            console.log("Favorites successfully saved to Firestore!");
        })
        .catch((error) => {
            console.error("Error saving favorites to Firestore:", error);
        });
    }

    return (
        <FavoritesContext.Provider value={{ favorites, setFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}
