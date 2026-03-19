import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#11161c",
        graphite: "#26313d",
        steel: "#516171",
        bone: "#f7f5ef",
        mist: "#6f7c89",
        line: "rgba(17, 22, 28, 0.12)",
        accent: "#8c9fb0",
        paper: "#fcfbf8",
        panel: "#eef1f4",
      },
      boxShadow: {
        deck: "0 24px 60px rgba(17, 22, 28, 0.08)",
      },
      backgroundImage: {
        grain:
          "radial-gradient(circle at top, rgba(140,159,176,0.16), transparent 30%), linear-gradient(135deg, rgba(140,159,176,0.08), transparent 42%)",
      },
      fontFamily: {
        display: ["Iowan Old Style", "Palatino Linotype", "Book Antiqua", "serif"],
        sans: ["Avenir Next", "Segoe UI", "Helvetica Neue", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
