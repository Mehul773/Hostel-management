/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      display: ["group-hover"],
      colors: {
        bg_white: "#FFFFFF",
        bg_light_section: "#9197AE",
        bg_dark_section: "#2b2d42",
        bg_dark_red: "#d90429",
        bg_red: "#ef233c",
        bg_white_font: "#FFFFFF",
        bg_dark_font: "#2b2d42",
        bg_notice: "#FEF9C3",
        bg_report: "#f2f6fc",
      },
    },
  },
  plugins: [],
};
