// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        sidebar: '300px auto', //for sidebar layout
        'sidebar-collapsed': '64px auto', //for collapsed sidebar layout
      },
      colors: {
        jay: {
          100: '#DBF4FF',
          200: '#B7E7FF',
          300: '#93D5FF',
          400: '#78C4FF',
          500: '#4CA8FF',
          600: '#3783DB',
          700: '#2662B7',
          800: '#184493',
          900: '#0E2F7A',
        },
      },
      screens: {
       'xs': '280px',
        'sm': '640px',
        // => @media (min-width: 640px) { ... }
  
        'md': '768px',
        // => @media (min-width: 768px) { ... }
  
        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }
  
        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }
  
        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
     
      },
    },
  },
  plugins: [
    //require('@tailwindcss/forms'),
  ],
}

