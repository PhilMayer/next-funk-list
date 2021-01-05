import nc from 'next-connect';
import { connectToDatabase } from "../../../util/mongodb";

const handler = nc();

handler.put(async (req, res) => {
    const { db } = await connectToDatabase();
    // const user = await db.collection('users').findOne({name: req.body.musicianName});
    // console.log(user)
    const gigName = `gigs.${req.body.gigName}`
    console.log(gigName)
    try {
        const updatedStatus = await db.collection('users').updateOne({ name: req.body.musicianName }, { $set: { [gigName]: req.body.status } })

    } catch (error) {
        console.log("ERR:", error)
    }
    res.status(200);
});



export default handler;