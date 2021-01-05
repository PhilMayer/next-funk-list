import nc from 'next-connect';
import { connectToDatabase } from "../../../util/mongodb";

const handler = nc();

handler.post(async (req, res) => {
    const { db } = await connectToDatabase();
    const newGig = await db.collection('gigs').insertOne(req.body);
    console.log("NEW:", newGig.ops);
    res.status(200);
});

export default handler;