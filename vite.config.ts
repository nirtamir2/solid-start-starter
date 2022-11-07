import dotenv from "dotenv";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import vercel from "solid-start-vercel";
import solid from "solid-start/vite";
import { defineConfig } from "vite";

export default defineConfig(() => {
  dotenv.config();
  return {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call
    plugins: [solid({ ssr: false, adapter: vercel({ edge: false }) })],
  };
});
