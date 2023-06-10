import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
const meetup = (props) => {
  const { title, image, id, description, address } = props.meetup;
  const router = useRouter();

  const [meetupData, setMeetupData] = useState({
    title: title,
    image: image,
    id: id,
    description: description,
    address: address,
  });
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
  const editMeetupHandler = async () => {
    const resp = await fetch("/api/editMeetup", {
      body: JSON.stringify({
        _id: id,
        title: title,
        description: description,
        image: image,
        address: address,
      }),
      headers: { "Content-Type": "application/json" },
      method: "PATCH",
    });
    const data = await resp.json();
    console.log(data);
  };

  const [editState, setEditState] = useState({
    editAddress: false,
    editImage: false,
    editTitle: false,
    editDescription: false,
    editTitleConfirm: false,
    editDescriptionConfirm: false,
    editImageConfirm: false,
  });

  const editAddressConfirmHandler = (boolean) => {
    if (boolean) {
      setMeetupData((p) => {
        return { ...p, address: cached.address };
      });
      setEditState((p) => {
        return { ...p, editAddress: false };
      });
    }
  };

  const editDescriptionConfirmHandler = (boolean) => {
    if (boolean) {
      setMeetupData((p) => {
        return { ...p, description: cached.description };
      });
      setEditState((p) => {
        return { ...p, editDescription: false };
      });
    }
  };
  const editTitleConfirmHandler = (boolean) => {
    if (boolean) {
      setMeetupData((p) => {
        return { ...p, title: cached.title };
      });
      setEditState((p) => {
        return { ...p, editTitle: false };
      });
    }
  };
  const editImageConfirmHandler = (boolean) => {
    if (boolean) {
      setMeetupData((p) => {
        return { ...p, image: cached.image };
      });
      setEditState((p) => {
        return { ...p, editImage: false };
      });
    }
  };
  const [cached, setCached] = useState({
    title: title,
    image: image,
    id: id,
    description: description,
    address: address,
  });
  const addressChangeHandler = (event) => {
    setCached((p) => {
      return { ...p, address: event.target.value };
    });
  };
  const descriptionChangeHandler = (event) => {
    setCached((p) => {
      return { ...p, description: event.target.value };
    });
  };
  const imageChangeHandler = (event) => {
    setCached((p) => {
      return { ...p, image: event.target.value };
    });
  };
  const titleChangeHandler = (event) => {
    setCached((p) => {
      return { ...p, title: event.target.value };
    });
  };

  return (
    <>
      <Head>
        <title>{meetupData.title}</title>
        <meta name="description" content={meetupData.description} />
      </Head>
      <div className="mx-auto flex flex-col w-1/2 border p-4">
        <img src={meetupData.image} className="w-full h-full object-cover" />
        <div className="text-base mb-2 flex space-x-4 items-center">
          <div className="text-xl font-semibold">Title:</div>
          {editState.editTitle ? (
            <>
              <input
                type="text"
                className="bg-sky-100 rounded-xl px-6 py-2 shadow-xl text-black focus:outline-none"
                defaultValue={meetupData.title}
                onChange={titleChangeHandler}
              />
            </>
          ) : (
            <div className="px-6 py-2">{meetupData.title}</div>
          )}
          {editState.editTitle ? (
            <div className="flex space-x-5">
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() =>
                  setEditState((prevState) => {
                    return { ...prevState, editTitle: false };
                  })
                }
              >
                Cancel
              </span>
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => editTitleConfirmHandler(true)}
              >
                Confirm
              </span>
            </div>
          ) : (
            <div
              className="text-blue-500 cursor-pointer flex justify-end w-2/5"
              onClick={() =>
                setEditState((prevState) => {
                  return { ...prevState, editTitle: true };
                })
              }
            >
              Edit
            </div>
          )}
        </div>{" "}
        <div className="text-base mb-2 flex space-x-4 items-center">
          <div className="text-xl font-semibold">Image:</div>
          {editState.editImage ? (
            <>
              <input
                type="text"
                className="bg-sky-100 rounded-xl px-6 py-2 shadow-xl text-black focus:outline-none"
                defaultValue={meetupData.image}
                onChange={imageChangeHandler}
              />
            </>
          ) : (
            <input className="px-6 py-2  " disabled defaultValue={meetupData.image}/>
          )}
          {editState.editImage ? (
            <div className="flex space-x-5">
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() =>
                  setEditState((prevState) => {
                    return { ...prevState, editImage: false };
                  })
                }
              >
                Cancel
              </span>
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => editImageConfirmHandler(true)}
              >
                Confirm
              </span>
            </div>
          ) : (
            <div
              className="text-blue-500 cursor-pointer flex justify-end w-2/5"
              onClick={() =>
                setEditState((prevState) => {
                  return { ...prevState, editImage: true };
                })
              }
            >
              Edit
            </div>
          )}
        </div>{" "}
        <div className="text-base mb-2 flex space-x-4 items-center">
          <div className="text-xl font-semibold">Description:</div>
          {editState.editDescription ? (
            <>
              <input
                type="text"
                className="bg-sky-100 rounded-xl px-6 py-2 shadow-xl text-black focus:outline-none"
                defaultValue={meetupData.description}
                onChange={descriptionChangeHandler}
              />
            </>
          ) : (
            <div className="px-6 py-2">{meetupData.description}</div>
          )}
          {editState.editDescription ? (
            <div className="flex space-x-5">
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() =>
                  setEditState((prevState) => {
                    return { ...prevState, editDescription: false };
                  })
                }
              >
                Cancel
              </span>
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => editDescriptionConfirmHandler(true)}
              >
                Confirm
              </span>
            </div>
          ) : (
            <div
              className="text-blue-500 cursor-pointer flex justify-end w-2/5"
              onClick={() =>
                setEditState((prevState) => {
                  return { ...prevState, editDescription: true };
                })
              }
            >
              Edit
            </div>
          )}
        </div>{" "}
        <div className="text-base mb-2 flex space-x-4 items-center">
          <div className="text-xl font-semibold">Address:</div>
          {editState.editAddress ? (
            <>
              <input
                type="text"
                className="bg-sky-100 rounded-xl px-6 py-2 shadow-xl text-black focus:outline-none"
                defaultValue={meetupData.address}
                onChange={addressChangeHandler}
              />
            </>
          ) : (
            <div className="px-6 py-2">{meetupData.address}</div>
          )}
          {editState.editAddress ? (
            <div className="flex space-x-5">
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() =>
                  setEditState((prevState) => {
                    return { ...prevState, editAddress: false };
                  })
                }
              >
                Cancel
              </span>
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => editAddressConfirmHandler(true)}
              >
                Confirm
              </span>
            </div>
          ) : (
            <div
              className="text-blue-500 cursor-pointer flex justify-end w-2/5"
              onClick={() =>
                setEditState((prevState) => {
                  return { ...prevState, editAddress: true };
                })
              }
            >
              Edit
            </div>
          )}
        </div>
        <div className="flex space-x-5 mt-12">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-xl transition-all duration-200"
            onClick={editMeetupHandler}
          >
            Edit Meetup
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-xl transition-all duration-200"
            onClick={deleteMeetupHandler}
          >
            Delete Meetup
          </button>
        </div>
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
