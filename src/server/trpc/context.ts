import type { inferAsyncReturnType } from "@trpc/server";
import type { createSolidAPIHandlerContext } from "solid-start-trpc";
import { prisma } from "~/server/db/client";

export const createContext = (opts: createSolidAPIHandlerContext) => {
  return {
    prisma,
    ...opts,
  };
};

export type IContext = inferAsyncReturnType<typeof createContext>;
