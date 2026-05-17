import type { NextConfig } from "next";

const crmUrl = process.env.CRM_BASE_URL;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      ...(crmUrl ? [new URL(`${crmUrl}/**`)] : []),
      { protocol: 'https', hostname: 'atxxcrm.s3.us-east-1.amazonaws.com' },
    ],
  },
};

export default nextConfig;
