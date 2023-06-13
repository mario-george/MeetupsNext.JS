import { useRouter } from "next/router";
import { useRef, useState } from "react";
import {
  Card,
  CardHeader,
  Checkbox,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { BanknotesIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
function AddMeetup({ props }) {
  const {
    titleRef,
    titleError,
    imageRef,
    imageError,
    addressRef,
    addressError,
    descriptionError,
    descriptionRef,submitHandler
  } = props;
  console.log(props);
  return (
    <Card className="w-3/4 mx-auto">
      <CardHeader
        floated={false}
        shadow={false}
        color="light-blue"
        className=" rounded-md p-4"
      >
        <div className="flex items-center space-x-5 ">
          <PlusCircleIcon color="" className="h-10 w-10" />
          <Typography variant="h3">Add a Meetup</Typography>
        </div>
      </CardHeader>
      <CardHeader floated={false} shadow={false}>
        <div className="flex  justify-start items-center rounded-xl border border-white/10 bg-white/10  shadow-xl mx-auto  p-2">
          <form
            onSubmit={submitHandler}
            className="flex w-full space-y-7 flex-col font-bold"
          >
            <Input
              variant="standard"
              label="Meetup Title"
              inputRef={titleRef}
              error={titleError}
              size="lg"
            />
            <Input
              variant="standard"
              label="Meetup Image"
              inputRef={imageRef}
              error={imageError}
            />
            <Input
              variant="standard"
              label="Meetup Address"
              inputRef={addressRef}
              error={addressError}
            />
            <Textarea
              variant="outline"
              label="Description"
              ref={descriptionRef}
              error={descriptionError}
            />

            <div className="flex flex-col w-full gap-6">
              <Button color="blue" size="lg" type="submit">
                Add Meetup
              </Button>

              <div></div>
            </div>
          </form>
        </div>
      </CardHeader>
    </Card>
  );
}
export default function NewMeetup() {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const addressRef = useRef();
  const imageRef = useRef();
  const router = useRouter();
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [imageError, setImageError] = useState("");

  async function submitHandler(event) {
    event.preventDefault();
    const title = titleRef.current.value;
    const description = descriptionRef.current.children[0].value;
    const address = addressRef.current.value;
    const image = imageRef.current.value;
    let invalid = false;
    if (title.trim() === "") {
      setTitleError("Title is required");
      invalid = true;
    } else {
      setTitleError("");
    }

    if (description.trim() === "") {
      setDescriptionError("Description is required");
      invalid = true;
    } else {
      setDescriptionError("");
    }

    if (address.trim() === "") {
      setAddressError("Address is required");
      invalid = true;
    } else {
      setAddressError("");
    }

    if (image.trim() === "") {
      setImageError("Image is required");
      invalid = true;
    } else {
      setImageError("");
    }
    if (invalid) {
      return;
    }
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify({ title, description, image, address }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    console.log(data);
    router.push("/");
    //  router.replace('/') if you want to cancel the ability to go back
  }

  return (
    <>
      <AddMeetup
        props={{
          titleRef,
          titleError,
          imageRef,
          imageError,
          addressRef,
          addressError,
          descriptionError,
          descriptionRef,submitHandler
        }}
      />
    </>
  );
}
