import Link from "next/link";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

import { faImage } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Meetup = (props) => {
  function CustomCard({ title, address, description, image, id }) {
    const [isValidImage, setIsValidImage] = useState(true);

    useEffect(() => {
      const img = new Image();
      img.src = image;
      img.onload = () => {
        setIsValidImage(true);
      };
      img.onerror = () => {
        setIsValidImage(false);
      };
    }, [image]);
    const handleImageError = (event) => {
      event.target.style.display = "none";
    };
    return (
      <Card
        className=" shadow-lg  mx-auto 
      w-full xl:w-[55%] md:w-[80%]  border my-6"
      >
        <CardHeader floated={false} color="blue-gray">
          <img src={image} alt="image" onError={handleImageError} />
          <div className="absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
          {!isValidImage && (
            <FontAwesomeIcon
              icon={faImage}
              size="10x"
              className="text-white mx-auto flex justify-center"
            />
          )}
        </CardHeader>
        <CardBody>
          <div className="mb-3 flex items-center justify-between">
            <Typography
              variant="h2"
              color="blue-gray"
              className="font-bold text-lg md:text-xl"
            >
              {title}
            </Typography>
          </div>
          <Typography
            variant="h6"
            color="blue-gray"
            className="font-medium flex items-center space-x-3 text-lg md:text-xl "
          >
            <div>{address}</div>
          </Typography>
          <Typography
            variant="paragraph"
            color="gray"
            className="mt-5 text-md md:text-lg"
          >
            {description}
          </Typography>
        </CardBody>
        <CardFooter className="pt-3 flex flex-col space-y-3" divider>
          <Link href={id}>
            <a>
              <Button size="lg" className="text-lg" fullWidth>
                Show Details
              </Button>
            </a>
          </Link>
          {/* <Button size="lg" color="red" className="text-lg"    onClick={deleteMeetupHandler} fullWidth>
            Delete Meetup
          </Button> */}
        </CardFooter>
      </Card>
    );
  }
  const { id, title, description, image, address } = props.m;
  const deleteMeetupHandler = async () => {
    const resp = await fetch("/api/deleteMeetup", {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    const data = await resp.json();
  };
  return (
    <>
      <CustomCard
        image={image}
        description={description}
        title={title}
        address={address}
        id={id}
      />
    </>
  );
};
export default Meetup;
