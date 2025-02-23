import Link from "next/link";
import Image from "next/image";

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
  "/nfts": {
    name: "NFTs",
  },
};

export function Navbar() {
  return (
    <aside className='mb-10 tracking-tight'>
      <div className='flex justify-center lg:sticky lg:top-20 pb-3 border-b-2 border-solid border-b-white-100 hover:border-red-400'>
        <nav
          className='flex flex-col relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative'
          id='nav'
        >
          <Image
            src='/dummy-logo.jpg'
            width={100}
            height={80}
            className='mb-5 block mx-auto'
            alt='Logo'
          />
          <div className='flex flex-row space-x-0'>
            {Object.entries(navItems).map(([path, { name }]) => {
              return (
                <Link
                  key={path}
                  href={path}
                  className='transition-all hover:text-red-500 dark:hover:text-dark-300 flex align-middle relative py-1 px-2 m-1'
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
