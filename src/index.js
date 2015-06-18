import setFn from './set'; import getFn from './get';
import selectorFn from './selector';
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
        }
  };
  }else if (Array.isArray(element)) {
    if (element[1] === 'all') {
      alert('Loop though all');
    } else if (Array.isArray(arguments[0])) {
      selectorFn.apply(this, arguments);

    }
  }
}

let o0 = Soucouyant;
export default o0;
