module.exports = {
  purge: {
    content: ['yourfiles/**/*.html'],
    options: {
      safelist: [/data-theme$/],
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: true,
  },
};
