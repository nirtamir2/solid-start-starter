import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { env } from "~/env/env";
import type { IAppRouter } from "~/server/trpc/router/_app";

const getBaseUrl = () => {
  if (typeof window !== "undefined") return "";
  if (env.VERCEL_URL != null) return `https://${env.VERCEL_URL}`;
  return `http://localhost:${env.PORT}`;
};

export const client = createTRPCProxyClient<IAppRouter>({
  links: [
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
    }),
  ],
});
