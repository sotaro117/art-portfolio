import postgres from "postgres";
import { Works } from "./definitions";

const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: "require",
});

export async function fetchWorks() {
  try {
    const data = await sql<Works[]>`SELECT * FROM works`;

    return data;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch works data.");
  }
}

export async function fetchWorksById(id: string) {
  try {
    const data = await sql<Works[]>`
      SELECT 
        works.id,
        works.title,
        works.date,
        works.image_url
      FROM works
      WHERE works.id = ${id};
    `;
    return data[0];
  } catch (err) {
    console.error("Database error: ", err);
    throw new Error("Failed to get a work with the corresponding title");
  }
}

export async function fetchNextWorkId(id: string) {
  try {
    const data = await sql<Works[]>`
      SELECT id, title
      FROM works
      WHERE date > (SELECT date FROM works WHERE id = ${id})
         OR (date = (SELECT date FROM works WHERE id = ${id}) AND id > ${id})
      ORDER BY date ASC, id ASC
      LIMIT 1;
    `;

    return data[0] || null; // Return next UUID or null if none
  } catch (err) {
    console.error("Database error: ", err);
    throw new Error("Failed to get next work ID");
  }
}

export async function fetchPrevWorkId(id: string) {
  try {
    const data = await sql<Works[]>`
      SELECT id, title
      FROM works
      WHERE date < (SELECT date FROM works WHERE id = ${id})
         OR (date = (SELECT date FROM works WHERE id = ${id}) AND id < ${id})
      ORDER BY date DESC, id DESC
      LIMIT 1;
    `;

    return data[0] || null; // Return next UUID or null if none
  } catch (err) {
    console.error("Database error: ", err);
    throw new Error("Failed to get next work ID");
  }
}

const ITEMS_PER_PAGE = 15;
export async function fetchFilteredWorks(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const data = await sql<Works[]>`
    SELECT
      works.id,
      works.title,
      works.date,
      works.image_url
    FROM works
    WHERE
      works.title ILIKE ${`%${query}%`}
    ORDER BY works.date DESC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
  `;

    return data;
  } catch (err) {
    console.error("Database error: ", err);
    throw new Error("Failed to fetch works");
  }
}

export async function fetchWorksPages(query: string) {
  try {
    const data = await sql`
    SELECT COUNT(*)
    FROM works
    WHERE
      works.title ILIKE ${`%${query}%`}
    `;

    const totalPage = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPage;
  } catch (err) {
    console.error("Database error: ", err);
    throw new Error("Failed to fetch the number of works");
  }
}
