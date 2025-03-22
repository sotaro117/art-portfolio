import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { inconsolata } from "./components/fonts";
import { InstagramLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export function Logo() {
  return (
    <div
      className={`${inconsolata.className} flex flex-row items-center leading-none text-white`}
    >
      <p className='text-3xl'>Dashboard</p>
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

export default Logo;
