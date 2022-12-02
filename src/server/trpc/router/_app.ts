import { calendarRouter } from "~/server/trpc/router/calendarRouter";
import { t } from "../utils";

export const appRouter = t.router({
  app: calendarRouter,
});

export type IAppRouter = typeof appRouter;
