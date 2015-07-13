export default function(attrObj, attrValue) {
  var strOrNum = typeof attrValue === 'string' || 'number';
  if (typeof attrObj === 'object' && arguments.length === 1) {
    let attributes;
    for (attributes in attrObj) {
      this.element.setAttributeNS(null, attributes, attrObj[attributes]);
    }
  } else if (typeof attrObj === 'object' && strOrNum) {
    this.element.setAttributeNS(null, attrObj, attrValue);
  } else {
    throw this.element;
  }
  return this;
}
