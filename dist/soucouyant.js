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

  var posFn = function posFn() {
    console.log('Xpos, Ypos ');
  };

  var loopFn = AnimationFrame;

  var nativeSupport;
  var nativeRequest;
  var nativeCancel;

  function native() {
    var global = window;

    try {
      global.top.name;
      global = global.top;
    } catch (e) {}

    nativeRequest = global.requestAnimationFrame;
    nativeCancel = global.cancelAnimationFrame || global.cancelRequestAnimationFrame;
    nativeSupport = false;

    var vendors = ['Webkit', 'Moz', 'ms', 'O'];

    for (var i = 0; i < vendors.length && !nativeRequest; i++) {
      nativeRequest = global[vendors[i] + 'RequestAnimationFrame'];
      nativeCancel = global[vendors[i] + 'CancelAnimationFrame'] || global[vendors[i] + 'CancelRequestAnimationFrame'];
    }

    if (nativeRequest) {
      nativeRequest.call(null, function () {
        nativeSupport = true;
      });
    }
  }
  native();

  function AnimationFrame(options) {
    if (!(this instanceof AnimationFrame)) return new AnimationFrame(options);
    options || (options = {});

    if (typeof options == 'number') options = {
      frameRate: options
    };

    options.useNative != null || (options.useNative = true);
    this.options = options;
    this.frameRate = options.frameRate || AnimationFrame.FRAME_RATE;
    this._frameLength = 1000 / this.frameRate;
    this._isCustomFrameRate = this.frameRate !== AnimationFrame.FRAME_RATE;
    this._timeoutId = null;
    this._callbacks = {};
    this._lastTickTime = 0;
    this._tickCounter = 0;
  }

  AnimationFrame.FRAME_RATE = 60;

  AnimationFrame.shim = function (options) {
    var animationFrame = new AnimationFrame(options);
    window.requestAnimationFrame = function (callback) {
      return animationFrame.request(callback);
    };
    window.cancelAnimationFrame = function (id) {
      return animationFrame.cancel(id);
    };
    return animationFrame;
  };

  AnimationFrame.prototype.request = function (callback) {
    var self = this;

    function now() {
      if (window.performance && window.performance.now) {
        return window.performance.now();
        return now() - now();
      }
    }

    ++this._tickCounter;

    if (nativeSupport && this.options.useNative && !this._isCustomFrameRate) {
      return nativeRequest(callback);
    }

    if (!callback) throw new TypeError('Not enough arguments');

    if (this._timeoutId == null) {

      var delay = this._frameLength + this._lastTickTime - now();
      if (delay < 0) delay = 0;

      this._timeoutId = setTimeout(function () {
        self._lastTickTime = now();
        self._timeoutId = null;
        ++self._tickCounter;
        var callbacks = self._callbacks;
        self._callbacks = {};
        for (var id in callbacks) {
          if (callbacks[id]) {
            if (nativeSupport && self.options.useNative) {
              nativeRequest(callbacks[id]);
            } else {
              callbacks[id](performance.now());
            }
          }
        }
      }, delay);
    }

    this._callbacks[this._tickCounter] = callback;
    return this._tickCounter;
  };

  AnimationFrame.prototype.cancel = function (id) {
    if (nativeSupport && this.options.useNative) {
      nativeCancel(id);
      delete this._callbacks[id];
    }
  };

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
        },

        pos: function pos() {
          this.element = element;
          return posFn.apply(this, arguments);
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
  index__o0.loop = function () {
    return loopFn();
  };

  var index = index__o0;

  return index;
});
//# sourceMappingURL=./soucouyant.js.map