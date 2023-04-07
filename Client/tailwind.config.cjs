/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],

  theme: {
    extend: {
      colors: {
        navBgColor: "#333C49",
        bgGray: "#282828",
        bodyBg: "#1B1F24",
        SideBarColor: "#121418",
        logInBG: "#162235",
        inside: "#0C131D",
        bgHeader: "#eaeef2",
      },
    },
  },
};
