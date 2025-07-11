/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  purge: [],
  darkMode: 'class', //false, // or 'media' or 'class'
  theme: {
    extend: {
      // colors: {
      //   primary: 'var(--primary-color)',
      //   secondary: 'var(--secondary-color)',
      //   tertiary: 'var(--tertiary-color)',
      //   fourth: 'var(--fourth-color)',
        
      //   // Map for vars in text
      //   'primary-text': 'var(--primary-color-text)',
      //   'secondary-text': 'var(--secondary-color-text)',
      //   'tertiary-text': 'var(--tertiary-color-text)',
      //   'fourth-text': 'var(--fourth-color-text)',
      //   'fifth-text': 'var(--fifth-color-text)',
      // },
      // backgroundColor: {
      //   // Map for background
      //   DEFAULT: 'var(--background-color)', // Used with `bg-background`
      //   light: 'var(--background-color-light)', // Used with `bg-background-light`
      // }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
