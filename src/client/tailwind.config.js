import path from "path";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    path.resolve(__dirname, "./src/**/*.{js,jsx,ts,tsx}"),
    path.resolve(__dirname, "./index.html"),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
