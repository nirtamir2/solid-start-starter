import { QueryClient } from "@tanstack/solid-query";
import { httpBatchLink } from "@trpc/client";
import { createTRPCSolidStart } from "solid-trpc";
import { serverScheme } from "~/env/schema";
import type { IAppRouter } from "~/server/trpc/router/_app";

const getBaseUrl = () => {
  if (typeof window !== "undefined") return "";
  const { VERCEL_URL, PORT } = serverScheme.parse(process.env);
  if (VERCEL_URL != null) return `https://${VERCEL_URL}`;
  return `http://localhost:${PORT}`;
};

export const trpc = createTRPCSolidStart<IAppRouter>({
  config() {
    return {
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
    };
  },
});

export const queryClient = new QueryClient();
