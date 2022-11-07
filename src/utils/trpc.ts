import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { serverEnv } from "~/env/serverEnv";
import type { IAppRouter } from "~/server/trpc/router/_app";

const getBaseUrl = () => {
  if (typeof window !== "undefined") return "";
  if (serverEnv.VERCEL_URL != null) return `https://${serverEnv.VERCEL_URL}`;
  return `http://localhost:${serverEnv.PORT}`;
};

export const client = createTRPCProxyClient<IAppRouter>({
  links: [
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
    }),
  ],
});
