import attrFn from './attr';
import getFn from './get';
function Soucouyant(element) {

  if (element.nodeType && element.nodeType === 1) {
    return {
    attr: function() {
          this.element = element;
          return attrFn.apply(this, arguments);
        },

    get: function() {
          this.element = element;
          return getFn.apply(this, arguments);
        }
  };
  }else if (Array.isArray(element) && element[0].nodeType === 1 && element[1] === 'all') {
    //  manipulate all
    alert('All elements in collection');
  }else if (Array.isArray(element) && Array.isArray(element[0])) {
    alert('Main Selector stuff');
  }
}

let o0 = Soucouyant;
export default o0;
