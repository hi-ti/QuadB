/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
          "red": '#FF0000ff',
          "bone": '#E3D8CBff',
          "lion": '"#A5905Eff"',
          "alab": '#EDE5D7ff',
      },
      screens: {
        'xxs': "360px",
        'xs': "410px",
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
    plugins: [],
  }
}
