import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { IAppRouter } from "~/server/trpc/router/_app";
import { getBaseUrl } from "~/utils/getBaseUrl";

export const client = createTRPCProxyClient<IAppRouter>({
  links: [
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
    }),
  ],
});
