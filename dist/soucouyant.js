(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.o0 = factory();
})(this, function () {
  'use strict';

  var setFn = function setFn(attrObj, attrValue) {
    //console.log(this.element);
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

  function selector() {
    var args = arguments,
        selectByName,
        getEl,
        newProperty,
        selectorValue,
        setGetEl,
        fourthOption,
        i;

    function getElement(getElementType, selectorValueName) {
      return document[getElementType](selectorValueName);
    }

    setGetEl = (function () {
      if (selectByName === 'tag' || selectByName === '@') {
        getEl = 'getElementsByTagName';
      }

      if (selectByName === 'class' || selectByName === '.') {
        getEl = 'getElementsByClassName';
      }
    })();

    function getFirstElementOfCollection(iter) {
      if (args[iter].length === 3) {
        newProperty = getElement(getEl, selectorValue)[0];
      }
    }

    function getElementsFromCollection(iter) {
      if (fourthOption === 'all') {
        newProperty = [getElement(getEl, selectorValue), 'all'];
      } else if (fourthOption === 'col') {
        if (args[iter].length === 5) {
          var eqq = args[iter][4];
          newProperty = getElement(getEl, selectorValue)[eqq];
        } else {
          newProperty = getElement(getEl, selectorValue);
        }
      } else if (fourthOption === 'last') {
        var collection = getElement(getEl, selectorValue);
        if (args[iter].length === 5) {
          var eq = args[iter][4] - 1;
          newProperty = collection[collection.length + eq];
        } else {
          newProperty = collection[collection.length - 1];
        }
      }
    }

    for (i = 0; i < args.length; i++) {
      selectByName = args[i][1];
      selectorValue = args[i][2];
      fourthOption = args[i][3];
      if (selectByName === 'id' || selectByName === '#') {
        newProperty = getElement('getElementById', selectorValue);
      } else {
        setGetEl();
        getFirstElementOfCollection(i);
        getElementsFromCollection(i);
      }

      o0[args[i][0]] = newProperty;
    }
  }

  function Soucouyant(element) {
    if (element.nodeType === 1) {
      return {
        set: function set() {
          this.element = element;
          return setFn.apply(this, arguments);
        },

        get: function get() {
          this.element = element;
          return getFn.apply(this, arguments);
        }
      };
    } else if (Array.isArray(element)) {
      if (element[1] === 'all') {
        console.log('Loop though all');
      } else if (Array.isArray(arguments[0])) {
        selector.apply(this, arguments);
      }
    }
  }

  var index__o0 = Soucouyant;
  var index = index__o0;

  return index;
});
//# sourceMappingURL=./soucouyant.js.map