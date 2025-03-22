import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { deleteWork } from "app/lib/actions";
import { Works } from "app/lib/definitions";

export function CreateWork() {
  return (
    <Link
      href='/dashboard/works/create'
      className='flex h-10 items-center rounded-lg bg-red-600 px-4 text-sm font-medium text-white transition-colors hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600'
    >
      <span className='hidden md:block'>Create Work</span>{" "}
      <PlusIcon className='h-5 md:ml-4' />
    </Link>
  );
}

export function UpdateWork({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/works/edit/${id}`}
      className='rounded-md border p-2 hover:bg-red-500
      '
    >
      <PencilIcon className='w-5' />
    </Link>
  );
}

export function DeleteWork({ work }: { work: Works }) {
  const deleteWorkWithId = deleteWork.bind(null, work);

  return (
    <form action={deleteWorkWithId}>
      <button type='submit' className='rounded-md border p-2 hover:bg-red-500'>
        <span className='sr-only'>Delete</span>
        <TrashIcon className='w-5' />
      </button>
    </form>
  );
}
