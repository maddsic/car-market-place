import { vitePlugin as remix } from "@remix-run/dev";
import { vercelPreset } from "@vercel/remix/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";


export default defineConfig({
  plugins: [
    remix({
      presets: [vercelPreset()],
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    tsconfigPaths(),
  ],
  ssr: {
    // Forces Vite to bundle Three.js as ES Modules rather than require() CommonJS
    noExternal: ['three', '@react-three/fiber', '@react-three/drei', '@react-three/postprocessing'],
  },
  esbuild: {
    drop: process.env.NODE_ENV === "production" ? ["console", "debugger"] : [],
  }
});
