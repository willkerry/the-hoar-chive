/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "selector",
  theme: {
    fontFamily: {
      sans: ["RubikVariable", "sans-serif"],
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontWeight: 500,
              letterSpacing: "-0.01562em",
            },
            h2: {
              fontWeight: 500,
              letterSpacing: "-0.01em",
            },
            h3: {
              fontWeight: 500,
              letterSpacing: "-0.01em",
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
              fontWeight: 400,
              fontSize: "1.25rem",
              lineHeight: "27px",
              quotes: "none",
            },

            "blockquote.alignleft, blockquote.aligncenter": {
              float: "left",
              marginRight: "30px",
              width: "40%",
            },
            "blockquote.alignright": {
              float: "right",
              marginLeft: "30px",
              width: "40%",
            },
            img: {
              borderRadius: "5px",
              border: "1px solid #eaeaea",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
