import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function listWorks() {
  const data = await sql`
    SELECT title, date, image_url FROM works;
  `;

  return data;
}

export async function GET() {
  try {
    return Response.json(await listWorks());
  } catch (err) {
    return Response.json({ err }, { status: 500 });
  }
}
