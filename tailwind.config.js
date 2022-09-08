/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        customGray:{
          200: '#71797E',
          600: '#43474A',
        },
        customBlue:{
          200: '#79ABC9',
          600: '#19204E',
        },
        customRed:{
          600: "#DF1B3F",
        },
      },
      fontFamily:{
        textFont: ['DM Mono', "monospace"],
        titleFont: ['Lora', "serif"],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
