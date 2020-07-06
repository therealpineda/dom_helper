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
    'arrow-parens': ['error', 'as-needed'],
  },
  globals: {
    afterAll: true,
    afterEach: true,
    beforeAll: true,
    beforeEach: true,
    describe: true,
    expect: true,
    it: true,
    test: true,
  },
};
