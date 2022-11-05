import { z } from "zod";

export const serverScheme = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  ENABLE_VC_BUILD: z.string().default("1").transform((v) => parseInt(v)),
  DATABASE_URL: z.string(),
  UPSTASH_REDIS_REST_URL: z.string(),
  UPSTASH_REDIS_REST_TOKEN: z.string(),
});

export const clientScheme = z.object({
  MODE: z.enum(['development', 'production', 'test']).default('development'),
});
