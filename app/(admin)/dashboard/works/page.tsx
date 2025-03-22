import Pagination from "app/components/admin/pagination";
import Search from "app/components/admin/search";
import Table from "app/components/admin/table";
import { CreateWork } from "app/components/admin/buttons";
import { Suspense } from "react";
import { fetchWorksPages } from "app/lib/data";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchWorksPages(query);

  return (
    <div className='md:w-2xl mb-5'>
      <div className='flex w-full items-center justify-between'>
        <h1 className='text-2xl'>Works</h1>
      </div>
      <div className='mt-4 flex items-center justify-between gap-2 md:mt-8'>
        <Search placeholder='Search works...' />
        <CreateWork />
      </div>

      <Table query={query} currentPage={currentPage} />

      <div className='mt-5 flex w-full justify-center'>
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
