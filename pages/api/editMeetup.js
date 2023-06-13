import { MongoClient, ObjectId } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "PATCH") {
    const objectId = new ObjectId(req.body._id);
    const client = await MongoClient.connect(
      "mongodb+srv://mario:mario@cluster0.6c8ylwh.mongodb.net/meetups?retryWrites=true&w=majority"
    );
      
    const db = client.db();
    const collection = db.collection("meetups");
    const updatedObject = {
      title: req.body.title,
      address: req.body.address,
      image: req.body.image,
      description: req.body.description,
    };
    const results = await collection.findOneAndUpdate(
      {
        _id: objectId,
      },
      { $set: updatedObject },
      { returnOriginal: false }
    );
    const updatedMeetup = await collection.findOne({ _id: objectId });

if(results){

    res.status(200).json({message:"Meetup has been updated successfully",updatedMeetup})
}else{
    res.status(404).json({message:"Error has occurred while updating the meetup"})

}

    client.close();
  }
};
export default handler;
