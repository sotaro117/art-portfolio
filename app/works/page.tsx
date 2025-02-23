import Image from "next/image";
import Link from "next/link";

export default function works() {
  return (
    <>
      <div className='grid grid-cols-3 gap-7'>
        <Link href='works/1' className='mb-10'>
          <Image
            className='mb-3'
            src='/img01.png'
            height={700}
            width={400}
            alt='work01'
          />
          <p>title</p>
          <p className='text-sm'>sub caption</p>
        </Link>

        <div className='mb-10'>
          <Image
            className='mb-3'
            src='/img02.png'
            height={700}
            width={400}
            alt='work02'
          />
          <p>title</p>
          <p className='text-sm'>sub caption</p>
        </div>

        <Image src='/img01.png' height={700} width={400} alt='work01' />
        <Image src='/img02.png' height={700} width={400} alt='work02' />
        <Image src='/img01.png' height={700} width={400} alt='work01' />
        <Image src='/img02.png' height={700} width={400} alt='work02' />
        <Image src='/img01.png' height={700} width={400} alt='work01' />
        <Image src='/img02.png' height={700} width={400} alt='work02' />
        <Image src='/img01.png' height={700} width={400} alt='work01' />
        <Image src='/img02.png' height={700} width={400} alt='work02' />
      </div>
    </>
  );
}
