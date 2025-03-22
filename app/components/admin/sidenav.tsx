import Link from "next/link";
import Image from "next/image";
import { Logo } from "../../icons";
import NavLinks from "../admin/nav-links";
import { PowerIcon } from "@heroicons/react/24/outline";
import { signOut } from "auth";

const navItems = {
  "/dashboard/works": {
    name: "works",
  },
  "/dashboard/about": {
    name: "profile",
  },
  "/dashboard/analysis": {
    name: "analysis",
  },
};

export function Navbar() {
  return (
    <div className='flex h-full flex-col px-3 py-4 md:px-2'>
      <div className='mb-2 flex h-15 items-end  p-4 md:h-20 border border-white '>
        <div className='w-32 text-white  md:w-40'>
          <Logo />
        </div>
      </div>
      <div className='flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2 '>
        <NavLinks />
        <div className='hidden h-auto w-full grow rounded-md  md:block'></div>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <button className='flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md  p-3 text-sm border border-dotted font-medium hover:bg-red-500  md:flex-none md:justify-start md:p-2 md:px-3'>
            <PowerIcon className='w-6' />
            <div className='hidden md:block'>Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
