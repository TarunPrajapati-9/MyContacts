/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        title: ["Merriweather"],
        navItems: ["LeagueSpartan"],
        contentTitle: ["MetalMania"],
        content: ["Merienda"],
        footer: ["Niramit"],
        modelTitle: ["SeoulHangangCBLRegular"],
        aboutDesc: ["MergeOne-Regular"],
      },
    },
  },
  plugins: [require("daisyui")],
};
