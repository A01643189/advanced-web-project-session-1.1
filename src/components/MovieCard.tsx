interface MovieProps {
    title: string;
    poster: string;
    rating: string;
}

export default function MovieCard({ title, poster, rating }: MovieProps) {
    return (
        <div className="p-4 bg-gray-900 text-white rounded-lg">
            <img src={poster} alt={title} className="w-full rounded" />
            <h3 className="text-lg font-bold mt-2">{title}</h3>
            <p>⭐{rating}</p>
        </div>
    )
}