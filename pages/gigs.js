import {connectToDatabase} from "../util/mongodb";
import Gig from "../components/gig";

export default function Gigs ({gigs, musicians}) {

    return (
        <div>
            <h1>The Giglist</h1>
            <ul>
                {gigs.map(gig => 
                    <li>
                        <Gig gig={gig} musicians={musicians}/>
                    </li>
                )}
            </ul>
        </div>
    );
}

export async function getServerSideProps() {
    const {db} = await connectToDatabase();

    const gigs = await db.collection('gigs').find({}).toArray();
    const musicians = await db.collection('users').find({}).toArray();

    return { 
        props: { 
            gigs: JSON.parse(JSON.stringify(gigs)),
            musicians: JSON.parse(JSON.stringify(musicians)) 
        } 
    };
}