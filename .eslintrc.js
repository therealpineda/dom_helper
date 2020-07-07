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
    'arrow-parens': ['error', 'as-needed', { requireForBlockBody: true }],

  },
  globals: {
    afterAll: true,
    afterEach: true,
    beforeAll: true,
    beforeEach: true,
    describe: true,
    expect: true,
    jest: true,
    test: true,
  },
};
