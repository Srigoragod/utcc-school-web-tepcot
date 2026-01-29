/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      transitionTimingFunction: {
        "in-expo": "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
        "out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
      },
      transitionDelay: { 2000: "2000ms" },
      colors: {
        //Primary Color
        "a-blue-030e62": "#030e62",
        "a-blue-1c1c84": "#1c1c84",
        "a-blue-265EF7": "#265EF7",
        "a-glod-D4B769": "#D4B769",
        "a-orage-F36A10": "#F36A10",
        "a-blue-aad6ec": "#aad6ec",
        "a-blue-0033A1": "#0033A1",
        "a-blue-021430": "#021430",
        "a-blue-e7f4ff": "#e7f4ff",
        "a-yellow-CFECFF": "#FFF2CC",
        "a-yellow-f9f4e8": "#f9f4e8",
        "a-blue-ffdead": "#ffdead",
        "a-blue-F2DC98": "#F2DC98",
        "a-blue-D4B769": "#D4B769",
        "a-blue-F2C667": "#F2C667",
        "a-blue-E3F2FD": "#E3F2FD",
        "a-brown-5F360D": "#5F360D",
        "a-brown-C58702": "#C58702",
        //Secondary Color
        "a-green-0DECC5": "#0DECC5",
        "a-blue-3E7ADB": "#3E7ADB",
        "a-blue-A8C7FA": "#a8c7fa",
        //Base Color
        "a-black-1F2937": "#1F2937",
        "a-gray-696F6F": "#696F6F",
        "a-gray-BEC1C1": "#BEC1C1",
        "a-gray-F0F0F0": "#F0F0F0",
        "a-gray-E0EAFC": "#E0EAFC",
        "a-gray-EEEFF1": "#EEEFF1",
        "a-gray-F8FAFC": "#F8FAFC",
      },
      fontSize: {
        80: "5rem",
        66: "4.125rem",
        64: "4rem",
        54: "3.375rem",
        44: "2.75rem",
        36: "2.25rem",
        34: "2.125rem",
        30: "1.875rem",
        24: "1.5rem",
        20: "1.25rem",
        18: "1rem",
      },
      spacing: { "10px": "10px" },
      borderReaius: { 3: "3px", 5: "5px", 10: "10px", 40: "40px" },
      screens: {
        mobile: "576px",
        // => @media (min-width: 576px) { ... }
        tablet: "640px",
        // => @media (min-width: 640px) { ... }
        laptop: "1024px",
        // => @media (min-width: 1024px) { ... }
        desktop: "1280px",
        // => @media (min-width: 1280px) { ... }
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#ffd300",
          secondary: "#A0E077",
          info: "#0f0f33",
          accent: "#1c1c84",
          neutral: "#45b2ef",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
  // plugins: [require("daisyui"),require('flowbite/plugin')],
};
