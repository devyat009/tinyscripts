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
      colors: {
        // Colors
        primary: {
          DEFAULT: 'var(--primary-color)', //  bg-primary
          hover: 'var(--secondary-color)', // hover:bg-primary
        },
        secondary: 'var(--secondary-color)',
        tertiary: 'var(--tertiary-color)',
        fourth: 'var(--fourth-color)',
        
        'primary-text': 'var(--primary-color-text)',
        'secondary-text': 'var(--secondary-color-text)',
        'tertiary-text': 'var(--tertiary-color-text)',
        'fourth-text': 'var(--fourth-color-text)',
        'fifth-text': 'var(--fifth-color-text)',
      },
      backgroundColor: {
        DEFAULT: 'var(--background-color)',
        light: 'var(--background-color-light)',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
