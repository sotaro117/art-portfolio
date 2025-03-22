import Image from "next/image";
import clsx from "clsx";
import { Works } from "app/lib/definitions";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "firebase-config";
import { fetchWorks } from "app/lib/data";
import ShowImage from "./show-image";

export default async function VerticalSlider({
  isReverse,
}: {
  isReverse: boolean;
}) {
  const works = await fetchWorks();

  return (
    <div className='lg:w-[400px] h-screen overflow-hidden'>
      <div
        className={clsx("flex flex-col gap-4", {
          "animate-vertical-slide": !isReverse,
          "animate-vertical-slide-reverse": isReverse,
        })}
      >
        {works.concat(works).map((work, index) => (
          <ShowImage key={index} work={work} />
        ))}
      </div>
    </div>
  );
}
