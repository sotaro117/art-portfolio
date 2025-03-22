"use server";

import { signIn } from "auth";
import { AuthError } from "next-auth";
import { z } from "zod";
import postgres from "postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { deleteObject, ref, uploadBytes } from "firebase/storage";
import { storage } from "firebase-config";
import { Works } from "./definitions";

const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: "require",
});

const FormSchema = z.object({
  id: z.string(),
  title: z.string({ invalid_type_error: "Please enter title" }), // z.coerce.date()
  date: z.string(),
  image_url: z.string(),
  image: z.any({ invalid_type_error: "Please input image" }),
});

const CreateWorks = FormSchema.omit({ id: true, date: true, image_url: true });
const UpdateWork = FormSchema.omit({ id: true, date: true, image_url: true });

export type State = {
  errors?: {
    title?: string[];
    image_url?: string[];
  };
  message?: string | null;
};

// prevState: contains the state passed from the useActionState hook
export async function createWork(prevState: State, formData: FormData) {
  // validate the types
  const validatedFields = CreateWorks.safeParse({
    title: formData.get("title"),
    image: formData.get("image"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields. Failed to create work",
    };
  }

  const { title, image } = validatedFields.data;
  const date = new Date();
  const storageRef = ref(storage, image.name);

  try {
    uploadBytes(storageRef, image).then((snapshot) =>
      console.log("Uploaded an image")
    );
  } catch (err) {
    return { message: "Image Process Error: failed to upload image" };
  }

  try {
    await sql`
    INSERT INTO works (title, date, image_url)
    VALUES (${title}, ${date}, ${storageRef.fullPath})
    `;
  } catch (err) {
    return { message: "Database error: failed to create work" };
  }

  // The path will be revalidated, and fresh data will be fetched from the server.
  revalidatePath("/works");
  redirect("/dashboard");
}

export async function updateWork(
  prevState: State,
  id: string,
  formData: FormData
) {
  const validatedFields = UpdateWork.safeParse({
    title: formData.get("title"),
    image: formData.get("image"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing field. Failed to update work",
    };
  }

  const { title, image } = validatedFields.data;
  const storageRef = ref(storage, image.name);

  try {
    await sql`
    UPDATE works
    SET image_url = ${storageRef.fullPath}
    WHERE works.id = ${id}
    `;
  } catch (err) {
    return {
      message: "Database error: failed to update work",
    };
  }

  revalidatePath("/works");
  redirect("/dashboard");
}

export async function deleteWork(work: Works) {
  const deleteRef = ref(storage, work.image_url);
  deleteObject(deleteRef)
    .then(() => {
      return { message: "Deleted image successfully!" };
    })
    .catch((err) => {
      return { message: "Ooops an error occurred" };
    });

  await sql`DELETE FROM works WHERE works.id = ${work.id}`;
  revalidatePath("/works");
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials";
        default:
          return "Something went wrong";
      }
    }
    throw error;
  }
}
