import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";

export default function PaginationArrow({
  direction,
  isDisabled,
}: {
  direction: "left" | "right";
  isDisabled?: boolean;
}) {
  const className = clsx(
    "flex h-10 w-10 items-center justify-center rounded-md border",
    {
      "pointer-events-none text-gray-300": isDisabled,
      "hover:bg-gray-100": !isDisabled,
      "mr-2 md:mr-4": direction === "left",
      "ml-2 md:ml-4": direction === "right",
    }
  );

  const icon =
    direction === "left" ? (
      <ArrowLeftIcon className='w-4' />
    ) : (
      <ArrowRightIcon className='w-4' />
    );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <div className={className}>{icon}</div>
  );
}
