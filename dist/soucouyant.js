(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.o0 = factory();
})(this, function () {
  'use strict';

  var attrFn = function attrFn(attrObj, attrValue) {
    console.log(this.element);
    if (typeof attrObj === 'object' && arguments.length === 1) {
      var attributes = undefined;
      for (attributes in attrObj) {
        this.element.setAttributeNS(null, attributes, attrObj[attributes]);
      }
    } else if (typeof attrObj === 'object' && typeof attrValue === 'string' || 'number') {
      this.element.setAttributeNS(null, attrObj, attrValue);
    } else {
      throw this.element;
    }

    return this;
  };

  var getFn = function getFn() {
    if (arguments.length === 1) {
      return this.element.getAttribute(arguments[0]);
    }

    return this;
  };

  function Soucouyant(element) {

    if (element.nodeType && element.nodeType === 1) {
      return {
        attr: function attr() {
          this.element = element;
          return attrFn.apply(this, arguments);
        },

        get: function get() {
          this.element = element;
          return getFn.apply(this, arguments);
        }
      };
    } else if (Array.isArray(element) && element[0].nodeType === 1 && element[1] === 'all') {
      //  manipulate all
      alert('All elements in collection');
    } else if (Array.isArray(element) && Array.isArray(element[0])) {
      alert('Main Selector stuff');
    }
  }

  var index__o0 = Soucouyant;
  var index = index__o0;

  return index;
});
//# sourceMappingURL=./soucouyant.js.map