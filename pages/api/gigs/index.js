import nc from 'next-connect';
import { connectToDatabase } from "../../../util/mongodb";

const handler = nc();

handler.post(async (req, res) => {
    console.log(req)
    const { db } = await connectToDatabase();
    const newGig = await db.collection('gigs').insertOne(req.body);
    console.log("NEW:", newGig.ops);
    res.close();
});

export default handler;