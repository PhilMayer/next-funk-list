import nc from 'next-connect';
import { connectToDatabase } from "../../../util/mongodb";

const handler = nc();

handler.post(async (req, res) => {
    const { db } = await connectToDatabase();
    const funkrusters = await db.collection('users').find({}).toArray();
    const band = constructBand(funkrusters);
    req.body.band = band;
    try {
        const newGig = await db.collection('gigs').insertOne(req.body);    
        const gigName = `gigs.${newGig.ops[0].gigName}`;
        await db.collection('users').updateMany({}, { $set: { [gigName]: '' } })
    } catch (error) {
        console.log(error);
    }

    res.status(200).end();
});

function constructBand(funkrusters) {
    const band = {
        'trumpet': [],
        'trombone': [],
        'tuba': [],
        'sax': [],
        'vocals': [],
        'drums': []
    }

    funkrusters.forEach(funkruster => {
        const instrument = funkruster.instrument;
        band[instrument].push(funkruster.displayName);
    });

    return band;
}

export default handler;