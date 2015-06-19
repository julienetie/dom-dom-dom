export default AnimationFrame;
/**
 * A modified version of animation-frame by Oleg Slobodskoi
 * @website https://github.com/kof/animationFrame
 * @license MIT
 */

var nativeSupport;
var nativeRequest;
var nativeCancel;

function native() {
 var global = window;

 try {
  global.top.name;
  global = global.top;
 } 
 catch (e) {}

 nativeRequest = global.requestAnimationFrame;
 nativeCancel = global.cancelAnimationFrame || global.cancelRequestAnimationFrame;
 nativeSupport = false;

 var vendors = ['Webkit', 'Moz', 'ms', 'O'];

 for (var i = 0; i < vendors.length && !nativeRequest; i++) {
  nativeRequest = global[vendors[i] + 'RequestAnimationFrame'];
  nativeCancel = global[vendors[i] + 'CancelAnimationFrame'] ||
   global[vendors[i] + 'CancelRequestAnimationFrame'];
 }

 if (nativeRequest) {
  nativeRequest.call(null, function() {
   nativeSupport = true;
  });
 }
}
native();


function AnimationFrame(options) {
 if (!(this instanceof AnimationFrame))
  return new AnimationFrame(options)
 options || (options = {})

 if (typeof options == 'number') options = {
  frameRate: options
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




AnimationFrame.FRAME_RATE = 60;

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


AnimationFrame.prototype.request = function(callback) {
 var self = this

function now() {
 if (window.performance && window.performance.now) {
  return window.performance.now();
  return now() - now();
 }
}


 ++this._tickCounter;

 if (nativeSupport && this.options.useNative && !this._isCustomFrameRate) {
  return nativeRequest(callback)
 }

 if (!callback) throw new TypeError('Not enough arguments')

 if (this._timeoutId == null) {

  var delay = this._frameLength + this._lastTickTime - now()
  if (delay < 0) delay = 0

  this._timeoutId = setTimeout(function() {
   self._lastTickTime = now()
   self._timeoutId = null
    ++self._tickCounter
   var callbacks = self._callbacks
   self._callbacks = {}
   for (var id in callbacks) {
    if (callbacks[id]) {
     if (nativeSupport && self.options.useNative) {
      nativeRequest(callbacks[id])
     } else {
      callbacks[id](performance.now())
     }
    }
   }
  }, delay);
 }

 this._callbacks[this._tickCounter] = callback;
 return this._tickCounter;
}

AnimationFrame.prototype.cancel = function(id) {
 if (nativeSupport && this.options.useNative) {
  nativeCancel(id);
  delete this._callbacks[id];
 }
}

