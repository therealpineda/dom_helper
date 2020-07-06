const createEls = (type, count = 1) => {
  const els = [];
  for (let i = 0; i < count; i += 1) {
    els.push(document.createElement(type));
  }
  return els;
};

module.exports = {
  createEls,
};
