import Link from 'next/link';

export default function Layout(props) {
  return (
    <>
    
      <div className="h-[5rem] w-full text-white bg-sky-600 flex justify-between items-center text-xl md:text-2xl  font-bold gap-10 px-[2.5rem]">
        <p className="">Meetup</p>
        <div className="flex flex-row gap-10">
          <Link className="" href="/">
            Home
          </Link>
          <Link className="" href="/new-meetup">
            New Meetup
          </Link>
          
        </div>
      </div>
      <div>{props.children}</div>
    </>
  );
}
