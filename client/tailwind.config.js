/** @type {import('tailwindcss').Config} */
import tailwind3dTransforms from "@xpd/tailwind-3dtransforms";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#fff",
        secondary: "#C40C0C",
      },
    },
  },
  plugins: [tailwind3dTransforms], // Use the imported plugin here
};
