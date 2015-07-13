export default AnimationFrame;
/**
 * A modified version of animation-frame by Oleg Slobodskoi
 * @website https://github.com/kof/animationFrame
 * @license MIT
 */

var global = window, request, cancel, supported, nativeImpl, i;

// Test if we are within a foreign domain. Use raf from the top if possible.
try {
  // Accessing .name will throw SecurityError within a foreign domain.
  global.top.name;
  global = global.top;
} catch (e) {}

request = global.requestAnimationFrame;
cancel = global.cancelAnimationFrame || global.cancelRequestAnimationFrame;
supported = false;

var vendors = ['Webkit', 'Moz', 'ms', 'O'];

// Grab the native implementation.
for (i = 0; i < vendors.length && !request; i++) {
  request = global[vendors[i] + 'RequestAnimationFrame'];
  cancel = global[vendors[i] + 'CancelAnimationFrame'] ||
    global[vendors[i] + 'CancelRequestAnimationFrame'];
}

// Test if native implementation works.
// There are some issues on ios6
// http://shitwebkitdoes.tumblr.com/post/47186945856/
// native-requestanimationframe-broken-on-ios-6
// https://gist.github.com/KrofDrakula/5318048

if (request) {
  request.call(null, function() {
    supported = true;
  });
}

var now = Date.now || new Date().getTime();
function perfnow(window) {
  // make sure we have an object to work with
  if (!('performance' in window)) {
    window.performance = {};
  }
  var perf = window.performance;
  window.performance.now = perf.now ||
    perf.mozNow || perf.msNow ||
    perf.oNow || perf.webkitNow ||
    now();
}
perfnow(window);
// Weird native implementation doesn't work if context is defined.
var nativeRequest = request, nativeCancel = cancel;

/**
 * Animation frame constructor.
 *
 * Options:
 *   - `useNative` use the native animation frame if possible, defaults to true
 *   - `frameRate` pass a custom frame rate
 *
 * @param {Object|Number} options
 */
function AnimationFrame(options) {
  if (!(this instanceof AnimationFrame)) {
    return new AnimationFrame(options);
  }
  options || (options = {});

  // Its a frame rate.
  if (typeof options == 'number') {
    options = {frameRate: options};
  }
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
/**
 * Default frame rate used for shim implementation. Native implementation
 * will use the screen frame rate, but js have no way to detect it.
 *
 * If you know your target device, define it manually.
 *
 * @type {Number}
 * @api public
 */
AnimationFrame.FRAME_RATE = 60;
/**
 * Replace the globally defined implementation or define it globally.
 *
 * @param {Object|Number} [options]
 * @api public
 */
AnimationFrame.shim = function(options) {
  var animationFrame = new AnimationFrame(options);
  window.requestAnimationFrame = function(callback) {
    return animationFrame.request(callback);
  }
  window.cancelAnimationFrame = function(id) {
    return animationFrame.cancel(id);
  }
  return animationFrame;
}

/**
 * Request animation frame.
 * We will use the native RAF as soon as we know it does works.
 *
 * @param {Function} callback
 * @return {Number} timeout id or requested animation frame id
 * @api public
 */
AnimationFrame.prototype.request = function(callback) {
  var self = this;
  // Alawys inc counter to ensure it never has a conflict with the native
  // counter.
  // After the feature test phase we don't know exactly which implementation
  // has been used.
  // Therefore on #cancel we do it for both.
  ++this._tickCounter;

  if (supported && this.options.useNative && !this._isCustomFrameRate) {
    return nativeRequest(callback);
  }

  if (!callback) {
    throw new TypeError('Not enough arguments');
  }
  if (this._timeoutId == null) {
    var delay = this._frameLength + this._lastTickTime - now();
    if (delay < 0) {
      delay = 0;
    }
    this._timeoutId = setTimeout(function() {
      self._lastTickTime = now();
      self._timeoutId = null;
      ++self._tickCounter;
      var callbacks = self._callbacks;
      self._callbacks = {};
      for (var id in callbacks) {
        if (callbacks[id]) {
          if (supported && self.options.useNative) {
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
}
/**
 * Cancel animation frame.
 *
 * @param {Number} timeout id or requested animation frame id
 *
 * @api public
 */
AnimationFrame.prototype.cancel = function(id) {
  if (supported && this.options.useNative) {
    nativeCancel(id);
  }
  delete this._callbacks[id];
}
