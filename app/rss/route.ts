import { baseUrl } from "app/sitemap";
import { fetchWorks } from "app/lib/data";

export async function GET() {
  let works = await fetchWorks();

  const itemsXml = works
    .sort((a, b) => {
      if (new Date(a.date) > new Date(b.date)) {
        return -1;
      }
      return 1;
    })
    .map(
      (work) =>
        `<item>
          <title>${work.title}</title>
          <link>${baseUrl}/works/${work.id}</link>
          <image>${work.image_url || ""}</image>
          <pubDate>${new Date(work.date).toISOString()}</pubDate>
        </item>`
    )
    .join("\n");

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
        <title>Art Portfolio</title>
        <link>${baseUrl}</link>
        <description>This is art portfolio RSS feed</description>
        ${itemsXml}
    </channel>
  </rss>`;

  return new Response(rssFeed, {
    headers: {
      "Content-Type": "text/xml",
    },
  });
}
