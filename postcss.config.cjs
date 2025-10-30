// Use the new PostCSS plugin package for Tailwind
// https://tailwindcss.com/docs/upgrade-guide
module.exports = {
  plugins: [
    // require the new plugin directly so PostCSS runs it as a plugin
    require('@tailwindcss/postcss'),
    require('autoprefixer'),
  ],
};