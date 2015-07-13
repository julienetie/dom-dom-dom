/**
 * Imports common methods into the core
 */
import setFn from './set';
import getFn from './get';
import posFn from './pos';
/**
 * The selector function is the main function of o0() enabling organised
 * selector declarations that are added as methods to the o0 object.
 */
import selectorFn from './selector';
/*
 * The loop function supplies better and fully compatible
 * requestAnimationFrame/ cancelAnimationFrame abilities.
 */
import loopFn from './loop';

// Defined Methods

function Soucouyant(element) {
  if (element.nodeType === 1) {
    return {
      /**
       * Sets attributes to the current selector.
       * @param {Object} attrObj - An object of attributes & values as key-
       * value pairs. Expects hyphonated attributes key names to be strings.
       * @param {String} attrObj - The attribute type as a string.
       * @param {String} attrValue - The attribute value to be applied.
       * @param {Number} attrValue - The attribute value to be applied.
       */
      set: function() {
        this.element = element;
        return setFn.apply(this, arguments);
      },

      get: function() {
        this.element = element;
        return getFn.apply(this, arguments);
      },

      pos: function() {
        this.element = element;
        return posFn.apply(this, arguments);
      }
    };
  } else if (Array.isArray(element)) {
    if (element[1] === 'all') {
      console.log('Loop though all');
    } else if (Array.isArray(arguments[0])) {
      selectorFn.apply(this, arguments);

    }
  }

}

let o0 = Soucouyant;
o0.loop = function() {
  return loopFn();
};

export default o0;
