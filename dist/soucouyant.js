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
    for (var i = 0; i < arguments.length; i++) {
      // id
      if (arguments[i][1] === 'id' || arguments[i][1] === '#') {
        o0[arguments[i][0]] = document.getElementById(arguments[i][2]);
      } else {
        var getEl = '';
        // Collections getter
        if (arguments[i][1] === 'tag' || arguments[i][1] === '@') {
          getEl = 'getElementsByTagName';
        }

        if (arguments[i][1] === 'class' || arguments[i][1] === '.') {
          getEl = 'getElementsByClassName';
        }

        // Collections
        if (arguments[i].length === 3) {
          // no index
          o0[arguments[i][0]] = document[getEl](arguments[i][2])[0];
        } else if (arguments[i][3] === 'all') {
          // all for API only
          o0[arguments[i][0]] = [document[getEl](arguments[i][2]), 'all'];
        } else if (arguments[i][3] === 'col') {
          // Col with eq
          if (arguments[i].length === 5) {
            var eqq = arguments[i][4];
            o0[arguments[i][0]] = document[getEl](arguments[i][2])[eqq];
          } else {
            o0[arguments[i][0]] = document[getEl](arguments[i][2]);
          }
        } else if (arguments[i][3] === 'last') {
          // Last with eq
          var collection = document[getEl](arguments[i][2]);
          if (arguments[i].length === 5) {
            var eq = arguments[i][4] - 1;
            o0[arguments[i][0]] = collection[collection.length + eq];
          } else {
            o0[arguments[i][0]] = collection[collection.length - 1];
          }
        } // end of choices
      }
    } // End of fn
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
        alert('Loop though all');
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