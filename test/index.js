const {expando} = require('../cjs');

const object = {
  test: 'ok'
};

const update = expando(object);

console.assert(Object.keys(object).length === 0);

update();

console.assert(Object.keys(object).length === 1);
console.assert(JSON.stringify(object) === '{"test":"ok"}');
