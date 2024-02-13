/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: "Poppins",
    },
    colors: {
      primary: "#3B62FF",
      secondary: "#5F7FFF",
      background: "#F7F8FF",
      black: "#000000",
      white: "#FFFFFF",
      grey1: "#222222",
      grey2: "#717171",
      grey3: "#E7E7E7",
      grey4: "#F5F5F5",
    },
    extend: {},
  },
  plugins: [],
};
