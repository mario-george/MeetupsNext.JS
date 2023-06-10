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
        className="flex  my-10 justify-start items-center border-2 mx-auto w-1/2 p-2"
      >
        <div className="flex w-full gap-3 flex-col font-bold">
          <div className="h-[30rem] w-full ">
            <img src={image} className="w-full h-full  " alt="image" />
          </div>
          <div className="title">{title}</div>
          <div className="description">{description}</div>
          <div className="flex space-x-5">
            <Link href={id}>
              <a>
                <button className="shadow-xl rounded-2xl transition-all duration-200 bg-blue-500 hover:bg-blue-700 w-32 py-2 border-2 border-black text-white border-blue-500 font-semibold mt-2 mb-6">
                  Show Details
                </button>
              </a>
            </Link>

            <button
              onClick={deleteMeetupHandler}
              className="shadow-xl rounded-2xl transiton-all duration-200 bg-red-500 hover:bg-red-700 w-32 py-2 border-2 border-black text-white border-red-500 font-semibold mt-2 mb-6"
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
