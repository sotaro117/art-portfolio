import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { InstagramLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function Logo() {
  return (
    <div
      className={`${GeistMono.variable} flex flex-row items-center leading-none text-white`}
    >
      <p className='text-[30px]'>Dashboard</p>
    </div>
  );
}

export function IgIcon() {
  return (
    <Link href={"https://www.instagram.com/"}>
      <InstagramLogoIcon className='w-8 h-8 transition delay-150 duration-300 hover:text-pink-600' />
    </Link>
  );
}
