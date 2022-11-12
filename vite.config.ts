import dotenv from "dotenv";
import devtools from "solid-devtools/vite";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import vercel from "solid-start-vercel";
import solid from "solid-start/vite";
import { defineConfig } from "vite";

export default defineConfig(() => {
  dotenv.config();
  return {
    plugins: [
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      devtools({ name: true }),
      solid({
        ssr: false,
        // TODO: set island flags for better performance when they will work well with signals
        // islands: true,
        // islandsRouter: true,

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call
        adapter: vercel({ edge: false }),
      }),
    ],
  };
});
