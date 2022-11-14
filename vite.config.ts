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
      devtools(),
      solid({
        /**
         * You can use island mode by uncomment those lines
         * But notice that you need to wrap you island interactive components like
         * const Counter = unstable_island(() => import("../components/Counter"));
         */
        // islands: true,
        // islandsRouter: true,

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call
        adapter: vercel(),
      }),
    ],
  };
});
