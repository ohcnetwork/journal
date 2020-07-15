module.exports = {
  theme: {
    extend: {
      width: {
        '1/7': '14.2857143%'
      },
      minHeight: {
        '32': '8rem'
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