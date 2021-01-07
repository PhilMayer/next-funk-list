import nc from 'next-connect';
import { connectToDatabase } from "../../../util/mongodb";

const handler = nc();

handler.put(async (req, res) => {
    const { db } = await connectToDatabase();
    const { gigName, musicianName, status } = req.body;
    const dbGigName = `gigs.${gigName}`

    try {
        await db.collection('users').updateOne({ name: musicianName }, { $set: { [dbGigName]: status } });
    } catch (error) {
        console.log("ERR:", error)
    }
    res.status(200).end();
});



export default handler;