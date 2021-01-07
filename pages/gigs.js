import {connectToDatabase} from "../util/mongodb";
import { getSession } from 'next-auth/client'
import Gig from "../components/gig";

export default function Gigs ({gigs, musicians, username}) {

    return (
        <div>
            <h1>THE FUNKLIST</h1>
            
                {gigs.map(gig => 
                    <div>
                        <Gig {...{gig, musicians, username}}/>
                    </div>
                )}
            
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