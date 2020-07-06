require('../src/main.js');
const { createEls } = require('./index.js');

const { $dh } = window;

describe('$dh', () => {
  test('is a function', async () => {
    expect(typeof $dh).toBe('function');
  });

  test('returns undefined by default', () => {
    expect($dh()).toBe(undefined);
  });

  test('accepts an HTML element, returns DH node collection', () => {
    const [p] = createEls('p');
    const dhNodes = $dh(p);
    expect(dhNodes.length).toBe(1);
  });
});
