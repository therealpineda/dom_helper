module.exports = {
  extends: 'airbnb-base',
  plugins: [
    'import',
  ],
  env: {
    browser: true,
  },
  rules: {
    'no-param-reassign': ['error', { props: false }],
  },
};
