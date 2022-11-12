const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

// added here to remove tailwind css warnings
delete colors["lightBlue"];
delete colors["warmGray"];
delete colors["trueGray"];
delete colors["coolGray"];
delete colors["blueGray"];

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ...colors,
        "primary-light": "#C9D0EC",
        "primary-main": "#063970",
        "primary-dark": "#1A1B20",

        "primary-light-text": "#1A1B20",
        "primary-main-text": "#FFFFFF",
        "primary-dark-text": "#FFFFFF",

        "secondary-main-faint": "#E9E7FA",
        "secondary-main-light": "#D3CEF5",
        "secondary-main": "#1e81b0",
        "secondary-main-text": "#FFFFFF",

        "secondary-text": "#83858F",
        "secondary-dark-text": "#E8EAED",
        "disabled-gray": "#E8EAED",
        "off-white": "#F0F1F2",
      },
    },
  },
  plugins: [],
};
