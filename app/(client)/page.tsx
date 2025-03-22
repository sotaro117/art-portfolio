import Image from "next/image";
import Link from "next/link";
import VerticalSlider from "../components/slider";

export default function Page() {
  return (
    <section>
      <div className='grid gap-7 lg:grid-cols-3 md:grid-cols-2 grid-cols-1'>
        <div className=''>
          <VerticalSlider isReverse={false} />
        </div>
        <div>
          <VerticalSlider isReverse={true} />
        </div>
        <div className='md:hidden lg:block'>
          <VerticalSlider isReverse={false} />
        </div>
      </div>
    </section>
  );
}
