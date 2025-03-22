import { fetchNextWorkId, fetchPrevWorkId, fetchWorksById } from "app/lib/data";
import ShowImage from "app/components/show-image";
import PaginationArrow from "app/components/pagination-arrow";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { Metadata, ResolvingMetadata } from "next";
import { CreativeWork, WithContext } from "schema-dts";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const { id } = await params;

  // fetch data
  const work = await fetchWorksById(id);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: work.title,
    openGraph: {
      images: [`${work.image_url}`, ...previousImages],
    },
  };
}

export default async function Work(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const work = await fetchWorksById(id);
  const nextWork = await fetchNextWorkId(id);
  const prevWork = await fetchPrevWorkId(id);

  const jsonLd: WithContext<CreativeWork> = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${work.title}`,
    image: `${work.image_url}`,
    description: "Portfolio for artists",
    creator: "Your name",
  };

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div key={id} className='p-5'>
        <div className='flex justify-center'>
          <ShowImage work={work} />
        </div>
        <div className='flex flex-col md:w-2xl justify-self-center'>
          <h2 className='mb-4 text-2xl self-start'>{work.title}</h2>
          <p className='self-center'>
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. "
          </p>
        </div>
        <div className='flex justify-between w-full mt-5'>
          {prevWork === null ? (
            <div>
              <PaginationArrow isDisabled={true} direction='left' />
            </div>
          ) : (
            <div>
              <Link href={`/works/${prevWork?.id}`}>
                <PaginationArrow direction='left' />
              </Link>
            </div>
          )}
          {nextWork === null ? (
            <div>
              <PaginationArrow isDisabled={true} direction='right' />
            </div>
          ) : (
            <div>
              <Link href={`/works/${nextWork?.id}`}>
                <PaginationArrow direction='right' />
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
