// api routes create folder called api inside pages
// should get JSON data and send JSON data
// api routes(special routes/pages) give you api end points
// all about accepting incoming HTTP req (post , put delete ... req)and you can store data in a db or recieve ata
// in API you need to define functions
// will run on the server never on the client (server side code)
//  so we can use credentials

import { MongoClient } from "mongodb"

// /api/new-meetup will trigger this function which we will define
// function nameUptoYou(req, res) {
//   // req obj => data of incoming req
//   // res obj => sending back a response
//   const data = req.body;
//   // get the data sent

//   const { title, image, id, description } = data;

//   // use mongodb atlas
//   // then w need to connect to the cluster to connect to db
//   // Network Access => add ip address =>add your ip
//   // database access=>create one user with read/write accessto db
//   // then clusters=>connect=>connect your application
//   // run npm i mongodb

// // const client = await MongoClient.connect("copy link you get and replace username/pw and remove angle brackets and MyFirstDatabase with the name of db u want")
// // const db=client.db()
// // this is code you want to never run on client side
// // connect returns a promise you need to turn the function to async
// // mongo db is a noSql database works with collections(like tables in a sql database) of documents(meetups for example)
// // const meetupCollections=db.collection('name of a collectin meetups')
// // a document is just an obj at the end
// // meetupCollections.insertOne({}) insert a doc into the collection
// // const result = await meetupCollections.insertOne(data)
// // result will be an obj with the auto generated id

// // client.close() to close the db
// // res.status() to set http status code 201 to indicate that something was inserted successfully
// // res.status(201).json({message:"meetup inserted"}) to add json data that will be added to the response



//   // req.method contain method
//   // if (req.method === 'POST') {
//   //   //exec tisonly with post
//   // }
// }
// export default nameUptoYou;

async function handler(req,res){
  if(req.method==='POST'){

    const data =req.body
  const client = await MongoClient.connect('mongodb+srv://mario:mario@cluster0.6c8ylwh.mongodb.net/meetups?retryWrites=true&w=majority')
  const db=await client.db()
  const meetupCollections= db.collection('meetups')
  const result = await meetupCollections.insertOne(data)
  console.log(result)
  client.close()
  
    res.status(201).json({message:'Inserted Successfully'})
  }

}
export default handler