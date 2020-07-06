const DOMNodeCollection = require('../src/dom_node_collection');
const { createEls } = require('./index.js');

describe('constructor', () => {
  test('assigns nodes into HTMLElements', () => {
    let nodes = createEls('p');
    let collection = new DOMNodeCollection(nodes);
    expect(collection.length).toBe(nodes.length);
    nodes.forEach((node, i) => {
      expect(collection.HTMLElements[i]).toBe(node);
    });

    nodes = createEls('p', 3);
    collection = new DOMNodeCollection(nodes);
    expect(collection.length).toBe(nodes.length);
    nodes.forEach((node, i) => {
      expect(collection.HTMLElements[i]).toBe(node);
    });
  });
});

describe('html', () => {
  test('returns html content of first element', () => {
    const nodes = createEls('p', 2);
    const collection = new DOMNodeCollection(nodes);
    expect(collection.html()).toBe('');
    nodes[0].innerHTML = 'test';
    expect(collection.html()).toBe('test');
    nodes[0].innerHTML = nodes[0]; // eslint-disable-line prefer-destructuring
    expect(collection.html()).toBe(nodes[0].innerHTML);
  });

  test('assigns html content of all elements', () => {
    const nodes = createEls('p', 3);
    const collection = new DOMNodeCollection(nodes);
    expect(collection.html()).toBe('');
    collection.html('test');
    expect(collection.html()).toBe('test');
    nodes.forEach(n => expect(n.innerHTML).toBe('test'));
  });
});

describe('empty', () => {
  test('removes html content of all elements', () => {
    const [p1, p2, p3] = createEls('p', 3);
    p1.innerHTML = 'test';
    p2.innerHTML = p3;
    const nodes = [p1, p2, p3];
    const collection = new DOMNodeCollection(nodes);
    collection.empty();
    nodes.forEach(n => expect(n.innerHTML).toBe(''));
  });
});

describe('append', () => {
  test('adds string into innerHTML of all elements', () => {
    const [p1, p2, p3] = createEls('p', 3);
    p1.innerHTML = 'test';
    p2.innerHTML = p3;
    const nodes = [p1, p2, p3];
    const collection = new DOMNodeCollection(nodes);
    collection.append('test');
    expect(p1.innerHTML).toBe('testtest');
    expect(p2.innerHTML).toBe(`${p3}test`);
    expect(p3.innerHTML).toBe('test');
  });

  test('adds HTMLElement into innerHTML of all elements', () => {
    const [p1, p2, p3] = createEls('p', 3);
    p1.innerHTML = 'test';
    p2.innerHTML = p3;
    const nodes = [p1, p2, p3];
    const collection = new DOMNodeCollection(nodes);
    const [span] = createEls('span');
    collection.append(span);
    expect(p1.innerHTML).toBe(`test${span.outerHTML}`);
    expect(p2.innerHTML).toBe(`${p3}${span.outerHTML}`);
    expect(p3.innerHTML).toBe(span.outerHTML);
  });

  test('appends DOMNodeCollection as an argument', () => {
    const [p1, p2, p3] = createEls('p', 3);
    p1.innerHTML = 'test';
    p2.innerHTML = p3;
    const nodes1 = [p1, p2, p3];
    const collection1 = new DOMNodeCollection(nodes1);

    const [span1, span2] = createEls('span', 3);
    span1.innerHTML = 'span1';
    span2.innerHTML = 'span2';
    const nodes2 = [span1, span2];
    const collection2 = new DOMNodeCollection(nodes2);

    collection1.append(collection2);

    const appended = `${span1.outerHTML}${span2.outerHTML}`;
    expect(p1.innerHTML).toBe(`test${appended}`);
    expect(p2.innerHTML).toBe(`${p3}${appended}`);
    expect(p3.innerHTML).toBe(appended);
  });
});
