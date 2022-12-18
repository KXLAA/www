/** @type {import('tailwindcss').Config} */

const { spacing } = require("tailwindcss/defaultTheme");
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
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.700"),
            a: {
              color: theme("colors.blue.500"),
              "&:hover": {
                color: theme("colors.blue.700"),
              },
              code: { color: theme("colors.blue.400") },
            },
            "h2,h3,h4": {
              "scroll-margin-top": spacing[32],
            },
            code: { color: theme("colors.pink.500") },
            "blockquote p:first-of-type::before": false,
            "blockquote p:last-of-type::after": false,
          },
        },
        dark: {
          css: {
            color: theme("colors.gray.300"),
            a: {
              color: theme("colors.blue.400"),
              "&:hover": {
                color: theme("colors.blue.600"),
              },
              code: { color: theme("colors.blue.400") },
            },
            blockquote: {
              borderLeftColor: theme("colors.gray.700"),
              color: theme("colors.gray.300"),
            },
            "h2,h3,h4": {
              color: theme("colors.gray.100"),
              "scroll-margin-top": spacing[32],
            },
            hr: { borderColor: theme("colors.gray.700") },
            ol: {
              li: {
                "&:before": { color: theme("colors.gray.500") },
              },
            },
            ul: {
              li: {
                "&:before": { backgroundColor: theme("colors.gray.500") },
              },
            },
            strong: { color: theme("colors.gray.300") },
            thead: {
              color: theme("colors.gray.100"),
            },
            tbody: {
              tr: {
                borderBottomColor: theme("colors.gray.700"),
              },
            },
          },
        },
      }),
      borderRadius: {
        "4xl": "28px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
