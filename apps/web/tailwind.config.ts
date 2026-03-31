import sharedConfig from "@repo/tailwind-config";
import type { Config } from "tailwindcss";

const config: Config = {
  ...sharedConfig,
  // Override content to be app-relative (more reliable than repo-root-relative paths)
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    // Pull in UI package so its classes aren't purged
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
};

export default config;