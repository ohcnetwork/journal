module.exports = {
  theme: {
    extend: {
      screens: {
        print: {
          raw: 'print'
        },
      }
    }
  },
  variants: {
    opacity: ['responsive', 'hover', 'focus', 'disabled'],
  },
  plugins: [
    require('@tailwindcss/ui'),
  ]
}