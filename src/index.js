import attrFn from './attr';
import getFn from './get';
function Soucouyant(element) {
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
}
let o0 = Soucouyant;
export default o0;
