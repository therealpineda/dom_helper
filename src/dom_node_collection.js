class DOMNodeCollection {
  constructor(nodes = []) {
    if (!Array.isArray(nodes)) {
      console.warn(DOMNodeCollection.CONSTRUCTOR_ERROR); // eslint-disable-line no-console
      nodes = []; // eslint-disable-line no-param-reassign
    }

    this.nodes = nodes;
    this.length = nodes.length;
  }

  // testing helper function
  equals(collection) {
    return this.length === collection.length
      && this.nodes.every((node, i) => node.isEqualNode(collection.nodes[i]));
  }

  html(string = null) {
    if (string) {
      // assigns html content of all elements
      this.nodes.forEach((node) => { node.innerHTML = string; });
      return this.nodes;
    }
    // returns for first-matched element
    return this.nodes[0].innerHTML;
  }

  empty() {
    // removes html content of all elements
    this.nodes.forEach((node) => { node.innerHTML = ''; });
  }

  append(children = null) {
    // uses cloneNode since same node can't be in multiple places
    if (typeof children === 'string') {
      this.nodes.forEach((node) => { node.innerHTML += children; });
    } else if (children instanceof HTMLElement) {
      this.nodes.forEach((node) => {
        node.appendChild(children.cloneNode(true));
      });
    } else if (children instanceof DOMNodeCollection) {
      this.nodes.forEach((node) => {
        children.nodes.forEach((child) => {
          node.appendChild(child.cloneNode(true));
        });
      });
    }
  }

  attr(attrName, value = null) {
    if (value) {
      this.nodes.forEach(node => node.setAttribute(attrName, value));
      return this.nodes;
    }
    return this.nodes[0].getAttribute(attrName);
  }

  addClass(className = '') {
    if (className) {
      this.nodes.forEach(node => node.classList.add(className));
    }
  }

  removeClass(className = '') {
    if (className) {
      this.nodes.forEach(node => node.classList.remove(className));
    }
  }

  children() {
    const nodes = this.nodes.reduce((arr, node) => arr.concat([...node.children]), []);

    return new DOMNodeCollection(nodes);
  }

  // return immediate parent of matching element(s)
  parent() {
    const parents = this.nodes.reduce((arr, node) => {
      const { parentNode } = node;
      // don't add the same parent node twice
      if (parentNode && arr.every(parent => !parent.isEqualNode(parentNode))) {
        arr.push(parentNode);
      }
      return arr;
    }, []);

    return new DOMNodeCollection(parents);
  }

  find(selector) {
    let matchingDescendents = [];
    this.nodes.forEach((parent) => {
      const pDescendents = Array.prototype.slice.call(parent.querySelectorAll(selector));
      matchingDescendents = matchingDescendents.concat(pDescendents);
    });
    return new DOMNodeCollection(matchingDescendents);
  }

  remove() {
    this.nodes.forEach((node) => { node.outerHTML = ''; });
  }

  on(type, func) {
    const eventType = `dom-helper-${type}`;
    this.nodes.forEach((el) => {
      el.addEventListener(type, func);
      if (Array.isArray(el[eventType])) {
        el[eventType].push(func);
      } else {
        el[eventType] = [func];
      }
    });
  }

  off(type) {
    this.nodes.forEach((el) => {
      const eventType = `dom-helper-${type}`;
      el[eventType].forEach((func) => {
        el.removeEventListener(type, func);
      });
      el[eventType] = undefined;
    });
  }
}

DOMNodeCollection.CONSTRUCTOR_ERROR = new Error('Invalid argument for DOMNodeCollection constructor, must be array of DOM nodes');

module.exports = DOMNodeCollection;
