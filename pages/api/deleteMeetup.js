import { MongoClient, ObjectId } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "DELETE") {
    const client = new MongoClient(
      "mongodb+srv://mario:mario@cluster0.6c8ylwh.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    await client.connect();
    const db = client.db();

    const collection = db.collection("meetups");
    const objectId = new ObjectId(req.body.id);
const id = req.body.id
    const result = await collection.findOneAndDelete({ _id: objectId });
    console.log(objectId);
    if (result.value) {
      res
        .status(200)
        .json({ message: "Meetup deleted successfully", objectId });
    } else {
      res.status(404).json({
        message: "Could not find meetup",
        id,objectId
      });
    }

    client.close();
  }
};

export default handler;
