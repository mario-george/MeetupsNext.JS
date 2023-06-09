import { MongoClient } from 'mongodb';

async function handler(req, res) {
  const client = await MongoClient.connect(
    'mongodb+srv://mario:mario@cluster0.6c8ylwh.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();
  // getting access to a database
  const meetupCollections = db.collection('meetups');
  // getting access to a collection

  const meetups = await meetupCollections.find().toArray();
  // .find will find all the documents in the collection which is obj and then toArray will convert it to an array
  console.log(meetups);
  res.status(201).json(meetups);
  client.close();
  // close the connection to mongo db

  // _id has complex object cant be return so convert it to string first
}
export default handler;
