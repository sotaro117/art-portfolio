import Image from "next/image";
import Link from "next/link";
import VerticalSlider from "./components/slider";

export default function Page() {
  return (
    <section>
      <div className='grid gap-7 lg:grid-cols-3 md:grid-cols-2 grid-cols-1'>
        <VerticalSlider isReverse={false} />
        <VerticalSlider isReverse={true} />
        <VerticalSlider isReverse={false} />
      </div>
    </section>
  );
}
