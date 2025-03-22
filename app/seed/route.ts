import bcrypt from "bcryptjs";
import postgres from "postgres";
import { admin, works } from "app/lib/placeholder-data";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function seedAdmin() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS admin (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  const insertedAdmin = await Promise.all(
    admin.map(async (admin) => {
      const hashedPassword = await bcrypt.hash(admin.password, 10);
      return sql`
        INSERT INTO admin (id, name, email, password)
        VALUES (${admin.id}, ${admin.name}, ${admin.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedAdmin;
}

async function seedWorks() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS works (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      date DATE NOT NULL,
      image_url VARCHAR(255) NOT NULL
    );
  `;

  /* Store binary for image
    await sql`
    CREATE TABLE works (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      date DATE NOT NULL,
      image BYTEA NOT NULL
    );
  `;
  */

  const insertedWorks = await Promise.all(
    works.map(async (work) => {
      return sql`
        INSERT INTO works (id, title, date, image_url)
        VALUES (${work.id}, ${work.title}, ${work.date}, ${work.image_url})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedWorks;
}

export async function GET() {
  try {
    const result = await sql.begin((sql) => {
      seedAdmin();
      seedWorks();
    });
    return Response.json({ message: "Database seeded successfully" });
  } catch (err) {
    return Response.json({ err }, { status: 500 });
  }
}
