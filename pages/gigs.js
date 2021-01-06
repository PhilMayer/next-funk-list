import {connectToDatabase} from "../util/mongodb";
import { getSession } from 'next-auth/client'
import Gig from "../components/gig";

export default function Gigs ({gigs, musicians, username}) {

    return (
        <div>
            <h1>The Giglist</h1>
            <ul>
                {gigs.map(gig => 
                    <li>
                        <Gig {...{gig, musicians, username}}/>
                    </li>
                )}
            </ul>
        </div>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession(context);

    const {db} = await connectToDatabase();
    const gigs = await db.collection('gigs').find({}).toArray();
    const musicians = await db.collection('users').find({}).toArray();

    return { 
        props: { 
            gigs: JSON.parse(JSON.stringify(gigs)),
            musicians: JSON.parse(JSON.stringify(musicians)),
            username: session.user.name
        } 
    };
}