import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: "#1a1a1a",
        accent: "#3b82f6",
        success: "#22c55e",
        warning: "#eab308",
        danger: "#ef4444",
        muted: "#6b7280"
      }
    }
  },
  plugins: []
};

export default config;
