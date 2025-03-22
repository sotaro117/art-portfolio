import { Works } from "app/lib/definitions";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "firebase-config";
import Image from "next/image";

export default async function ShowImage({ work }: { work: Works }) {
  const listRef = ref(storage, work.image_url);
  const image = await getDownloadURL(listRef);

  return (
    <Image
      className='mb-3 transition delay-150 duration-300 border-2 hover:border-white'
      src={image}
      height={700}
      width={400}
      alt={`work: ${work.title}`}
    />
  );
}
