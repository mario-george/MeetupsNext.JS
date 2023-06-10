import Link from "next/link";

const Meetup = (props) => {
  const { id, title, description, image } = props.m;
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
      <div
        key={id}
        className="flex  my-10 justify-start items-center border-2 p-8 shadow-xl rounded-2xl border-blue-500 mx-auto 
        w-full xl:w-[55%] md:w-[80%] p-2"
      >
        <div className="flex w-full gap-3 flex-col">
          <div className="h-[30rem] w-full ">
            <img
              src={image}
              className="w-full h-full rounded-xl "
              alt="image"
            />
          </div>
          <div className="title">{title}</div>
          <div className=" text-xl my-3">{description}</div>
          <div className="flex space-x-5 justify-center">
            <Link href={id}>
              <a>
                <button className="shadow-xl rounded-2xl transition-all duration-200 bg-blue-500 hover:bg-blue-700 w-64 py-2 border-2 border-black text-white border-blue-500 font-semibold mt-2 mb-6 text-2xl">
                  Show Details
                </button>
              </a>
            </Link>

            <button
              onClick={deleteMeetupHandler}
              className="shadow-xl text-2xl rounded-2xl transiton-all duration-200 bg-red-500 hover:bg-red-700 w-64 py-2 border-2 border-black text-white border-red-500 font-semibold mt-2 mb-6"
            >
              <span className="text-white">Delete Meetup</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Meetup;
