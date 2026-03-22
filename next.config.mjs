import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

const assetHost = process.env.NEXT_PUBLIC_ASSET_HOST;
const cdnAddress = process.env.CDN_ADDRESS;
export default (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    reactStrictMode: true,
    output: "export",
    images: {
      unoptimized: true,
    },
  };
  return nextConfig;
};
