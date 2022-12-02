import { serverScheme } from "~/env/schema";

export function getBaseUrl() {
  if (typeof window !== "undefined") return "";
  const { VERCEL_URL, SITE_URL, PORT, NODE_ENV } = serverScheme.parse(
    process.env
  );
  if (NODE_ENV === "development") {
    return `http://localhost:${PORT}`;
  }

  if (SITE_URL != null) return SITE_URL;
  if (VERCEL_URL != null) return `https://${VERCEL_URL}`;

  throw new Error("getBaseUrl - site url not found");
}
