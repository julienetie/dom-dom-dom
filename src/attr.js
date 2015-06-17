export default function(attrObj, attrValue) {
    console.log(this.element);
    if (typeof attrObj === 'object' && arguments.length === 1) {
      let attributes;
      for (attributes in attrObj) {
        this.element.setAttributeNS(null, attributes, attrObj[attributes]);
      }
    } else if (typeof attrObj === 'object' && typeof attrValue === 'string' || 'number') {
      this.element.setAttributeNS(null, attrObj, attrValue);
    } else {
      throw this.element;
    }

    return this;
  }

