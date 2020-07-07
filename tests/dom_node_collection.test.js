const DOMNodeCollection = require('../src/dom_node_collection');
const { createEls } = require('./index.js');

describe('constructor', () => {
  test('assigns nodes into nodes', () => {
    let nodes = createEls('p');
    let collection = new DOMNodeCollection(nodes);
    expect(collection.length).toBe(nodes.length);
    nodes.forEach((node, i) => {
      expect(collection.nodes[i]).toBe(node);
    });

    nodes = createEls('p', 3);
    collection = new DOMNodeCollection(nodes);
    expect(collection.length).toBe(nodes.length);
    nodes.forEach((node, i) => {
      expect(collection.nodes[i]).toBe(node);
    });
  });

  test('creates empty collection if no argument', () => {
    const collection = new DOMNodeCollection();
    expect(Array.isArray(collection.nodes)).toBe(true);
    expect(collection.length).toBe(0);
  });

  test('warns if invalid argument is passed', () => {
    /* eslint-disable no-console */
    const { warn } = console;
    console.warn = jest.fn();
    expect(console.warn).toHaveBeenCalledTimes(0);
    const collection = new DOMNodeCollection(12345);
    expect(console.warn).toHaveBeenCalledTimes(1);
    const expected = new DOMNodeCollection();
    expect(collection.equals(expected)).toBe(true);
    console.warn = warn;
    /* eslint-enable no-console */
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

  describe('attr', () => {
    test('returns attribute value of first matching element', () => {
      const nodes = createEls('a', 2);
      const collection = new DOMNodeCollection(nodes);
      expect(collection.attr('href')).toBe(null);
      nodes[0].setAttribute('href', 'test.com');
      expect(collection.attr('href')).toBe('test.com');
    });

    test('assigns attribute value for of all elements', () => {
      const nodes = createEls('a', 2);
      const collection = new DOMNodeCollection(nodes);
      collection.attr('href', 'test.com');
      nodes.forEach(n => expect(n.getAttribute('href')).toBe('test.com'));
      expect(collection.attr('href')).toBe('test.com');
    });
  });

  describe('addClass', () => {
    test('adds classes to each element', () => {
      const nodes = createEls('a', 2);
      const collection = new DOMNodeCollection(nodes);
      nodes.forEach(n => expect(n.getAttribute('class')).toBe(null));
      collection.addClass('subtext');
      nodes.forEach(n => expect(n.getAttribute('class')).toBe('subtext'));

      collection.addClass('subtext2');
      nodes.forEach(n => expect(n.getAttribute('class')).toBe('subtext subtext2'));
    });
  });

  describe('removeClass', () => {
    test('removes classes from each element', () => {
      const nodes = createEls('a', 2);
      const collection = new DOMNodeCollection(nodes);
      collection.addClass('subtext');
      collection.addClass('subtext2');
      nodes.forEach(n => expect(n.getAttribute('class')).toBe('subtext subtext2'));
      collection.removeClass('subtext');
      nodes.forEach(n => expect(n.getAttribute('class')).toBe('subtext2'));
      collection.removeClass('subtext2');
      nodes.forEach(n => expect(n.getAttribute('class')).toBe(''));
      collection.removeClass('subtext2');
      nodes.forEach(n => expect(n.getAttribute('class')).toBe(''));
    });
  });

  describe('children', () => {
    test('returns empty collection if no children', () => {
      const nodes = createEls('a', 2);
      const children = (new DOMNodeCollection(nodes)).children();
      const expected = new DOMNodeCollection();
      expect(children.equals(expected)).toBe(true);
    });

    test('returns children as a collection', () => {
      const nodes = createEls('a', 2);
      const collection = new DOMNodeCollection(nodes);
      const [span] = createEls('span');

      collection.append(span);

      const children = collection.children();
      const expected = new DOMNodeCollection(createEls('span', 2));
      expect(children.equals(expected)).toBe(true);
    });
  });
});
