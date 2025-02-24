import Image from "next/image";
import Link from "next/link";

export default function works() {
  const images = ["/img01.png", "/img02.png"];

  return (
    <>
      <div className='grid gap-7 lg:grid-cols-3 md:grid-cols-2 grid-cols-1'>
        {images.map((image, idx) => (
          <div key={idx}>
            <Link href={`works/${idx}`} className='mb-10'>
              <Image
                className='mb-3'
                src={image}
                height={700}
                width={400}
                alt={`work${idx}`}
              />
            </Link>
            <p>title</p>
            <p className='text-sm'>sub caption</p>
          </div>
        ))}
      </div>
    </>
  );
}
