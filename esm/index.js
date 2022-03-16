const {keys} = Object;

export const expando = element => {
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

export const attributes = element => {
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
