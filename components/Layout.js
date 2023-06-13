import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Card,
} from "@material-tailwind/react";

const navList = (
  <ul className="mb-4 text-white mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
    <Typography as="li" variant="lg" color="white" className="p-1 font-normal">
      <Link href="/">
        <a className="flex items-center ">Home</a>
      </Link>
    </Typography>
  </ul>
);
export default function Layout(props) {
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  return (
    <>
      <Navbar
        color="light-blue"
        className=" text-white sticky inset-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4"
      >
        <div className="flex items-center justify-between ">
          <Typography
            as="a"
            href="#"
            className="mr-4 cursor-pointer py-1.5 font-medium text-2xl tracking-wide"
          >
            Meetups{" "}
          </Typography>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>

            <Link href="/new-meetup">
              <a>
                <Button
                  variant="gradient"
                  size="lg"
                  className="hidden lg:inline-block "
                  color="blue-gray"
                >
                  <span className="text-white">New Meetup</span>
                </Button>
              </a>
            </Link>

            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <MobileNav open={openNav}>
          {navList}
            <Link href="/new-meetup">
          <Button variant="gradient" size="sm" fullWidth className="mb-2">
              <a>New meetup</a>
          </Button>
            </Link>
        </MobileNav>
      </Navbar>

      <div>{props.children}</div>
    </>
  );
}
