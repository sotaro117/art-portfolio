"use client";

import { Works } from "app/lib/definitions";
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "../button";
import { State, updateWork } from "app/lib/actions";
// @ts-ignore
import { useActionState, useState } from "react";

export default function EditForm({ work }: { work: Works }) {
  const initialState: State = { message: null, errors: {} };
  // Instead, you can pass id to the Server Action using JS bind.
  // This will ensure that any values passed to the Server Action are encoded.
  const updateWorkById = updateWork.bind(null, work.id);
  const [state, formAction] = useActionState(updateWorkById, initialState);
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = (formData: FormData) => {
    if (image) formData.set("image", image);
    formAction(formData);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setImage(file);
  };

  return (
    <form action={handleSubmit}>
      <div className='rounded-md  p-4 md:p-6'>
        {/* Work title */}
        <div className='mb-4'>
          <label htmlFor='customer' className='mb-2 block text-sm font-medium'>
            Edit title
          </label>
          <div className='relative'>
            <input
              id='title'
              name='title'
              type='text'
              placeholder={work.title}
              className='peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
            />
            <UserCircleIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500' />
          </div>
          <div id='title-error' aria-live='polite' aria-atomic='true'>
            {state.errors?.title &&
              state.errors.title.map((error: string) => (
                <p className='mt-2 text-sm text-red-500' key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Work image */}
        <div className='mb-4'>
          <label htmlFor='image' className='mb-2 block text-sm font-medium'>
            Edit image
          </label>
          <div className='relative mt-2 rounded-md'>
            <div className='relative'>
              <input
                id='image'
                name='image'
                type='file'
                placeholder='Choose image'
                className='peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
                onChange={handleFileChange}
              />
              <ClockIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
            </div>
            <div id='image-error' aria-live='polite' aria-atomic='true'>
              {state.errors?.image_url &&
                state.errors.image_url.map((error: string) => (
                  <p className='mt-2 text-sm text-red-500' key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className='mt-6 flex justify-end gap-4'>
        <Link
          href='/dashboard/works'
          className='flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200'
        >
          Cancel
        </Link>
        <Button type='submit'>Edit</Button>
      </div>
    </form>
  );
}
