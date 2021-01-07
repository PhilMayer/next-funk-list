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
    const gigs = await db.collection('gigs').find({}).sort({date: -1}).toArray();
    const musicians = await db.collection('users').find({}).toArray();
    const lookup = {};
    musicians.forEach(m => {
        lookup[m.displayName] = m;
    });
    console.log("LOOKUP:", lookup)
    return { 
        props: { 
            gigs: JSON.parse(JSON.stringify(gigs)),
            musicians: JSON.parse(JSON.stringify(lookup)),
            username: session.user.name
        } 
    };
}