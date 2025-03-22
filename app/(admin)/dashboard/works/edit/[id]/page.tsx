import Form from "app/components/admin/edit-form";
import { fetchWorksById } from "app/lib/data";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const work = await fetchWorksById(id);

  return (
    <main>
      <Form work={work} />
    </main>
  );
}
