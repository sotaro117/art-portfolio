import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
};

export default function About() {
  return (
    <div className='lg:flex'>
      <Image
        className='mr-10 rounded-full'
        src='/user-img.jpg'
        height={600}
        width={400}
        alt='work01'
      />
      <div className='p-5'>
        <h2 className='mb-4 text-2xl'>Artist name or slogan idk</h2>
        <p>
          Dummy presentation: "Lorem ipsum dolor sit amet, consectetur
          adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
          irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
          fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
          sunt in culpa qui officia deserunt mollit anim id est laborum."
        </p>
      </div>
    </div>
  );
}
