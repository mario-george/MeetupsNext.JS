import Link from "next/link";

export default function Layout(props) {
  return (
    <>
      <div className="h-[5rem] w-full text-white bg-blue-500 text-3xl flex justify-between items-center text-xl md:text-3xl  font-bold gap-10 px-[2.5rem]">
        <p className="">Meetup</p>
        <div className="flex flex-row space-x-16">
          <div className="group">
            <Link className="" href="/">
              <a>
                <button className="group-hover:text-green-300">Home</button>
              </a>
            </Link>
          </div>
          <div className="group">
            <Link className="" href="/new-meetup">
              <a>
                <button className="group-hover:text-green-300">
                  New Meetup
                </button>
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div>{props.children}</div>
    </>
  );
}
