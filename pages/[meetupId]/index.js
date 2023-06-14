import { MongoClient } from "mongodb";
import { ObjectId } from "bson";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  Input,
  Textarea as CustomTextArea,
  Button,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
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
    router.push('/')
  };
  const editMeetupHandler = async () => {
    const resp = await fetch("/api/editMeetup", {
      body: JSON.stringify({
        _id: id,
        title: meetupData.title,
        description: meetupData.description,
        image: meetupData.image,
        address: meetupData.address,
      }),
      headers: { "Content-Type": "application/json" },
      method: "PATCH",
    });
    const data = await resp.json();
    console.log(data);

    router.push("/");
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
    console.log(meetupData);
    console.log(cached);
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
    console.log(event.target.value);
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
      <Card  floated={false} className="shadow-xl w-full md:w-1/2 mx-auto ">
        <CardHeader  color="blue-gray" floated={false} className="">
        <img src={meetupData.image} className="w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-black/60 w-full h-full"/>
        </CardHeader>
        <CardBody className="mx-auto w-full  flex flex-col space-y-3">

        <div className="text-base mb-2 flex space-x-4 items-center mt-4">
          <div className="text-xl font-semibold">Title:</div>
          {editState.editTitle ? (
            <>
              <Input
                variant="outline"
                label="Title"
                defaultValue={meetupData.title}
                onChange={titleChangeHandler}
              />
            </>
          ) : (
            <Input
              variant="outline"
              label="Title"
              value={meetupData.title}
              disabled={!editState.editTitle}
            />
          )}
          {editState.editTitle ? (
            <div className="flex space-x-5 !text-sm">
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
              className="text-blue-500 cursor-pointer flex justify-end "
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
              <CustomTextArea
                rows="2"
                defaultValue={meetupData.image}
                onChange={imageChangeHandler}
                label="Image"
              />
            </>
          ) : (
            <Input
              variant="outline"
              label="Title"
              value={meetupData.image}
              disabled
            />
          )}
          {editState.editImage ? (
            <div className="flex space-x-5 !text-sm">
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
              className="text-blue-500 cursor-pointer flex justify-end "
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
          <div className="font-bold ">Description:</div>
          {editState.editDescription ? (
            <>
              <CustomTextArea
                defaultValue={meetupData.description}
                onChange={descriptionChangeHandler}
                label="Image"
              />
            </>
          ) : (
            <CustomTextArea
              variant="outline"
              label="Title"
              value={meetupData.description}
              size="lg"
              className="w-full"
              disabled
            />
          )}
          {editState.editDescription ? (
            <div className="flex space-x-5 !text-sm">
              <span
                className="text-blue-500 cursor-pointer "
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
              className="text-blue-500 cursor-pointer flex justify-end "
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
              <Input
                variant="outline"
                label="Address"
                defaultValue={meetupData.address}
                onChange={addressChangeHandler}
              />
            </>
          ) : (
            <Input
              variant="outline"
              label="Address"
              value={meetupData.address}
              disabled
            />
          )}
          {editState.editAddress ? (
            <div className="flex space-x-5 !text-sm">
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
              className="text-blue-500 cursor-pointer flex justify-end "
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
        <div className="flex flex-col space-y-3 mt-6 justify-center">
          <Button
            size="md"
            className="text-md"
            type="submit"
            color="light-blue"
            onClick={editMeetupHandler}
            fullWidth
          >
            Submit Edit
          </Button>
          <Button
            size="md"
            color="red"
            className="text-md"
            onClick={deleteMeetupHandler}
            fullWidth
          >
            Delete Meetup
          </Button>
        </div>
        </CardBody>
      </Card>
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
  const meetup = await meetupCollections.findOne({ _id: new ObjectId(id) });

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
