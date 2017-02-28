class DOMNodeCollection {
  constructor(HTMLElements) {
    this.HTMLElements = HTMLElements;
  }

  html(string) {
    if (string) {
      this.HTMLElements.forEach((el) => {
        el.innerHTML = string;
      });
      return this.HTMLElements;
    }
    return this.HTMLElements[0].innerHTML;
  }

  empty() {
    this.HTMLElements.forEach((el) => {
      el.innerHTML = '';
    });
  }

  append(children) {
    if (typeof children === 'string') {
      this.HTMLElements.forEach((parent) => {
        parent.innerHTML += children;
      });
    } else if (children instanceof HTMLElement) {
      this.HTMLElements.forEach((parent) => {
        parent.appendChild(children);
      });
    } else {
      this.HTMLElements.forEach((parent) => {
        children.HTMLElements.forEach((child) => {
          parent.appendChild(child);
        });
      });
    }
  }

  attr(attributeName, value) {
    if (value) {
      this.HTMLElements.forEach((element) => {
        element.setAttribute(attributeName, value);
      });
      return this.HTMLElements;
    }
    return this.HTMLElements[0].getAttribute(attributeName);
  }

  addClass(className) {
    this.HTMLElements.forEach((element) => {
      let elClass = element.getAttribute('class');
      elClass += ` ${className}`;
      element.setAttribute('class', elClass);
    });
  }

  removeClass(className) {
    this.HTMLElements.forEach((element) => {
      const removingClasses = className.split(' ');
      const elClass = element.getAttribute('class');
      const classes = elClass.split(' ')
        .filter(el => !removingClasses.includes(el));
      element.setAttribute('class', classes.join(' '));
    });
  }

  children() {
    let childNodes = [];
    this.HTMLElements.forEach((parent) => {
      const pChildren = Array.prototype.slice.call(parent.children);
      childNodes = childNodes.concat(pChildren);
    });
    return new DOMNodeCollection(childNodes);
  }

  parent() {
    const parents = [];
    this.HTMLElements.forEach((child) => {
      if (parents.every(p => !p.isEqualNode(child.parentNode))) {
        parents.push(child.parentNode);
      }
    });
    return new DOMNodeCollection(parents);
  }

  find(selector) {
    let matchingDescendents = [];
    this.HTMLElements.forEach((parent) => {
      const pDescendents = Array.prototype.slice.call(parent.querySelectorAll(selector));
      matchingDescendents = matchingDescendents.concat(pDescendents);
    });
    return new DOMNodeCollection(matchingDescendents);
  }

  remove() {
    this.HTMLElements.forEach((el) => {
      el.outerHTML = '';
    });
  }

  on(type, func) {
    const eventType = `dom-helper-${type}`;
    this.HTMLElements.forEach((el) => {
      el.addEventListener(type, func);
      if (Array.isArray(el[eventType])) {
        el[eventType].push(func);
      } else {
        el[eventType] = [func];
      }
    });
  }

  off(type) {
    this.HTMLElements.forEach((el) => {
      const eventType = `dom-helper-${type}`;
      el[eventType].forEach((func) => {
        el.removeEventListener(type, func);
      });
      el[eventType] = undefined;
    });
  }

}

export default DOMNodeCollection;
