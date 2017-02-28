### DOM HELPER (DH)
:thumbsup: :thumbsup:

The **DOM Helper** is a light-weight JavaScript library designed to provide a more efficient interface with the HTML element nodes on a website.

---

> **The Document Object Model** (DOM) is a programming interface for HTML and XML documents [that] provides a structured representation of the document... as a group of nodes and objects that have properties and methods.
> - [Mozilla Developer Network] [MDN]

[MDN]: (https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)

> A **node** is the generic name for any type of object in the DOM hierarchy. A node could be:

>1. one of the built-in DOM elements, such as `document` or `document.body`

>2. it could be an HTML tag specified in the HTML, such as `<input>` or `<p>`

>3. or it could be a text node that is created by the system to hold a block of text inside another element

> In a nutshell, a node is any DOM object!
>   - [jfriend00][so-link1] on StackOverflow

[so-link1]: (http://stackoverflow.com/questions/9979172/difference-between-node-object-and-element-object/9979779#9979779)

> **Element** inherits from Node. Element objects actually represent the objects as specified in the HTML file by their tags, such as `<div id="content"></div>`... (Some Node objects are text nodes and they are not Element objects!)
> - [太極者無極而生][so-link2] on StackOverflow

[so-link2]: (http://stackoverflow.com/questions/9979172/difference-between-node-object-and-element-object/16014680#16014680)

---

## Methods

### :sparkles: (Magical) Factory Method

#### `$dh(selector/element(s)/function)`
Allows any HTML element(s) to be turned into a DOM Helper (DH) element collection, allowing access to all the awesome DOM Helper methods!

This method can also be used to set callback function(s), which will be executed when the entire document is loaded.

-*OMG, HOW?!*
```js
const docReadyFunctions = [];

$dh(argument) {
  if (typeof argument === 'function') {
    docReadyFunctions.push(argument);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  docReadyFunctions.forEach(func => func());
});
```

In total, this method can receive four different types of arguments:

1. *string*: selects all elements matching the given CSS selector and converts them into a DOM Helper collection
2. *single HTML element*: converts element to a DOM Helper collection
3. *array of HTML elements*: converts elements to a DOM Helper collection
4. *function*: adds function to a collection of function which will execute as soon as the the entire document is loaded

### :mountain_cableway: Traverse the Elements!

#### `parent()`
Returns a collection of the parent element(s) of the selected element(s).

#### `children()`
Returns a collection of the child element(s) of the selected element(s).

#### `find(selector)`
Returns a collection of all descendent element(s) of the selected element(s) that match the given selector.

### :pencil2: Adding and Editing Elements

#### `html(string [opt'l])`
Returns the inner HTML of any node. Also accepts a string as an argument which will become the innerHTML of the element(s).

#### `append(string/element/DH collection)`
Appends the given argument to the end of the inner HTML of the selected element(s). Accepts a string, HTML element, or DOM Helper collection as its argument.

#### `addClass(className)`
Adds the given className to the DH collection.

#### `removeClass(className)`
Removes the given className from the DH collection.

#### `attr(attributeName, value [opt'l])`
Returns the value of an attribute for the selected node(s). Use the second argument to set the value of the attribute.

#### `empty()`
Empties the inner content of the element(s) in the DH collection.

#### `remove()`
Removes the element(s) in the DH collection as well as any of their content entirely.

### :balloon: Events!

#### `on(eventType, callback)`
Sets an event handler of a specific eventType on the selected node(s), that executes a given callback function. This method can be used to set multiple functions on the same event type.

Event types include: `'click'`, `'dblclick'`, `'mouseover'`, `'keypress'`, `'select'`, etc. Full list on [MDN](https://developer.mozilla.org/en-US/docs/Web/Events)! :wine_glass:

-*THE CODE!*

```js
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
```

#### `off(eventType)`
Turns off all event handlers of a given eventType.

### AJAX

#### `$dh.ajax(options)`
Makes an asynchronous XMLHTTPRequest to request, send, display, and/or use data from a web server.  Takes an options object as its arguments -- the options and their defaults include:

option | default
--- | ---
method | `'get'`
url | `document.location.pathname`
contentType | `'application/x-www-form-urlencoded; charset=UTF-8'`
data | `{}`
success | `() => {}`
error | `() => {}`

*** This method uses `$dh.extends(target, options)` to merge the options argument with the default values.
