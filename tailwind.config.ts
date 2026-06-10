import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        skySoft: "#e0f7ff",
        blueMain: "#0ea5e9",
        blueDeep: "#0369a1"
      },
      boxShadow: {
        soft: "0 12px 30px rgba(14, 165, 233, 0.10)"
      }
    }
  },
  plugins: []
};

export default config;
