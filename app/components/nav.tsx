import Link from "next/link";
import Image from "next/image";
import { IgIcon } from "./icon";

const navItems = {
  "/contact": {
    name: "contact",
  },
  "/works": {
    name: "works",
  },
  "/about": {
    name: "about",
  },
};

export function Navbar() {
  return (
    <aside className='mb-10 tracking-tight'>
      <div className='flex justify-center lg:sticky lg:top-20 pb-3 border-b-2 border-solid border-b-white-100 hover:border-red-400'>
        <div className='absolute right-0 mr-5'>
          <IgIcon />
        </div>
        <nav
          className='flex flex-col relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative'
          id='nav'
        >
          <Link href={"/"}>
            <Image
              src='/logo.png'
              width={100}
              height={80}
              className='mb-5 block mx-auto'
              alt='Logo'
            />
          </Link>
          <div className='flex flex-row space-x-0'>
            {Object.entries(navItems).map(([path, { name }]) => {
              let href = path;
              {
                name === "contact"
                  ? (href = "mailto:dummy@gmail.com")
                  : (href = path);
              }
              return (
                <Link
                  key={path}
                  href={href}
                  className='transition-all  dark:hover:text-dark-300 flex align-middle relative py-1 px-2 m-1 delay-50 duration-100 hover:border-b-2 hover:border-white hover:text-red-500'
                >
                  {name}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </aside>
  );
}
