export default function selector() {
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
      if (arguments[i].length === 3) { // no index
        o0[arguments[i][0]] = document[getEl](arguments[i][2])[0];
      }

      else if (arguments[i][3] === 'all') { // all for API only
        o0[arguments[i][0]] = [document[getEl](arguments[i][2]), 'all'];
      }

      else if (arguments[i][3] === 'col') { // Col with eq
        if (arguments[i].length === 5) {
          var eqq = arguments[i][4];
          o0[arguments[i][0]] = document[getEl](arguments[i][2])[eqq];
        }

        else {
          o0[arguments[i][0]] = document[getEl](arguments[i][2]);
        }

      }

      else if (arguments[i][3] === 'last') { // Last with eq
        var collection = document[getEl](arguments[i][2]);
        if (arguments[i].length === 5) {
          var eq = arguments[i][4] - 1;
          o0[arguments[i][0]] = collection[collection.length + eq];
        }

        else {
          o0[arguments[i][0]] = collection[collection.length - 1];
        }

      } // end of choices
    }
  } // End of fn
}
