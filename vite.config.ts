import devtools from "solid-devtools/vite";
import vercel from "solid-start-vercel";
import solid from "solid-start/vite";
import { defineConfig } from "vite";
import solidSvg from "vite-plugin-solid-svg";

export default defineConfig(() => {
  return {
    plugins: [
      devtools({
        autoname: true,
        locator: {
          componentLocation: true,
          jsxLocation: true,
          targetIDE: "webstorm",
        },
      }),
      solid({
        /**
         * You can use island mode by uncomment those lines
         * But notice that you need to wrap you island interactive components like
         *
         * ```tsx
         * const Counter = unstable_island(() => import("../components/Counter"));
         * ```
         */
        // islands: true,
        // islandsRouter: true,

        adapter: vercel({}),
      }),
      solidSvg({
        defaultAsComponent: true,
      }),
    ],
  };
});
