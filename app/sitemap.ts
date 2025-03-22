import type { MetadataRoute } from "next";
import { fetchWorks } from "./lib/data";

export const baseUrl = "art-portfolio-6f58q7m2c-sotaro117s-projects.vercel.app";

// @ts-ignore
export default async function sitemap(): MetadataRoute.Sitemap {
  const works = await fetchWorks();

  return [
    {
      url: baseUrl,
      lastModified: new Date().toISOString().split("T")[0],
      changeFrequency: "weekly",
      images: works.map((work) => {
        return work.image_url;
      }),
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date().toISOString().split("T")[0],
    },
    {
      url: `${baseUrl}/works`,
      lastModified: new Date().toISOString().split("T")[0],
      changeFrequency: "weekly",
      images: works.map((work) => {
        return work.image_url;
      }),
    },
    {
      url: `${baseUrl}/works/${works.map((work) => {
        return work.id;
      })}`,
      lastModified: new Date().toISOString().split("T")[0],
      changeFrequency: "weekly",
      images: works.map((work) => {
        return work.image_url;
      }),
    },
  ];
}
