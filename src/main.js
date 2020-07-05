import DOMNodeCollection from './dom_node_collection';

const docReadyFunctions = [];

const $dh = (argument) => {
  let nodeList;
  const domNodes = [];
  switch (typeof argument) {
    case 'object':
      if (argument instanceof HTMLElement) {
        return new DOMNodeCollection([argument]);
      }
      if (argument.length) {
        const elements = Array.prototype.slice.call(argument);
        elements.forEach((el) => {
          if (el instanceof HTMLElement) {
            domNodes.push(el);
          }
        });
        return new DOMNodeCollection(domNodes);
      }
      return undefined;
    case 'function':
      docReadyFunctions.push(argument);
      return undefined;
    case 'string':
      nodeList = document.querySelectorAll(argument);
      nodeList.forEach((node) => domNodes.push(node));
      return new DOMNodeCollection(domNodes);
    default:
      return undefined;
  }
};

document.addEventListener('DOMContentLoaded', () => {
  docReadyFunctions.forEach((func) => func());
});

$dh.extend = (target, ...objects) => {
  const merged = target;
  objects.forEach((obj) => {
    Object.keys(obj).forEach((key) => {
      merged[key] = obj[key];
    });
  });
  return merged;
};

$dh.ajax = (options) => new Promise((success, error) => {
  const defaultOptions = {
    method: 'GET',
    url: document.location.pathname,
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    data: {},
  };
  const ajaxOptions = $dh.extend(defaultOptions, options);
  const xhRequest = new XMLHttpRequest();
  xhRequest.open(ajaxOptions.method, ajaxOptions.url, true);
  xhRequest.setRequestHeader('Content-Type', ajaxOptions.contentType);
  xhRequest.onload = () => {
    const response = JSON.parse(xhRequest.response);
    if (xhRequest.status === 200) {
      if (typeof ajaxOptions.sucesss === 'function') {
        ajaxOptions.success(response);
      } else {
        success(response);
      }
    } else if (typeof ajaxOptions.error === 'function') {
      ajaxOptions.error(response);
    } else {
      error(response);
    }
  };
  xhRequest.send(JSON.stringify(ajaxOptions.data));
});

window.$dh = $dh;
