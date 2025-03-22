import Link from "next/link";
import { fetchWorks } from "app/lib/data";
import ShowImage from "app/components/show-image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Works",
};

export default async function Works() {
  const works = await fetchWorks();

  return (
    <>
      <div className='grid gap-7 lg:grid-cols-3 md:grid-cols-2 grid-cols-1'>
        {works.map((work) => (
          <div key={work.id}>
            <Link href={`works/${work.id}`} className='mb-10 '>
              <ShowImage work={work} />
            </Link>
            <p>{work.title}</p>
          </div>
        ))}
      </div>
    </>
  );
}
