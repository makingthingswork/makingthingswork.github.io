module.exports = {
  purge: {
    enabled: true,
    content: [
    './**/*.html',
    './_/assets/js/**/*.js'
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      'xxs': '414px',
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    backgroundSize: {
      100: '100% 100%',
    },
    fontFamily: {
      //sans: ['Dosis', 'sans-serif'],
    },
    colors: {
      white: '#ffffff',
      black: '#000000',
      primary: 'var(--primary)',
      grey: {
        dark: '#202124',
        darker: '#444548',
        lighter: '#5a5a5a',
        light: '#989ea3',
      },
      mtw: {
        yellow: '#fff200', // #fff200 or #fff766 20% lighten version
        orange: '#ff9540', // #ff9540 or #ffb173 10% lighten version
        green: '#3cd25f', // #3cd25f or #65dc81 20% lighten version
        blue: '#00aeef', // #00aeef or #56d1ff 10% lighten version
        purple: '#af63fe', // #af63fe or #c996fe 10% lighten version
        pink: '#eb7b98', // #eb7b98 or #f2a7bb 10% lighten version
      },
    },
    extend: {
      margin: {
        5.5: '1.375rem',
        18: '4.5rem',
      },
      padding: {
        31: '7.75rem',
        37: '9.25rem',
      },
      inset: {
        5.5: '1.375rem',
        18: '4.5rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('tailwindcss'), require('autoprefixer')],
};
