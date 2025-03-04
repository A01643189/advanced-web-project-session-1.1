import { Link } from "react-router-dom";
import { lazy, Suspense, ReactNode } from "react";

interface MovieProps {
    id: number;
    title: string;
    poster: string;
    rating: string;
}

const LazyImage = lazy(() => import("./LazyImage"));

export default function MovieCard({ id, title, poster, rating }: MovieProps) {
    return (
        <div className="p-4 bg-gray-900 text-white rounded-lg">
            <Suspense fallback={(<div className="spinner"></div> as ReactNode)}>
                <LazyImage src={poster} alt={title} className="w-full rounded" />
            </Suspense>
            <h3 className="text-lg font-bold mt-2">
                <Link to={`/movie/${id}`}>
                    {title}
                </Link>
            </h3>
            <p>⭐{rating}</p>
        </div>
    );
}
