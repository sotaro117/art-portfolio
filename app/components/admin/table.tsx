import Image from "next/image";
import { UpdateWork, DeleteWork } from "./buttons";
// import { formatDateToLocal, formatCurrency } from "@/app/lib/utils";
import { fetchFilteredWorks } from "app/lib/data";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "firebase-config";
import { Works } from "app/lib/definitions";
import { formatDateToLocal } from "app/lib/utils";
// import { fetchFilteredInvoices } from '@/app/lib/data';

async function ShowImage({ work }: { work: Works }) {
  const listRef = ref(storage, work.image_url);
  const image = await getDownloadURL(listRef);

  return (
    <Image
      src={image}
      className='mr-2'
      width={50}
      height={50}
      alt={`${work.title}'s profile picture`}
    />
  );
}
export default async function WorkTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const works = await fetchFilteredWorks(query, currentPage);

  return (
    <div className='mt-6 flow-root'>
      <div className='inline-block min-w-full align-middle'>
        <div className='rounded-lg  p-2 md:pt-0'>
          <div className='md:hidden'>
            {works?.map((work) => (
              <div
                key={work.id}
                className='mb-2 w-full rounded-md text-white p-4'
              >
                <div className='flex items-center justify-between border-b pb-4'>
                  <div>
                    <div className='mb-2 flex items-center'>
                      <ShowImage work={work} />
                      <p>{work.title}</p>
                    </div>
                  </div>
                </div>
                <div className='flex w-full items-center justify-between pt-4'>
                  <div>
                    <p>{formatDateToLocal(work.date)}</p>
                  </div>
                  <div className='flex justify-end gap-2'>
                    <UpdateWork id={work.id} />
                    <DeleteWork work={work} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='hidden md:table'>
            <table className='min-w-full text-white '>
              <thead className='rounded-lg text-left text-sm font-normal'>
                <tr>
                  <th scope='col' className='px-4 py-5 font-medium sm:pl-6'>
                    Title
                  </th>
                  <th scope='col' className='px-3 py-5 font-medium'>
                    Date
                  </th>
                  <th scope='col' className='relative py-3 pl-6 pr-3'>
                    <span className='sr-only'>Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className=''>
                {works?.map((work) => (
                  <tr
                    key={work.id}
                    className='w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg'
                  >
                    <td className='whitespace-nowrap py-3 pl-6 pr-3'>
                      <div className='flex items-center gap-3'>
                        <ShowImage work={work} />
                        <p>{work.title}</p>
                      </div>
                    </td>
                    <td className='whitespace-nowrap px-3 py-3'>
                      {formatDateToLocal(work.date)}
                    </td>
                    <td className='whitespace-nowrap py-3 pl-6 pr-3'>
                      <div className='flex justify-end gap-3'>
                        <UpdateWork id={work.id} />
                        <DeleteWork work={work} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
