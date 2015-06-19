export default function selector() {
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

  setGetEl = (function() {
    if (selectByName === 'tag' || selectByName === '@') {
      getEl = 'getElementsByTagName';
    }

    if (selectByName === 'class' || selectByName === '.') {
      getEl = 'getElementsByClassName';
    }
  }());

  function getFirstElementOfCollection(iter) {
    if (args[iter].length === 3) {
      newProperty = getElement(getEl, selectorValue)[0];
    }
  }

  function getElementsFromCollection(iter) {
    if (fourthOption === 'all') {
      newProperty = [getElement(getEl, selectorValue), 'all'];
    }

    else if (fourthOption === 'col') {
      if (args[iter].length === 5) {
        var eqq = args[iter][4];
        newProperty = getElement(getEl, selectorValue)[eqq];
      }

      else {
        newProperty = getElement(getEl, selectorValue);
      }

    }

    else if (fourthOption === 'last') {
      var collection = getElement(getEl, selectorValue);
      if (args[iter].length === 5) {
        var eq = args[iter][4] - 1;
        newProperty = collection[collection.length + eq];
      }

      else {
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
