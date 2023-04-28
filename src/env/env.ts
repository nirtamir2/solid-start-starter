import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  clientPrefix: "VITE_",
  server: {
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
    ENABLE_VC_BUILD: z
      .string()
      .default("1")
      .transform((v) => Number.parseInt(v)),
    DATABASE_URL: z.string(),
    VERCEL_URL: z.string().optional(),
    PORT: z
      .string()
      .optional()
      .default("3000")
      .transform((v) => Number.parseInt(v)),
  },
  client: {},
  runtimeEnv: process.env,
});
