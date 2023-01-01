/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "640px", // => @media (min-width: 640px) { ... }
      md: "780px", // => @media (min-width: 768px) { ... }
      lg: "1024px", // => @media (min-width: 1024px) { ... }
      xl: "1280px", // => @media (min-width: 1280px) { ... }
      "2xl": "1536px", // => @media (min-width: 1536px) { ... }
    },
    colors: {
      ...colors,

      shark: {
        DEFAULT: "#27272A",
        50: "#53535A",
        100: "#4E4E54",
        200: "#44444A",
        300: "#3B3B3F",
        400: "#313135",
        500: "#27272A",
        600: "#202022",
        700: "#18181A",
        800: "#111112",
        900: "#0A0A0A",
      },

      silver: {
        DEFAULT: "#C0C0C0",
        50: "#EEEEEE",
        100: "#E9E9E9",
        200: "#DFDFDF",
        300: "#D4D4D4",
        400: "#CACACA",
        500: "#C0C0C0",
        600: "#A4A4A4",
        700: "#888888",
        800: "#6C6C6C",
        900: "#505050",
      },
    },
    extend: {
      typography: {
        DEFAULT: {
          "h1,h2,h3,h4,h5,h6": { color: "#EEEEEE" },
        },
      },
      borderRadius: {
        "4xl": "28px",
      },
      boxShadow: {
        "border-shiny": "inset 0 0 0 1px hsl(0deg 0% 100% / 10%)",
        "border-shiny-2": "inset 0 0 0 2px hsl(0deg 0% 100% / 10%)",
        "border-shiny-4": "inset 0 0 0 4px hsl(0deg 0% 100% / 10%)",
        "border-shiny-8": "inset 0 0 0 8px hsl(0deg 0% 100% / 10%)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
