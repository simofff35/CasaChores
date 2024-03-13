module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require("flowbite/plugin"),
    require("preline/plugin"),
    require("tailwind-scrollbar"),
  ],
};
