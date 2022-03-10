'use strict';
const {keys} = Object;

const expando = element => {
  const key = keys(element);
  const value = [];
  const {length} = key;
  for (let i = 0; i < length; i++) {
    value[i] = element[key[i]];
    delete element[key[i]];
  }
  return () => {
    for (let i = 0; i < length; i++)
      element[key[i]] = value[i];
  };
};
exports.expando = expando;
