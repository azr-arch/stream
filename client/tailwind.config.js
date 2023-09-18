/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      minHeight: {
        screenWHeader: "calc(100vh - 64px)",
      },
      textColor: {
        text: "#efeff1",
      },
      backgroundColor: {
        primary: "#9147ff",
      },
      borderColor: {
        primary: "#9147ff",
      },
    },
  },
  plugins: [],
};
