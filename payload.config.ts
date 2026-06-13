import { en } from "@payloadcms/translations/languages/en";
import { fr } from "@payloadcms/translations/languages/fr";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";

import { Media } from "./collections/Media.ts";
import { Posts } from "./collections/Posts.ts";
import { Users } from "./collections/Users.ts";
import { HomePage } from "./globals/HomePage.ts";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Users, Media, Posts],
  editor: lexicalEditor({}),
  globals: [HomePage],
  i18n: {
    fallbackLanguage: "fr",
    supportedLanguages: { en, fr },
  },
  localization: {
    locales: [
      {
        code: "fr",
        label: "Français",
      },
      {
        code: "en",
        label: "English",
      },
    ],
    defaultLocale: "fr",
    fallback: true,
  },
  secret: process.env.PAYLOAD_SECRET || "development-payload-secret-change-me",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
  }),
  sharp,
});
