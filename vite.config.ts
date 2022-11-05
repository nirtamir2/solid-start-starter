import solid from "solid-start/vite";
import { defineConfig } from "vite";
// @ts-ignore
import vercel from "solid-start-vercel";
import dotenv from "dotenv";

export default defineConfig(() => {
  dotenv.config();
  return {
    plugins: [solid({ ssr: false, adapter: vercel({ edge: false }) })],
  };
});
