const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      gray: colors.neutral,
      ...colors,
    },
    fontFamily: {
      sans: ['RubikVariable', 'sans-serif'],
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontWeight: 500,
              letterSpacing: '-0.01562em',
            },
            h2: {
              fontWeight: 500,
              letterSpacing: '-0.01em',
            },
            h3: {
              fontWeight: 500,
              letterSpacing: '-0.01em',
            },
            h4: {
              fontWeight: 500,
            },
            h5: {
              fontWeight: 500,
            },
            h6: {
              fontWeight: 500,
            },
            
            blockquote: {
              borderLeftWidth: null,
              borderLeftColor: null,
              color: null,
              textDecoration: null,
              paddingLeft: null,
              marginTop: null,
              marginBottom: null,
              fontStyle: null,
              fontWeight: 'bold',
              fontSize: '1.25rem',
              textTransform: 'uppercase',
              lineHeight: '27px',
              quotes: 'none',
            },
            'blockquote p': {
              marginTop: 0,
              marginBottom: 0,
            },
            'blockquote.alignleft, blockquote.aligncenter': {
              float: 'left',
              marginRight: '30px',
              width: '40%',
            },
            'blockquote.alignright': {
              float: 'right',
              marginLeft: '30px',
              width: '40%',
            },
            img: {
              borderRadius: '5px',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
