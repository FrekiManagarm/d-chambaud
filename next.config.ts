import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.david-chambaud.fr" }],
        destination: "https://david-chambaud.fr/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "chambaud.fr" }],
        destination: "https://david-chambaud.fr/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.chambaud.fr" }],
        destination: "https://david-chambaud.fr/:path*",
        permanent: true,
      },
    ];
  },
  outputFileTracingIncludes: {
    "/*": ["node_modules/sharp/**/*", "node_modules/@img/sharp-*/**/*"],
  },
};

export default withPayload(nextConfig);
