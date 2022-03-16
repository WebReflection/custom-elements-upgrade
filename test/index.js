const {attributes, expando} = require('../cjs');

const object = {
  test: 'ok'
};

const update = expando(object);

console.assert(Object.keys(object).length === 0);

update();

console.assert(Object.keys(object).length === 1);
console.assert(JSON.stringify(object) === '{"test":"ok"}');

const args = [];
class Observed {
  static get observedAttributes() { return ['a']; }
  constructor(attributes) {
    this.attributes = attributes;
  }
  getAttribute(name) {
    return this.attributes[name];
  }
  attributeChangedCallback(name, _, newValue) {
    args.push([name, newValue]);
  }
}

const element = new Observed({a: '1'});

attributes(object);
attributes(element);

console.assert(args.length === 1);
console.assert(args[0].join('-') === 'a-1');
