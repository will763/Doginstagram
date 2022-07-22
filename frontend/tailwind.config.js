/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        billabong: 'Billabong, sans',
        roboto: 'Roboto, sans-serif',
      },
      screens: {
        'xs': {'max': '450px'},
        'big': {'max': '1000px'},
        'lbig': {'max': '735px'},
        'xxs': {'max': '365px'},
      },
       gridTemplateColumns: {
        '16': 'repeat(3, minmax(0rem, 18rem))',
      },
      animation: {
        fade: 'fade 1s ease-in',
        fadein: 'fadein 1s ease-in'
      },
      keyframes: {
        fade: {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '20%': { transform: 'scale(1.2)' },
          '40%': { transform: 'scale(.9)' },
          '90%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(0)', opacity: '1' },
        },
         fadein: {
          '0%': { transform: 'scale(.9)' },
          '20%': { transform: 'scale(1.2)' },
          '40%': { transform: 'scale(.9)' },
          '90%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' },
        }
      }
    },
  },
  plugins: [],
}
