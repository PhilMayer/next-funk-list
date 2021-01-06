import nc from 'next-connect';
import { connectToDatabase } from "../../../util/mongodb";

const handler = nc();

handler.post(async (req, res) => {
    const { db } = await connectToDatabase();
    // get all active users, sort into instrument buckets
    const newGig = await db.collection('gigs').insertOne(req.body);
    console.log("NEW:", newGig.ops);
    res.status(200);
});

export default handler;