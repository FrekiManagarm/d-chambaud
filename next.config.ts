import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

type Redirects = Awaited<ReturnType<NonNullable<NextConfig["redirects"]>>>;

const canonicalSiteUrl = "https://david-chambaud.fr";

const legacyContentRedirects = [
  {
    source: "/a-propos",
    destination: `${canonicalSiteUrl}/#a-propos`,
    permanent: true,
  },
  {
    source: "/chef-a-domicile",
    destination: `${canonicalSiteUrl}/chef-a-domicile-bordeaux`,
    permanent: true,
  },
  {
    source: "/mariages",
    destination: `${canonicalSiteUrl}/traiteur-mariage-bordeaux`,
    permanent: true,
  },
  {
    source: "/mariage",
    destination: `${canonicalSiteUrl}/traiteur-mariage-bordeaux`,
    permanent: true,
  },
  {
    source: "/pavillon-des-millesimes",
    destination: `${canonicalSiteUrl}/#pavillon`,
    permanent: true,
  },
  {
    source: "/pavillon",
    destination: `${canonicalSiteUrl}/#pavillon`,
    permanent: true,
  },
  {
    source: "/receptions-evenements-professionnels-et-prives",
    destination: `${canonicalSiteUrl}/traiteur-bordeaux`,
    permanent: true,
  },
  {
    source: "/receptions-evenements",
    destination: `${canonicalSiteUrl}/traiteur-bordeaux`,
    permanent: true,
  },
  {
    source: "/traiteur",
    destination: `${canonicalSiteUrl}/traiteur-bordeaux`,
    permanent: true,
  },
  {
    source: "/traiteur-reception",
    destination: `${canonicalSiteUrl}/traiteur-bordeaux`,
    permanent: true,
  },
] satisfies Redirects;

const canonicalHostRedirects = [
  {
    source: "/:path*",
    has: [{ type: "host", value: "www.david-chambaud.fr" }],
    destination: `${canonicalSiteUrl}/:path*`,
    permanent: true,
  },
  {
    source: "/:path*",
    has: [{ type: "host", value: "chambaud.fr" }],
    destination: `${canonicalSiteUrl}/:path*`,
    permanent: true,
  },
  {
    source: "/:path*",
    has: [{ type: "host", value: "www.chambaud.fr" }],
    destination: `${canonicalSiteUrl}/:path*`,
    permanent: true,
  },
] satisfies Redirects;

const nextConfig: NextConfig = {
  async redirects() {
    return [...legacyContentRedirects, ...canonicalHostRedirects];
  },
  outputFileTracingIncludes: {
    "/*": ["node_modules/sharp/**/*", "node_modules/@img/sharp-*/**/*"],
  },
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
    LETTR_API_KEY: process.env.LETTR_API_KEY,
  },
};

export default withPayload(nextConfig);
