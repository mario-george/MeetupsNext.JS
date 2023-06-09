import Link from "next/link";

const Meetup = (props) => {
  const { id, title, description, image } = props.m;
  return (
    <>
      <div
        key={id}
        className="flex  my-10 justify-start items-center border-2 mx-auto w-1/2 p-2"
      >
        <div className="flex w-full gap-3 flex-col font-bold">
          <div className="h-[30rem] w-full ">
            <img
              src={image}
              className="w-full h-full  "
              alt="image"
            />
          </div>
          <div className="title">{title}</div>
          <div className="description">{description}</div>
          <Link href={id}>Show Details</Link>
        </div>
      </div>
    </>
  );
};
export default Meetup;
