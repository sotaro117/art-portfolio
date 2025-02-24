import Image from "next/image";
import clsx from "clsx";

export default function VerticalSlider({ isReverse }: { isReverse: boolean }) {
  const images = ["/img01.png", "/img02.png"];

  return (
    <div className='relative w-[400px] h-screen overflow-hidden'>
      <div
        className={clsx("flex flex-col gap-4", {
          "animate-vertical-slide": !isReverse,
          "animate-vertical-slide-reverse": isReverse,
        })}
      >
        {images.concat(images).map((src, index) => (
          <Image
            key={index}
            className='w-full h-auto'
            src={src}
            width={400}
            height={700}
            alt={`Image ${index}`}
          />
        ))}
      </div>
    </div>
  );
}
