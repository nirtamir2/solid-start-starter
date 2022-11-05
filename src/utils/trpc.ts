import {httpBatchLink, createTRPCProxyClient} from "@trpc/client";
import {IAppRouter} from "~/server/trpc/router/_app";

const getBaseUrl = () => {
  if (typeof window !== "undefined") return "";
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
};

export const client = createTRPCProxyClient<IAppRouter>({
  links: [
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
    }),
  ],
});

