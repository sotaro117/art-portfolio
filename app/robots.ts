import { baseUrl } from "app/sitemap";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: `${baseUrl}/dashboard/*`,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
