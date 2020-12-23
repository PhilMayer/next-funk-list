import { connectToDatabase } from "../util/mongodb";
import { getSession } from 'next-auth/client'

export default function Top({ movies }) {
    
    return (
        <div>
            <h1>Top 1000 Movies of All Time</h1>
            <p>
                <small>(According to Metacritic)</small>
            </p>
            <ul>
                {movies.map((movie) => (
                    <li>
                        <h2>{movie.title}</h2>
                        <h3>{movie.metacritic}</h3>
                        <p>{movie.plot}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export async function getServerSideProps(context) {
    const session = await getSession(context)
    console.log(session)
    const { db } = await connectToDatabase();

    const movies = await db
        .collection("movies")
        .find({})
        .sort({ metacritic: -1 })
        .limit(1)
        .toArray();
    return {
        props: {
            movies: JSON.parse(JSON.stringify(movies)),
        },
    };
}
