import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import { useRouter } from "next/router";
const meetup = (props) => {
  const { title, image, id, description, address } = props.meetup;
  const router = useRouter();
  const _id = router.query.meetupId;
  console.log(_id);
  const deleteMeetupHandler = async () => {
    const resp = await fetch("/api/deleteMeetup", {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    const data = await resp.json();
    console.log(data);
    console.log(id);
    console.log(typeof _id);
  };
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <div className="mx-auto flex flex-col w-1/2 border justify-left ">
        <img src={image} className="w-full h-full" />{" "}
        <div className="title">{title}</div>
        <div className="title">{address}</div>
        <div className="title">{description}</div>
        <button type="text" onClick={deleteMeetupHandler}>
          Delete Meetup
        </button>
      </div>
    </>
  );
};
export default meetup;
// getStaticPaths is used only for a dynamic page and if you are using getStaticProps
// getStaticPaths specifies the pages that only will be pre generated for that pathotherwise the user will see 404 error
// fallback if set to false any paths other than specified will give 404 if true it will dynamicaly generate it

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://mario:mario@cluster0.6c8ylwh.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollections = db.collection("meetups");
  const meetupIds = await meetupCollections.find({}, { _id: 1 }).toArray();
  // second parameter {_id:1} means take _id from the obj/document only
  // first parameter is for filtering
  // .findOne({first one that satisfy that condition })
  console.log(meetupIds);
  return {
    fallback: false,
    // give 404 for other not pre generated pages
    paths: meetupIds.map((m) => {
      return { params: { meetupId: m._id.toString() } };
    }),

    // paths: [
    //   {
    //     params: {
    //       meetupId: 'm1',
    //     },
    //   },
    //   {
    //     params: {
    //       meetupId: 'm2',
    //     },
    //   },
    // ],
  };
}
export async function getStaticProps(context) {
  const client = await MongoClient.connect(
    "mongodb+srv://mario:mario@cluster0.6c8ylwh.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollections = db.collection("meetups");
  const id = context.params.meetupId;
  const meetup = await meetupCollections.findOne({ _id: ObjectId(id) });

  return {
    props: {
      meetup: {
        title: meetup.title,
        description: meetup.description,
        image: meetup.image,
        id: meetup._id.toString(),
        address: meetup.address,
      },
    },
    revalidate: 1,
  };
}
