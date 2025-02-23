import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <section>
      <div className='grid gap-7 lg:grid-cols-3 md:grid-cols-2 grid-cols-1'>
        <Link href='works/1' className='mb-10'>
          <Image
            className='mb-3 transition delay-50 duration-300 ease-in-out hover:scale-105'
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
    </section>
  );
}
