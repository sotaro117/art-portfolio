import Image from "next/image";

export default function work() {
  return (
    <>
      <div>
        <Image
          className='mx-auto mb-5'
          src='/img01.png'
          height={700}
          width={400}
          alt='work01'
        />
        <h2 className='mb-4 text-2xl'>
          The standard Lorem Ipsum passage, used since the 1500s
        </h2>
        <p>
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum."
        </p>
      </div>
    </>
  );
}
