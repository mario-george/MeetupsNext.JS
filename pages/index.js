import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import MeetupList from '../components/meetupList';
import { MongoClient } from 'mongodb';
import Head from 'next/head';

// our-domain.com/
// const DUMMY_MEETUPS = [
//   {
//     id: 'D1',
//     title: 'first Meetup',
//     description: 'first Meetup description',
//     address: 'addrss 1 ',
//     image: 'http://www.google.com',
//   },
//   {
//     id: 'D2',
//     title: 'second Meetup',
//     description: 'second Meetup description',
//     address: 'addrss 2 ',
//     image: 'http://www.yahoo.com',
//   },
// ];
function meetup(props) {
  //   const [loadedMeetups, setLoadedMeetups] = useState([]);
  //   useEffect(() => {
  //     //send http req then get data
  //     setLoadedMeetups(DUMMY_MEETUPS);
  //     //assume we got it
  //     //it is different then using DUMMY_MEETUPS directly because now with useEffect we wait 2 render cycles
  //     // first loadedMeetups is empty array then it is in the second render DUMMY_MEETUPS the user can see loading spinner at first
  //     // if you view page source you will find empty <ul></ul>

  //     // it is solved by next
  //     // good for SEO search engine optimization
  //   }, []);
  // // next has two prerendering static generation you call

  return (
    <>
      <Head>
        <title>React Meetup</title>
        <meta name="description" content="React  meetups with  " />
      </Head>
      <div>
        <MeetupList meetups={props.meetups} />
      </div>
    </>
  );
}

/* 
export async function getSaticProps() {
  //fetch data from api
  // wont be seen by client in only build mode
  // you receive it in the main fn props and access thro props.meetups
  //getSaticProps has to be that name and only in pages folder
  // so it will only render the full page now when the data is loaded
  // SSG stands for static site generation when you run npm run build you will see it

  return {
    props: { meetups: DUMMY_MEETUPS },
    // it only  gets added after npm run build to solve this add  revalidate which re exec this fn after the given seconds 3600s fetch the data
    // and re exec
    revalidate: 3600,
  };
}
*/
// export async function getServerSideProps(context) {
//   const req = context.req;
//   // can be used for authentication
//   // automatically run after each request
//   // if the data doesnt change frequently then getStaticProps is better and faster  because it can be catched
//   // but if you want to do authentication getServerSideProps is better

//   const res = context.res;
//   return {
//     props: { meetups: DUMMY_MEETUPS },
//   };
// }
export async function getServerSideProps() {
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

  client.close();
  // close the connection to mongo db

  // _id has complex object cant be return so convert it to string first
  return {
    props: {
      meetups: meetups.map((m) => {
        return {
          title: m.title,
          description: m.description,
          image: m.image,
          address: m.address,
          id: m._id.toString(),
          
        };
      }),
    },
  };
}
export default meetup;
