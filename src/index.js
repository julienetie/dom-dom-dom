import setFn from './set'; import getFn from './get';
import selectorFn from './selector'; import posFn from './pos';
import loopFn from './loop';

// Defined Methods

function Soucouyant(element) {
  if (element.nodeType === 1) {
    return {
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
  }else if (Array.isArray(element)) {
    if (element[1] === 'all') {
      console.log('Loop though all');
    } else if (Array.isArray(arguments[0])) {
      selectorFn.apply(this, arguments);

    }
  }
}

let o0 = Soucouyant;
o0.loop = function(){
  return loopFn();
};

export default o0;
