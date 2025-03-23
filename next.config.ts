import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "3mb",
    },
  },
};

// In your build script (e.g., next.config.js for Next.js)
import fs from "fs";
import path from "path";

// Only do this during build time
if (process.env.NODE_ENV === "production") {
  // Create the credentials directory if it doesn't exist
  const credentialsDir = path.join(process.cwd(), "credentials");
  if (!fs.existsSync(credentialsDir)) {
    fs.mkdirSync(credentialsDir, { recursive: true });
  }

  // Write the credentials file from environment variable
  const credentialsPath = path.join(credentialsDir, "service-account.json");
  // @ts-ignore
  fs.writeFileSync(credentialsPath, process.env.GOOGLE_CREDENTIALS);
}

export default nextConfig;
