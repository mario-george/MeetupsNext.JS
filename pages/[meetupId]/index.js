import { MongoClient } from "mongodb";
import { ObjectId } from "bson";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

import {
  Input,
  Textarea as CustomTextArea,
  Button,
  Card,
  CardHeader,
  CardBody,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Dialog,
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
  const handleImageError = (event) => {
    event.target.style.display = 'none'; 
  };
  const [isValidImage, setIsValidImage] = useState(true);

  useEffect(() => {
    const image = new Image();
    image.src = meetupData.image;
    image.onload = () => {
      setIsValidImage(true);
    };
    image.onerror = () => {
      setIsValidImage(false);
    };
  }, [meetupData.image]);
  
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
    router.push("/");
  };
  const [deleteModal, setDeleteModal] = useState(false);
  const handleDeleteModal = () => {
    setDeleteModal(!deleteModal);
  };
  const [editModal, setEditModal] = useState(false);
  const handleEditModal = () => {
    setEditModal(!editModal);
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
      <Card floated={false} className="shadow-xl w-full md:w-1/2 mx-auto ">
        <CardHeader color="blue-gray" floated={false} className="">
          <img
            src={meetupData.image}
            className="w-full h-[25rem]"
            onError={handleImageError}
          />

          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-black/60 w-full h-full" />
            {!isValidImage && <FontAwesomeIcon icon={faImage} size="10x" className="text-white mx-auto flex justify-center" />} 
        </CardHeader>
        <CardBody className="mx-auto w-full flex flex-col space-y-3">
          <div className="text-base mb-2 flex space-x-4 items-center mt-4">
            <div className="text-xl ">Title:</div>
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
            <div className="text-xl ">Image:</div>
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
            <div className=" ">Description:</div>
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
            <div className="text-xl ">Address:</div>
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
              onClick={handleEditModal}
              fullWidth
            >
              Submit Edit
            </Button>
            <Button
              size="md"
              color="red"
              className="text-md"
              onClick={handleDeleteModal}
              fullWidth
            >
              Delete Meetup
            </Button>

            <Dialog open={deleteModal} handler={handleDeleteModal}>
              <DialogHeader>Delete Meetup</DialogHeader>
              <DialogBody divider>
                Are you sure you want to delete this meetup the data of this
                meetup cann't be restored after deletion.
              </DialogBody>
              <DialogFooter>
                <Button
                  variant="text"
                  color="red"
                  onClick={handleDeleteModal}
                  className="mr-1"
                >
                  <span>Cancel</span>
                </Button>
                <Button color="green" onClick={deleteMeetupHandler}>
                  <span>Confirm</span>
                </Button>
              </DialogFooter>
            </Dialog>
            <Dialog open={editModal} handler={handleEditModal}>
              <DialogHeader>Submit Edit</DialogHeader>
              <DialogBody divider>
                Do you want to submit the edit of the meetup.{" "}
              </DialogBody>
              <DialogFooter>
                <Button
                  variant="text"
                  color="red"
                  onClick={handleEditModal}
                  className="mr-1"
                >
                  <span>Cancel</span>
                </Button>
                <Button color="green" onClick={editMeetupHandler}>
                  <span>Confirm</span>
                </Button>
              </DialogFooter>
            </Dialog>
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

/* export async function getStaticPaths() {
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
    fallback: "blocking", // Make the fallback behavior blocking

    // fallback: false,
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
} */
export async function getServerSideProps(context) {
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
  };
}
