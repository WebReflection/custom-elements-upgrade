var customElementsUpgrade = (function (exports) {
  'use strict';

  const {keys} = Object;

  const expando = element => {
    const key = keys(element);
    const value = [];
    const ignore = new Set;
    const {length} = key;
    for (let i = 0; i < length; i++) {
      value[i] = element[key[i]];
      try {
        delete element[key[i]];
      }
      catch (SafariTP) {
        ignore.add(i);
      }
    }
    return () => {
      for (let i = 0; i < length; i++)
        ignore.has(i) || (element[key[i]] = value[i]);
    };
  };

  const attributes = element => {
    const {attributeChangedCallback, constructor} = element;
    if (attributeChangedCallback) {
      const {observedAttributes} = constructor;
      if (observedAttributes) {
        const {length} = observedAttributes;
        for (let i = 0; i < length; i++) {
          const name = observedAttributes[i];
          const value = element.getAttribute(name);
          if (value != null)
            attributeChangedCallback.call(element, name, null, value);
        }
      }
    }
  };

  exports.attributes = attributes;
  exports.expando = expando;

  return exports;

})({});
