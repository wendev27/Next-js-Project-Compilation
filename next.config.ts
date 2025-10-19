// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    eslint: {
      // ❌ Disable ESLint during build
      ignoreDuringBuilds: true,
    },
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cloud.appwrite.io",
        pathname: "/v1/storage/buckets/**", // Allow Appwrite storage previews
      },
    ],
  },
};

module.exports = nextConfig;
