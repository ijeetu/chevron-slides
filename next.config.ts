import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  // The main-deck route reads public/ at runtime, which makes file tracing
  // bundle every video and audio file into the function. It only needs the
  // PDF and the slide manifest; media is served from the CDN.
  outputFileTracingExcludes: {
    "/presentation/main-deck/deck": [
      "public/**/*.{mp4,webm,mov,m4a,mp3,wav}",
      "public/**/*.{webp,png,jpg,jpeg,gif,svg}",
    ],
  },
};

export default nextConfig;
