var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/obliterator/iterator.js
var require_iterator = __commonJS({
  "node_modules/obliterator/iterator.js"(exports, module) {
    function Iterator(next) {
      if (typeof next !== "function")
        throw new Error("obliterator/iterator: expecting a function!");
      this.next = next;
    }
    if (typeof Symbol !== "undefined")
      Iterator.prototype[Symbol.iterator] = function() {
        return this;
      };
    Iterator.of = function() {
      var args = arguments, l = args.length, i = 0;
      return new Iterator(function() {
        if (i >= l)
          return { done: true };
        return { done: false, value: args[i++] };
      });
    };
    Iterator.empty = function() {
      var iterator = new Iterator(function() {
        return { done: true };
      });
      return iterator;
    };
    Iterator.fromSequence = function(sequence) {
      var i = 0, l = sequence.length;
      return new Iterator(function() {
        if (i >= l)
          return { done: true };
        return { done: false, value: sequence[i++] };
      });
    };
    Iterator.is = function(value) {
      if (value instanceof Iterator)
        return true;
      return typeof value === "object" && value !== null && typeof value.next === "function";
    };
    module.exports = Iterator;
  }
});

// node_modules/obliterator/support.js
var require_support = __commonJS({
  "node_modules/obliterator/support.js"(exports) {
    exports.ARRAY_BUFFER_SUPPORT = typeof ArrayBuffer !== "undefined";
    exports.SYMBOL_SUPPORT = typeof Symbol !== "undefined";
  }
});

// node_modules/obliterator/foreach.js
var require_foreach = __commonJS({
  "node_modules/obliterator/foreach.js"(exports, module) {
    var support = require_support();
    var ARRAY_BUFFER_SUPPORT = support.ARRAY_BUFFER_SUPPORT;
    var SYMBOL_SUPPORT = support.SYMBOL_SUPPORT;
    module.exports = function forEach(iterable, callback) {
      var iterator, k2, i, l, s;
      if (!iterable)
        throw new Error("obliterator/forEach: invalid iterable.");
      if (typeof callback !== "function")
        throw new Error("obliterator/forEach: expecting a callback.");
      if (Array.isArray(iterable) || ARRAY_BUFFER_SUPPORT && ArrayBuffer.isView(iterable) || typeof iterable === "string" || iterable.toString() === "[object Arguments]") {
        for (i = 0, l = iterable.length; i < l; i++)
          callback(iterable[i], i);
        return;
      }
      if (typeof iterable.forEach === "function") {
        iterable.forEach(callback);
        return;
      }
      if (SYMBOL_SUPPORT && Symbol.iterator in iterable && typeof iterable.next !== "function") {
        iterable = iterable[Symbol.iterator]();
      }
      if (typeof iterable.next === "function") {
        iterator = iterable;
        i = 0;
        while (s = iterator.next(), s.done !== true) {
          callback(s.value, i);
          i++;
        }
        return;
      }
      for (k2 in iterable) {
        if (iterable.hasOwnProperty(k2)) {
          callback(iterable[k2], k2);
        }
      }
      return;
    };
  }
});

// node_modules/mnemonist/utils/typed-arrays.js
var require_typed_arrays = __commonJS({
  "node_modules/mnemonist/utils/typed-arrays.js"(exports) {
    var MAX_8BIT_INTEGER = Math.pow(2, 8) - 1;
    var MAX_16BIT_INTEGER = Math.pow(2, 16) - 1;
    var MAX_32BIT_INTEGER = Math.pow(2, 32) - 1;
    var MAX_SIGNED_8BIT_INTEGER = Math.pow(2, 7) - 1;
    var MAX_SIGNED_16BIT_INTEGER = Math.pow(2, 15) - 1;
    var MAX_SIGNED_32BIT_INTEGER = Math.pow(2, 31) - 1;
    exports.getPointerArray = function(size) {
      var maxIndex = size - 1;
      if (maxIndex <= MAX_8BIT_INTEGER)
        return Uint8Array;
      if (maxIndex <= MAX_16BIT_INTEGER)
        return Uint16Array;
      if (maxIndex <= MAX_32BIT_INTEGER)
        return Uint32Array;
      throw new Error("mnemonist: Pointer Array of size > 4294967295 is not supported.");
    };
    exports.getSignedPointerArray = function(size) {
      var maxIndex = size - 1;
      if (maxIndex <= MAX_SIGNED_8BIT_INTEGER)
        return Int8Array;
      if (maxIndex <= MAX_SIGNED_16BIT_INTEGER)
        return Int16Array;
      if (maxIndex <= MAX_SIGNED_32BIT_INTEGER)
        return Int32Array;
      return Float64Array;
    };
    exports.getNumberType = function(value) {
      if (value === (value | 0)) {
        if (Math.sign(value) === -1) {
          if (value <= 127 && value >= -128)
            return Int8Array;
          if (value <= 32767 && value >= -32768)
            return Int16Array;
          return Int32Array;
        } else {
          if (value <= 255)
            return Uint8Array;
          if (value <= 65535)
            return Uint16Array;
          return Uint32Array;
        }
      }
      return Float64Array;
    };
    var TYPE_PRIORITY = {
      Uint8Array: 1,
      Int8Array: 2,
      Uint16Array: 3,
      Int16Array: 4,
      Uint32Array: 5,
      Int32Array: 6,
      Float32Array: 7,
      Float64Array: 8
    };
    exports.getMinimalRepresentation = function(array, getter) {
      var maxType = null, maxPriority = 0, p, t, v2, i, l;
      for (i = 0, l = array.length; i < l; i++) {
        v2 = getter ? getter(array[i]) : array[i];
        t = exports.getNumberType(v2);
        p = TYPE_PRIORITY[t.name];
        if (p > maxPriority) {
          maxPriority = p;
          maxType = t;
        }
      }
      return maxType;
    };
    exports.isTypedArray = function(value) {
      return typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView(value);
    };
    exports.concat = function() {
      var length = 0, i, o, l;
      for (i = 0, l = arguments.length; i < l; i++)
        length += arguments[i].length;
      var array = new arguments[0].constructor(length);
      for (i = 0, o = 0; i < l; i++) {
        array.set(arguments[i], o);
        o += arguments[i].length;
      }
      return array;
    };
    exports.indices = function(length) {
      var PointerArray = exports.getPointerArray(length);
      var array = new PointerArray(length);
      for (var i = 0; i < length; i++)
        array[i] = i;
      return array;
    };
  }
});

// node_modules/mnemonist/utils/iterables.js
var require_iterables = __commonJS({
  "node_modules/mnemonist/utils/iterables.js"(exports) {
    var forEach = require_foreach();
    var typed = require_typed_arrays();
    function isArrayLike2(target) {
      return Array.isArray(target) || typed.isTypedArray(target);
    }
    function guessLength(target) {
      if (typeof target.length === "number")
        return target.length;
      if (typeof target.size === "number")
        return target.size;
      return;
    }
    function toArray(target) {
      var l = guessLength(target);
      var array = typeof l === "number" ? new Array(l) : [];
      var i = 0;
      forEach(target, function(value) {
        array[i++] = value;
      });
      return array;
    }
    function toArrayWithIndices(target) {
      var l = guessLength(target);
      var IndexArray = typeof l === "number" ? typed.getPointerArray(l) : Array;
      var array = typeof l === "number" ? new Array(l) : [];
      var indices = typeof l === "number" ? new IndexArray(l) : [];
      var i = 0;
      forEach(target, function(value) {
        array[i] = value;
        indices[i] = i++;
      });
      return [array, indices];
    }
    exports.isArrayLike = isArrayLike2;
    exports.guessLength = guessLength;
    exports.toArray = toArray;
    exports.toArrayWithIndices = toArrayWithIndices;
  }
});

// node_modules/mnemonist/lru-cache.js
var require_lru_cache = __commonJS({
  "node_modules/mnemonist/lru-cache.js"(exports, module) {
    var Iterator = require_iterator();
    var forEach = require_foreach();
    var typed = require_typed_arrays();
    var iterables = require_iterables();
    function LRUCache(Keys, Values, capacity) {
      if (arguments.length < 2) {
        capacity = Keys;
        Keys = null;
        Values = null;
      }
      this.capacity = capacity;
      if (typeof this.capacity !== "number" || this.capacity <= 0)
        throw new Error("mnemonist/lru-cache: capacity should be positive number.");
      else if (!isFinite(this.capacity) || Math.floor(this.capacity) !== this.capacity)
        throw new Error("mnemonist/lru-cache: capacity should be a finite positive integer.");
      var PointerArray = typed.getPointerArray(capacity);
      this.forward = new PointerArray(capacity);
      this.backward = new PointerArray(capacity);
      this.K = typeof Keys === "function" ? new Keys(capacity) : new Array(capacity);
      this.V = typeof Values === "function" ? new Values(capacity) : new Array(capacity);
      this.size = 0;
      this.head = 0;
      this.tail = 0;
      this.items = {};
    }
    LRUCache.prototype.clear = function() {
      this.size = 0;
      this.head = 0;
      this.tail = 0;
      this.items = {};
    };
    LRUCache.prototype.splayOnTop = function(pointer) {
      var oldHead = this.head;
      if (this.head === pointer)
        return this;
      var previous = this.backward[pointer], next = this.forward[pointer];
      if (this.tail === pointer) {
        this.tail = previous;
      } else {
        this.backward[next] = previous;
      }
      this.forward[previous] = next;
      this.backward[oldHead] = pointer;
      this.head = pointer;
      this.forward[pointer] = oldHead;
      return this;
    };
    LRUCache.prototype.set = function(key, value) {
      var pointer = this.items[key];
      if (typeof pointer !== "undefined") {
        this.splayOnTop(pointer);
        this.V[pointer] = value;
        return;
      }
      if (this.size < this.capacity) {
        pointer = this.size++;
      } else {
        pointer = this.tail;
        this.tail = this.backward[pointer];
        delete this.items[this.K[pointer]];
      }
      this.items[key] = pointer;
      this.K[pointer] = key;
      this.V[pointer] = value;
      this.forward[pointer] = this.head;
      this.backward[this.head] = pointer;
      this.head = pointer;
    };
    LRUCache.prototype.setpop = function(key, value) {
      var oldValue = null;
      var oldKey = null;
      var pointer = this.items[key];
      if (typeof pointer !== "undefined") {
        this.splayOnTop(pointer);
        oldValue = this.V[pointer];
        this.V[pointer] = value;
        return { evicted: false, key, value: oldValue };
      }
      if (this.size < this.capacity) {
        pointer = this.size++;
      } else {
        pointer = this.tail;
        this.tail = this.backward[pointer];
        oldValue = this.V[pointer];
        oldKey = this.K[pointer];
        delete this.items[oldKey];
      }
      this.items[key] = pointer;
      this.K[pointer] = key;
      this.V[pointer] = value;
      this.forward[pointer] = this.head;
      this.backward[this.head] = pointer;
      this.head = pointer;
      if (oldKey) {
        return { evicted: true, key: oldKey, value: oldValue };
      } else {
        return null;
      }
    };
    LRUCache.prototype.has = function(key) {
      return key in this.items;
    };
    LRUCache.prototype.get = function(key) {
      var pointer = this.items[key];
      if (typeof pointer === "undefined")
        return;
      this.splayOnTop(pointer);
      return this.V[pointer];
    };
    LRUCache.prototype.peek = function(key) {
      var pointer = this.items[key];
      if (typeof pointer === "undefined")
        return;
      return this.V[pointer];
    };
    LRUCache.prototype.forEach = function(callback, scope) {
      scope = arguments.length > 1 ? scope : this;
      var i = 0, l = this.size;
      var pointer = this.head, keys4 = this.K, values = this.V, forward = this.forward;
      while (i < l) {
        callback.call(scope, values[pointer], keys4[pointer], this);
        pointer = forward[pointer];
        i++;
      }
    };
    LRUCache.prototype.keys = function() {
      var i = 0, l = this.size;
      var pointer = this.head, keys4 = this.K, forward = this.forward;
      return new Iterator(function() {
        if (i >= l)
          return { done: true };
        var key = keys4[pointer];
        i++;
        if (i < l)
          pointer = forward[pointer];
        return {
          done: false,
          value: key
        };
      });
    };
    LRUCache.prototype.values = function() {
      var i = 0, l = this.size;
      var pointer = this.head, values = this.V, forward = this.forward;
      return new Iterator(function() {
        if (i >= l)
          return { done: true };
        var value = values[pointer];
        i++;
        if (i < l)
          pointer = forward[pointer];
        return {
          done: false,
          value
        };
      });
    };
    LRUCache.prototype.entries = function() {
      var i = 0, l = this.size;
      var pointer = this.head, keys4 = this.K, values = this.V, forward = this.forward;
      return new Iterator(function() {
        if (i >= l)
          return { done: true };
        var key = keys4[pointer], value = values[pointer];
        i++;
        if (i < l)
          pointer = forward[pointer];
        return {
          done: false,
          value: [key, value]
        };
      });
    };
    if (typeof Symbol !== "undefined")
      LRUCache.prototype[Symbol.iterator] = LRUCache.prototype.entries;
    LRUCache.prototype.inspect = function() {
      var proxy = /* @__PURE__ */ new Map();
      var iterator = this.entries(), step;
      while (step = iterator.next(), !step.done)
        proxy.set(step.value[0], step.value[1]);
      Object.defineProperty(proxy, "constructor", {
        value: LRUCache,
        enumerable: false
      });
      return proxy;
    };
    if (typeof Symbol !== "undefined")
      LRUCache.prototype[Symbol.for("nodejs.util.inspect.custom")] = LRUCache.prototype.inspect;
    LRUCache.from = function(iterable, Keys, Values, capacity) {
      if (arguments.length < 2) {
        capacity = iterables.guessLength(iterable);
        if (typeof capacity !== "number")
          throw new Error("mnemonist/lru-cache.from: could not guess iterable length. Please provide desired capacity as last argument.");
      } else if (arguments.length === 2) {
        capacity = Keys;
        Keys = null;
        Values = null;
      }
      var cache = new LRUCache(Keys, Values, capacity);
      forEach(iterable, function(value, key) {
        cache.set(key, value);
      });
      return cache;
    };
    module.exports = LRUCache;
  }
});

// node_modules/mnemonist/lru-map.js
var require_lru_map = __commonJS({
  "node_modules/mnemonist/lru-map.js"(exports, module) {
    var LRUCache = require_lru_cache();
    var forEach = require_foreach();
    var typed = require_typed_arrays();
    var iterables = require_iterables();
    function LRUMap(Keys, Values, capacity) {
      if (arguments.length < 2) {
        capacity = Keys;
        Keys = null;
        Values = null;
      }
      this.capacity = capacity;
      if (typeof this.capacity !== "number" || this.capacity <= 0)
        throw new Error("mnemonist/lru-map: capacity should be positive number.");
      else if (!isFinite(this.capacity) || Math.floor(this.capacity) !== this.capacity)
        throw new Error("mnemonist/lru-map: capacity should be a finite positive integer.");
      var PointerArray = typed.getPointerArray(capacity);
      this.forward = new PointerArray(capacity);
      this.backward = new PointerArray(capacity);
      this.K = typeof Keys === "function" ? new Keys(capacity) : new Array(capacity);
      this.V = typeof Values === "function" ? new Values(capacity) : new Array(capacity);
      this.size = 0;
      this.head = 0;
      this.tail = 0;
      this.items = /* @__PURE__ */ new Map();
    }
    LRUMap.prototype.clear = function() {
      this.size = 0;
      this.head = 0;
      this.tail = 0;
      this.items.clear();
    };
    LRUMap.prototype.set = function(key, value) {
      var pointer = this.items.get(key);
      if (typeof pointer !== "undefined") {
        this.splayOnTop(pointer);
        this.V[pointer] = value;
        return;
      }
      if (this.size < this.capacity) {
        pointer = this.size++;
      } else {
        pointer = this.tail;
        this.tail = this.backward[pointer];
        this.items.delete(this.K[pointer]);
      }
      this.items.set(key, pointer);
      this.K[pointer] = key;
      this.V[pointer] = value;
      this.forward[pointer] = this.head;
      this.backward[this.head] = pointer;
      this.head = pointer;
    };
    LRUMap.prototype.setpop = function(key, value) {
      var oldValue = null;
      var oldKey = null;
      var pointer = this.items.get(key);
      if (typeof pointer !== "undefined") {
        this.splayOnTop(pointer);
        oldValue = this.V[pointer];
        this.V[pointer] = value;
        return { evicted: false, key, value: oldValue };
      }
      if (this.size < this.capacity) {
        pointer = this.size++;
      } else {
        pointer = this.tail;
        this.tail = this.backward[pointer];
        oldValue = this.V[pointer];
        oldKey = this.K[pointer];
        this.items.delete(oldKey);
      }
      this.items.set(key, pointer);
      this.K[pointer] = key;
      this.V[pointer] = value;
      this.forward[pointer] = this.head;
      this.backward[this.head] = pointer;
      this.head = pointer;
      if (oldKey) {
        return { evicted: true, key: oldKey, value: oldValue };
      } else {
        return null;
      }
    };
    LRUMap.prototype.has = function(key) {
      return this.items.has(key);
    };
    LRUMap.prototype.get = function(key) {
      var pointer = this.items.get(key);
      if (typeof pointer === "undefined")
        return;
      this.splayOnTop(pointer);
      return this.V[pointer];
    };
    LRUMap.prototype.peek = function(key) {
      var pointer = this.items.get(key);
      if (typeof pointer === "undefined")
        return;
      return this.V[pointer];
    };
    LRUMap.prototype.splayOnTop = LRUCache.prototype.splayOnTop;
    LRUMap.prototype.forEach = LRUCache.prototype.forEach;
    LRUMap.prototype.keys = LRUCache.prototype.keys;
    LRUMap.prototype.values = LRUCache.prototype.values;
    LRUMap.prototype.entries = LRUCache.prototype.entries;
    if (typeof Symbol !== "undefined")
      LRUMap.prototype[Symbol.iterator] = LRUMap.prototype.entries;
    LRUMap.prototype.inspect = LRUCache.prototype.inspect;
    LRUMap.from = function(iterable, Keys, Values, capacity) {
      if (arguments.length < 2) {
        capacity = iterables.guessLength(iterable);
        if (typeof capacity !== "number")
          throw new Error("mnemonist/lru-cache.from: could not guess iterable length. Please provide desired capacity as last argument.");
      } else if (arguments.length === 2) {
        capacity = Keys;
        Keys = null;
        Values = null;
      }
      var cache = new LRUMap(Keys, Values, capacity);
      forEach(iterable, function(value, key) {
        cache.set(key, value);
      });
      return cache;
    };
    module.exports = LRUMap;
  }
});

// node_modules/ms/index.js
var require_ms = __commonJS({
  "node_modules/ms/index.js"(exports, module) {
    var s = 1e3;
    var m = s * 60;
    var h2 = m * 60;
    var d = h2 * 24;
    var w2 = d * 7;
    var y = d * 365.25;
    module.exports = function(val, options) {
      options = options || {};
      var type3 = typeof val;
      if (type3 === "string" && val.length > 0) {
        return parse(val);
      } else if (type3 === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
      );
    };
    function parse(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        str
      );
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type3 = (match[2] || "ms").toLowerCase();
      switch (type3) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "weeks":
        case "week":
        case "w":
          return n * w2;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h2;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return Math.round(ms / d) + "d";
      }
      if (msAbs >= h2) {
        return Math.round(ms / h2) + "h";
      }
      if (msAbs >= m) {
        return Math.round(ms / m) + "m";
      }
      if (msAbs >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return plural(ms, msAbs, d, "day");
      }
      if (msAbs >= h2) {
        return plural(ms, msAbs, h2, "hour");
      }
      if (msAbs >= m) {
        return plural(ms, msAbs, m, "minute");
      }
      if (msAbs >= s) {
        return plural(ms, msAbs, s, "second");
      }
      return ms + " ms";
    }
    function plural(ms, msAbs, n, name) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
    }
  }
});

// node_modules/debug/src/common.js
var require_common = __commonJS({
  "node_modules/debug/src/common.js"(exports, module) {
    function setup(env) {
      createDebug.debug = createDebug;
      createDebug.default = createDebug;
      createDebug.coerce = coerce2;
      createDebug.disable = disable;
      createDebug.enable = enable;
      createDebug.enabled = enabled;
      createDebug.humanize = require_ms();
      createDebug.destroy = destroy;
      Object.keys(env).forEach((key) => {
        createDebug[key] = env[key];
      });
      createDebug.names = [];
      createDebug.skips = [];
      createDebug.formatters = {};
      function selectColor(namespace) {
        let hash = 0;
        for (let i = 0; i < namespace.length; i++) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i);
          hash |= 0;
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
      }
      createDebug.selectColor = selectColor;
      function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug2(...args) {
          if (!debug2.enabled) {
            return;
          }
          const self = debug2;
          const curr = Number(/* @__PURE__ */ new Date());
          const ms = curr - (prevTime || curr);
          self.diff = ms;
          self.prev = prevTime;
          self.curr = curr;
          prevTime = curr;
          args[0] = createDebug.coerce(args[0]);
          if (typeof args[0] !== "string") {
            args.unshift("%O");
          }
          let index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
            if (match === "%%") {
              return "%";
            }
            index++;
            const formatter = createDebug.formatters[format];
            if (typeof formatter === "function") {
              const val = args[index];
              match = formatter.call(self, val);
              args.splice(index, 1);
              index--;
            }
            return match;
          });
          createDebug.formatArgs.call(self, args);
          const logFn = self.log || createDebug.log;
          logFn.apply(self, args);
        }
        debug2.namespace = namespace;
        debug2.useColors = createDebug.useColors();
        debug2.color = createDebug.selectColor(namespace);
        debug2.extend = extend;
        debug2.destroy = createDebug.destroy;
        Object.defineProperty(debug2, "enabled", {
          enumerable: true,
          configurable: false,
          get: () => {
            if (enableOverride !== null) {
              return enableOverride;
            }
            if (namespacesCache !== createDebug.namespaces) {
              namespacesCache = createDebug.namespaces;
              enabledCache = createDebug.enabled(namespace);
            }
            return enabledCache;
          },
          set: (v2) => {
            enableOverride = v2;
          }
        });
        if (typeof createDebug.init === "function") {
          createDebug.init(debug2);
        }
        return debug2;
      }
      function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
      }
      function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        let i;
        const split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
        const len = split.length;
        for (i = 0; i < len; i++) {
          if (!split[i]) {
            continue;
          }
          namespaces = split[i].replace(/\*/g, ".*?");
          if (namespaces[0] === "-") {
            createDebug.skips.push(new RegExp("^" + namespaces.slice(1) + "$"));
          } else {
            createDebug.names.push(new RegExp("^" + namespaces + "$"));
          }
        }
      }
      function disable() {
        const namespaces = [
          ...createDebug.names.map(toNamespace),
          ...createDebug.skips.map(toNamespace).map((namespace) => "-" + namespace)
        ].join(",");
        createDebug.enable("");
        return namespaces;
      }
      function enabled(name) {
        if (name[name.length - 1] === "*") {
          return true;
        }
        let i;
        let len;
        for (i = 0, len = createDebug.skips.length; i < len; i++) {
          if (createDebug.skips[i].test(name)) {
            return false;
          }
        }
        for (i = 0, len = createDebug.names.length; i < len; i++) {
          if (createDebug.names[i].test(name)) {
            return true;
          }
        }
        return false;
      }
      function toNamespace(regexp) {
        return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
      }
      function coerce2(val) {
        if (val instanceof Error) {
          return val.stack || val.message;
        }
        return val;
      }
      function destroy() {
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
      createDebug.enable(createDebug.load());
      return createDebug;
    }
    module.exports = setup;
  }
});

// node_modules/debug/src/browser.js
var require_browser = __commonJS({
  "node_modules/debug/src/browser.js"(exports, module) {
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.storage = localstorage();
    exports.destroy = /* @__PURE__ */ (() => {
      let warned = false;
      return () => {
        if (!warned) {
          warned = true;
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
      };
    })();
    exports.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function formatArgs(args) {
      args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff);
      if (!this.useColors) {
        return;
      }
      const c2 = "color: " + this.color;
      args.splice(1, 0, c2, "color: inherit");
      let index = 0;
      let lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match) => {
        if (match === "%%") {
          return;
        }
        index++;
        if (match === "%c") {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c2);
    }
    exports.log = console.debug || console.log || (() => {
    });
    function save(namespaces) {
      try {
        if (namespaces) {
          exports.storage.setItem("debug", namespaces);
        } else {
          exports.storage.removeItem("debug");
        }
      } catch (error) {
      }
    }
    function load() {
      let r3;
      try {
        r3 = exports.storage.getItem("debug");
      } catch (error) {
      }
      if (!r3 && typeof process !== "undefined" && "env" in process) {
        r3 = process.env.DEBUG;
      }
      return r3;
    }
    function localstorage() {
      try {
        return localStorage;
      } catch (error) {
      }
    }
    module.exports = require_common()(exports);
    var { formatters } = module.exports;
    formatters.j = function(v2) {
      try {
        return JSON.stringify(v2);
      } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
      }
    };
  }
});

// node_modules/base64-js/index.js
var require_base64_js = __commonJS({
  "node_modules/base64-js/index.js"(exports) {
    "use strict";
    exports.byteLength = byteLength;
    exports.toByteArray = toByteArray;
    exports.fromByteArray = fromByteArray;
    var lookup = [];
    var revLookup = [];
    var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (i = 0, len = code.length; i < len; ++i) {
      lookup[i] = code[i];
      revLookup[code.charCodeAt(i)] = i;
    }
    var i;
    var len;
    revLookup["-".charCodeAt(0)] = 62;
    revLookup["_".charCodeAt(0)] = 63;
    function getLens(b64) {
      var len2 = b64.length;
      if (len2 % 4 > 0) {
        throw new Error("Invalid string. Length must be a multiple of 4");
      }
      var validLen = b64.indexOf("=");
      if (validLen === -1)
        validLen = len2;
      var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
      return [validLen, placeHoldersLen];
    }
    function byteLength(b64) {
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function _byteLength(b64, validLen, placeHoldersLen) {
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function toByteArray(b64) {
      var tmp;
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
      var curByte = 0;
      var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
      var i2;
      for (i2 = 0; i2 < len2; i2 += 4) {
        tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
        arr[curByte++] = tmp >> 16 & 255;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 2) {
        tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 1) {
        tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      return arr;
    }
    function tripletToBase64(num) {
      return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
    }
    function encodeChunk(uint8, start, end) {
      var tmp;
      var output = [];
      for (var i2 = start; i2 < end; i2 += 3) {
        tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
        output.push(tripletToBase64(tmp));
      }
      return output.join("");
    }
    function fromByteArray(uint8) {
      var tmp;
      var len2 = uint8.length;
      var extraBytes = len2 % 3;
      var parts = [];
      var maxChunkLength = 16383;
      for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
        parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
      }
      if (extraBytes === 1) {
        tmp = uint8[len2 - 1];
        parts.push(
          lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
        );
      } else if (extraBytes === 2) {
        tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
        parts.push(
          lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
        );
      }
      return parts.join("");
    }
  }
});

// node_modules/ieee754/index.js
var require_ieee754 = __commonJS({
  "node_modules/ieee754/index.js"(exports) {
    exports.read = function(buffer, offset, isLE, mLen, nBytes) {
      var e, m;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var nBits = -7;
      var i = isLE ? nBytes - 1 : 0;
      var d = isLE ? -1 : 1;
      var s = buffer[offset + i];
      i += d;
      e = s & (1 << -nBits) - 1;
      s >>= -nBits;
      nBits += eLen;
      for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {
      }
      m = e & (1 << -nBits) - 1;
      e >>= -nBits;
      nBits += mLen;
      for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {
      }
      if (e === 0) {
        e = 1 - eBias;
      } else if (e === eMax) {
        return m ? NaN : (s ? -1 : 1) * Infinity;
      } else {
        m = m + Math.pow(2, mLen);
        e = e - eBias;
      }
      return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
    };
    exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
      var e, m, c2;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var rt2 = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
      var i = isLE ? 0 : nBytes - 1;
      var d = isLE ? 1 : -1;
      var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
      value = Math.abs(value);
      if (isNaN(value) || value === Infinity) {
        m = isNaN(value) ? 1 : 0;
        e = eMax;
      } else {
        e = Math.floor(Math.log(value) / Math.LN2);
        if (value * (c2 = Math.pow(2, -e)) < 1) {
          e--;
          c2 *= 2;
        }
        if (e + eBias >= 1) {
          value += rt2 / c2;
        } else {
          value += rt2 * Math.pow(2, 1 - eBias);
        }
        if (value * c2 >= 2) {
          e++;
          c2 /= 2;
        }
        if (e + eBias >= eMax) {
          m = 0;
          e = eMax;
        } else if (e + eBias >= 1) {
          m = (value * c2 - 1) * Math.pow(2, mLen);
          e = e + eBias;
        } else {
          m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
          e = 0;
        }
      }
      for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
      }
      e = e << mLen | m;
      eLen += mLen;
      for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
      }
      buffer[offset + i - d] |= s * 128;
    };
  }
});

// node_modules/buffer/index.js
var require_buffer = __commonJS({
  "node_modules/buffer/index.js"(exports) {
    "use strict";
    var base64 = require_base64_js();
    var ieee754 = require_ieee754();
    var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
    exports.Buffer = Buffer3;
    exports.SlowBuffer = SlowBuffer;
    exports.INSPECT_MAX_BYTES = 50;
    var K_MAX_LENGTH = 2147483647;
    exports.kMaxLength = K_MAX_LENGTH;
    Buffer3.TYPED_ARRAY_SUPPORT = typedArraySupport();
    if (!Buffer3.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
      console.error(
        "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
      );
    }
    function typedArraySupport() {
      try {
        const arr = new Uint8Array(1);
        const proto = { foo: function() {
          return 42;
        } };
        Object.setPrototypeOf(proto, Uint8Array.prototype);
        Object.setPrototypeOf(arr, proto);
        return arr.foo() === 42;
      } catch (e) {
        return false;
      }
    }
    Object.defineProperty(Buffer3.prototype, "parent", {
      enumerable: true,
      get: function() {
        if (!Buffer3.isBuffer(this))
          return void 0;
        return this.buffer;
      }
    });
    Object.defineProperty(Buffer3.prototype, "offset", {
      enumerable: true,
      get: function() {
        if (!Buffer3.isBuffer(this))
          return void 0;
        return this.byteOffset;
      }
    });
    function createBuffer(length) {
      if (length > K_MAX_LENGTH) {
        throw new RangeError('The value "' + length + '" is invalid for option "size"');
      }
      const buf = new Uint8Array(length);
      Object.setPrototypeOf(buf, Buffer3.prototype);
      return buf;
    }
    function Buffer3(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        if (typeof encodingOrOffset === "string") {
          throw new TypeError(
            'The "string" argument must be of type string. Received type number'
          );
        }
        return allocUnsafe(arg);
      }
      return from(arg, encodingOrOffset, length);
    }
    Buffer3.poolSize = 8192;
    function from(value, encodingOrOffset, length) {
      if (typeof value === "string") {
        return fromString(value, encodingOrOffset);
      }
      if (ArrayBuffer.isView(value)) {
        return fromArrayView(value);
      }
      if (value == null) {
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
        );
      }
      if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      if (typeof value === "number") {
        throw new TypeError(
          'The "value" argument must not be of type number. Received type number'
        );
      }
      const valueOf = value.valueOf && value.valueOf();
      if (valueOf != null && valueOf !== value) {
        return Buffer3.from(valueOf, encodingOrOffset, length);
      }
      const b2 = fromObject(value);
      if (b2)
        return b2;
      if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
        return Buffer3.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
      }
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
      );
    }
    Buffer3.from = function(value, encodingOrOffset, length) {
      return from(value, encodingOrOffset, length);
    };
    Object.setPrototypeOf(Buffer3.prototype, Uint8Array.prototype);
    Object.setPrototypeOf(Buffer3, Uint8Array);
    function assertSize(size) {
      if (typeof size !== "number") {
        throw new TypeError('"size" argument must be of type number');
      } else if (size < 0) {
        throw new RangeError('The value "' + size + '" is invalid for option "size"');
      }
    }
    function alloc(size, fill, encoding) {
      assertSize(size);
      if (size <= 0) {
        return createBuffer(size);
      }
      if (fill !== void 0) {
        return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
      }
      return createBuffer(size);
    }
    Buffer3.alloc = function(size, fill, encoding) {
      return alloc(size, fill, encoding);
    };
    function allocUnsafe(size) {
      assertSize(size);
      return createBuffer(size < 0 ? 0 : checked(size) | 0);
    }
    Buffer3.allocUnsafe = function(size) {
      return allocUnsafe(size);
    };
    Buffer3.allocUnsafeSlow = function(size) {
      return allocUnsafe(size);
    };
    function fromString(string, encoding) {
      if (typeof encoding !== "string" || encoding === "") {
        encoding = "utf8";
      }
      if (!Buffer3.isEncoding(encoding)) {
        throw new TypeError("Unknown encoding: " + encoding);
      }
      const length = byteLength(string, encoding) | 0;
      let buf = createBuffer(length);
      const actual = buf.write(string, encoding);
      if (actual !== length) {
        buf = buf.slice(0, actual);
      }
      return buf;
    }
    function fromArrayLike(array) {
      const length = array.length < 0 ? 0 : checked(array.length) | 0;
      const buf = createBuffer(length);
      for (let i = 0; i < length; i += 1) {
        buf[i] = array[i] & 255;
      }
      return buf;
    }
    function fromArrayView(arrayView) {
      if (isInstance(arrayView, Uint8Array)) {
        const copy = new Uint8Array(arrayView);
        return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
      }
      return fromArrayLike(arrayView);
    }
    function fromArrayBuffer(array, byteOffset, length) {
      if (byteOffset < 0 || array.byteLength < byteOffset) {
        throw new RangeError('"offset" is outside of buffer bounds');
      }
      if (array.byteLength < byteOffset + (length || 0)) {
        throw new RangeError('"length" is outside of buffer bounds');
      }
      let buf;
      if (byteOffset === void 0 && length === void 0) {
        buf = new Uint8Array(array);
      } else if (length === void 0) {
        buf = new Uint8Array(array, byteOffset);
      } else {
        buf = new Uint8Array(array, byteOffset, length);
      }
      Object.setPrototypeOf(buf, Buffer3.prototype);
      return buf;
    }
    function fromObject(obj) {
      if (Buffer3.isBuffer(obj)) {
        const len = checked(obj.length) | 0;
        const buf = createBuffer(len);
        if (buf.length === 0) {
          return buf;
        }
        obj.copy(buf, 0, 0, len);
        return buf;
      }
      if (obj.length !== void 0) {
        if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
          return createBuffer(0);
        }
        return fromArrayLike(obj);
      }
      if (obj.type === "Buffer" && Array.isArray(obj.data)) {
        return fromArrayLike(obj.data);
      }
    }
    function checked(length) {
      if (length >= K_MAX_LENGTH) {
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
      }
      return length | 0;
    }
    function SlowBuffer(length) {
      if (+length != length) {
        length = 0;
      }
      return Buffer3.alloc(+length);
    }
    Buffer3.isBuffer = function isBuffer(b2) {
      return b2 != null && b2._isBuffer === true && b2 !== Buffer3.prototype;
    };
    Buffer3.compare = function compare(a, b2) {
      if (isInstance(a, Uint8Array))
        a = Buffer3.from(a, a.offset, a.byteLength);
      if (isInstance(b2, Uint8Array))
        b2 = Buffer3.from(b2, b2.offset, b2.byteLength);
      if (!Buffer3.isBuffer(a) || !Buffer3.isBuffer(b2)) {
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
        );
      }
      if (a === b2)
        return 0;
      let x2 = a.length;
      let y = b2.length;
      for (let i = 0, len = Math.min(x2, y); i < len; ++i) {
        if (a[i] !== b2[i]) {
          x2 = a[i];
          y = b2[i];
          break;
        }
      }
      if (x2 < y)
        return -1;
      if (y < x2)
        return 1;
      return 0;
    };
    Buffer3.isEncoding = function isEncoding(encoding) {
      switch (String(encoding).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return true;
        default:
          return false;
      }
    };
    Buffer3.concat = function concat3(list, length) {
      if (!Array.isArray(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }
      if (list.length === 0) {
        return Buffer3.alloc(0);
      }
      let i;
      if (length === void 0) {
        length = 0;
        for (i = 0; i < list.length; ++i) {
          length += list[i].length;
        }
      }
      const buffer = Buffer3.allocUnsafe(length);
      let pos = 0;
      for (i = 0; i < list.length; ++i) {
        let buf = list[i];
        if (isInstance(buf, Uint8Array)) {
          if (pos + buf.length > buffer.length) {
            if (!Buffer3.isBuffer(buf))
              buf = Buffer3.from(buf);
            buf.copy(buffer, pos);
          } else {
            Uint8Array.prototype.set.call(
              buffer,
              buf,
              pos
            );
          }
        } else if (!Buffer3.isBuffer(buf)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        } else {
          buf.copy(buffer, pos);
        }
        pos += buf.length;
      }
      return buffer;
    };
    function byteLength(string, encoding) {
      if (Buffer3.isBuffer(string)) {
        return string.length;
      }
      if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
        return string.byteLength;
      }
      if (typeof string !== "string") {
        throw new TypeError(
          'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string
        );
      }
      const len = string.length;
      const mustMatch = arguments.length > 2 && arguments[2] === true;
      if (!mustMatch && len === 0)
        return 0;
      let loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "ascii":
          case "latin1":
          case "binary":
            return len;
          case "utf8":
          case "utf-8":
            return utf8ToBytes(string).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return len * 2;
          case "hex":
            return len >>> 1;
          case "base64":
            return base64ToBytes(string).length;
          default:
            if (loweredCase) {
              return mustMatch ? -1 : utf8ToBytes(string).length;
            }
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer3.byteLength = byteLength;
    function slowToString(encoding, start, end) {
      let loweredCase = false;
      if (start === void 0 || start < 0) {
        start = 0;
      }
      if (start > this.length) {
        return "";
      }
      if (end === void 0 || end > this.length) {
        end = this.length;
      }
      if (end <= 0) {
        return "";
      }
      end >>>= 0;
      start >>>= 0;
      if (end <= start) {
        return "";
      }
      if (!encoding)
        encoding = "utf8";
      while (true) {
        switch (encoding) {
          case "hex":
            return hexSlice(this, start, end);
          case "utf8":
          case "utf-8":
            return utf8Slice(this, start, end);
          case "ascii":
            return asciiSlice(this, start, end);
          case "latin1":
          case "binary":
            return latin1Slice(this, start, end);
          case "base64":
            return base64Slice(this, start, end);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return utf16leSlice(this, start, end);
          default:
            if (loweredCase)
              throw new TypeError("Unknown encoding: " + encoding);
            encoding = (encoding + "").toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer3.prototype._isBuffer = true;
    function swap(b2, n, m) {
      const i = b2[n];
      b2[n] = b2[m];
      b2[m] = i;
    }
    Buffer3.prototype.swap16 = function swap16() {
      const len = this.length;
      if (len % 2 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      }
      for (let i = 0; i < len; i += 2) {
        swap(this, i, i + 1);
      }
      return this;
    };
    Buffer3.prototype.swap32 = function swap32() {
      const len = this.length;
      if (len % 4 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      }
      for (let i = 0; i < len; i += 4) {
        swap(this, i, i + 3);
        swap(this, i + 1, i + 2);
      }
      return this;
    };
    Buffer3.prototype.swap64 = function swap64() {
      const len = this.length;
      if (len % 8 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      }
      for (let i = 0; i < len; i += 8) {
        swap(this, i, i + 7);
        swap(this, i + 1, i + 6);
        swap(this, i + 2, i + 5);
        swap(this, i + 3, i + 4);
      }
      return this;
    };
    Buffer3.prototype.toString = function toString4() {
      const length = this.length;
      if (length === 0)
        return "";
      if (arguments.length === 0)
        return utf8Slice(this, 0, length);
      return slowToString.apply(this, arguments);
    };
    Buffer3.prototype.toLocaleString = Buffer3.prototype.toString;
    Buffer3.prototype.equals = function equals3(b2) {
      if (!Buffer3.isBuffer(b2))
        throw new TypeError("Argument must be a Buffer");
      if (this === b2)
        return true;
      return Buffer3.compare(this, b2) === 0;
    };
    Buffer3.prototype.inspect = function inspect() {
      let str = "";
      const max3 = exports.INSPECT_MAX_BYTES;
      str = this.toString("hex", 0, max3).replace(/(.{2})/g, "$1 ").trim();
      if (this.length > max3)
        str += " ... ";
      return "<Buffer " + str + ">";
    };
    if (customInspectSymbol) {
      Buffer3.prototype[customInspectSymbol] = Buffer3.prototype.inspect;
    }
    Buffer3.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
      if (isInstance(target, Uint8Array)) {
        target = Buffer3.from(target, target.offset, target.byteLength);
      }
      if (!Buffer3.isBuffer(target)) {
        throw new TypeError(
          'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target
        );
      }
      if (start === void 0) {
        start = 0;
      }
      if (end === void 0) {
        end = target ? target.length : 0;
      }
      if (thisStart === void 0) {
        thisStart = 0;
      }
      if (thisEnd === void 0) {
        thisEnd = this.length;
      }
      if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
        throw new RangeError("out of range index");
      }
      if (thisStart >= thisEnd && start >= end) {
        return 0;
      }
      if (thisStart >= thisEnd) {
        return -1;
      }
      if (start >= end) {
        return 1;
      }
      start >>>= 0;
      end >>>= 0;
      thisStart >>>= 0;
      thisEnd >>>= 0;
      if (this === target)
        return 0;
      let x2 = thisEnd - thisStart;
      let y = end - start;
      const len = Math.min(x2, y);
      const thisCopy = this.slice(thisStart, thisEnd);
      const targetCopy = target.slice(start, end);
      for (let i = 0; i < len; ++i) {
        if (thisCopy[i] !== targetCopy[i]) {
          x2 = thisCopy[i];
          y = targetCopy[i];
          break;
        }
      }
      if (x2 < y)
        return -1;
      if (y < x2)
        return 1;
      return 0;
    };
    function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
      if (buffer.length === 0)
        return -1;
      if (typeof byteOffset === "string") {
        encoding = byteOffset;
        byteOffset = 0;
      } else if (byteOffset > 2147483647) {
        byteOffset = 2147483647;
      } else if (byteOffset < -2147483648) {
        byteOffset = -2147483648;
      }
      byteOffset = +byteOffset;
      if (numberIsNaN(byteOffset)) {
        byteOffset = dir ? 0 : buffer.length - 1;
      }
      if (byteOffset < 0)
        byteOffset = buffer.length + byteOffset;
      if (byteOffset >= buffer.length) {
        if (dir)
          return -1;
        else
          byteOffset = buffer.length - 1;
      } else if (byteOffset < 0) {
        if (dir)
          byteOffset = 0;
        else
          return -1;
      }
      if (typeof val === "string") {
        val = Buffer3.from(val, encoding);
      }
      if (Buffer3.isBuffer(val)) {
        if (val.length === 0) {
          return -1;
        }
        return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
      } else if (typeof val === "number") {
        val = val & 255;
        if (typeof Uint8Array.prototype.indexOf === "function") {
          if (dir) {
            return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
          } else {
            return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
          }
        }
        return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
      }
      throw new TypeError("val must be string, number or Buffer");
    }
    function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
      let indexSize = 1;
      let arrLength = arr.length;
      let valLength = val.length;
      if (encoding !== void 0) {
        encoding = String(encoding).toLowerCase();
        if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
          if (arr.length < 2 || val.length < 2) {
            return -1;
          }
          indexSize = 2;
          arrLength /= 2;
          valLength /= 2;
          byteOffset /= 2;
        }
      }
      function read(buf, i2) {
        if (indexSize === 1) {
          return buf[i2];
        } else {
          return buf.readUInt16BE(i2 * indexSize);
        }
      }
      let i;
      if (dir) {
        let foundIndex = -1;
        for (i = byteOffset; i < arrLength; i++) {
          if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
            if (foundIndex === -1)
              foundIndex = i;
            if (i - foundIndex + 1 === valLength)
              return foundIndex * indexSize;
          } else {
            if (foundIndex !== -1)
              i -= i - foundIndex;
            foundIndex = -1;
          }
        }
      } else {
        if (byteOffset + valLength > arrLength)
          byteOffset = arrLength - valLength;
        for (i = byteOffset; i >= 0; i--) {
          let found = true;
          for (let j2 = 0; j2 < valLength; j2++) {
            if (read(arr, i + j2) !== read(val, j2)) {
              found = false;
              break;
            }
          }
          if (found)
            return i;
        }
      }
      return -1;
    }
    Buffer3.prototype.includes = function includes2(val, byteOffset, encoding) {
      return this.indexOf(val, byteOffset, encoding) !== -1;
    };
    Buffer3.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
    };
    Buffer3.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
    };
    function hexWrite(buf, string, offset, length) {
      offset = Number(offset) || 0;
      const remaining = buf.length - offset;
      if (!length) {
        length = remaining;
      } else {
        length = Number(length);
        if (length > remaining) {
          length = remaining;
        }
      }
      const strLen = string.length;
      if (length > strLen / 2) {
        length = strLen / 2;
      }
      let i;
      for (i = 0; i < length; ++i) {
        const parsed = parseInt(string.substr(i * 2, 2), 16);
        if (numberIsNaN(parsed))
          return i;
        buf[offset + i] = parsed;
      }
      return i;
    }
    function utf8Write(buf, string, offset, length) {
      return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
    }
    function asciiWrite(buf, string, offset, length) {
      return blitBuffer(asciiToBytes(string), buf, offset, length);
    }
    function base64Write(buf, string, offset, length) {
      return blitBuffer(base64ToBytes(string), buf, offset, length);
    }
    function ucs2Write(buf, string, offset, length) {
      return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
    }
    Buffer3.prototype.write = function write(string, offset, length, encoding) {
      if (offset === void 0) {
        encoding = "utf8";
        length = this.length;
        offset = 0;
      } else if (length === void 0 && typeof offset === "string") {
        encoding = offset;
        length = this.length;
        offset = 0;
      } else if (isFinite(offset)) {
        offset = offset >>> 0;
        if (isFinite(length)) {
          length = length >>> 0;
          if (encoding === void 0)
            encoding = "utf8";
        } else {
          encoding = length;
          length = void 0;
        }
      } else {
        throw new Error(
          "Buffer.write(string, encoding, offset[, length]) is no longer supported"
        );
      }
      const remaining = this.length - offset;
      if (length === void 0 || length > remaining)
        length = remaining;
      if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
        throw new RangeError("Attempt to write outside buffer bounds");
      }
      if (!encoding)
        encoding = "utf8";
      let loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "hex":
            return hexWrite(this, string, offset, length);
          case "utf8":
          case "utf-8":
            return utf8Write(this, string, offset, length);
          case "ascii":
          case "latin1":
          case "binary":
            return asciiWrite(this, string, offset, length);
          case "base64":
            return base64Write(this, string, offset, length);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return ucs2Write(this, string, offset, length);
          default:
            if (loweredCase)
              throw new TypeError("Unknown encoding: " + encoding);
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    };
    Buffer3.prototype.toJSON = function toJSON() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };
    function base64Slice(buf, start, end) {
      if (start === 0 && end === buf.length) {
        return base64.fromByteArray(buf);
      } else {
        return base64.fromByteArray(buf.slice(start, end));
      }
    }
    function utf8Slice(buf, start, end) {
      end = Math.min(buf.length, end);
      const res = [];
      let i = start;
      while (i < end) {
        const firstByte = buf[i];
        let codePoint = null;
        let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
        if (i + bytesPerSequence <= end) {
          let secondByte, thirdByte, fourthByte, tempCodePoint;
          switch (bytesPerSequence) {
            case 1:
              if (firstByte < 128) {
                codePoint = firstByte;
              }
              break;
            case 2:
              secondByte = buf[i + 1];
              if ((secondByte & 192) === 128) {
                tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                if (tempCodePoint > 127) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 3:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 4:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              fourthByte = buf[i + 3];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                  codePoint = tempCodePoint;
                }
              }
          }
        }
        if (codePoint === null) {
          codePoint = 65533;
          bytesPerSequence = 1;
        } else if (codePoint > 65535) {
          codePoint -= 65536;
          res.push(codePoint >>> 10 & 1023 | 55296);
          codePoint = 56320 | codePoint & 1023;
        }
        res.push(codePoint);
        i += bytesPerSequence;
      }
      return decodeCodePointsArray(res);
    }
    var MAX_ARGUMENTS_LENGTH = 4096;
    function decodeCodePointsArray(codePoints) {
      const len = codePoints.length;
      if (len <= MAX_ARGUMENTS_LENGTH) {
        return String.fromCharCode.apply(String, codePoints);
      }
      let res = "";
      let i = 0;
      while (i < len) {
        res += String.fromCharCode.apply(
          String,
          codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
        );
      }
      return res;
    }
    function asciiSlice(buf, start, end) {
      let ret = "";
      end = Math.min(buf.length, end);
      for (let i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i] & 127);
      }
      return ret;
    }
    function latin1Slice(buf, start, end) {
      let ret = "";
      end = Math.min(buf.length, end);
      for (let i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i]);
      }
      return ret;
    }
    function hexSlice(buf, start, end) {
      const len = buf.length;
      if (!start || start < 0)
        start = 0;
      if (!end || end < 0 || end > len)
        end = len;
      let out = "";
      for (let i = start; i < end; ++i) {
        out += hexSliceLookupTable[buf[i]];
      }
      return out;
    }
    function utf16leSlice(buf, start, end) {
      const bytes = buf.slice(start, end);
      let res = "";
      for (let i = 0; i < bytes.length - 1; i += 2) {
        res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
      }
      return res;
    }
    Buffer3.prototype.slice = function slice3(start, end) {
      const len = this.length;
      start = ~~start;
      end = end === void 0 ? len : ~~end;
      if (start < 0) {
        start += len;
        if (start < 0)
          start = 0;
      } else if (start > len) {
        start = len;
      }
      if (end < 0) {
        end += len;
        if (end < 0)
          end = 0;
      } else if (end > len) {
        end = len;
      }
      if (end < start)
        end = start;
      const newBuf = this.subarray(start, end);
      Object.setPrototypeOf(newBuf, Buffer3.prototype);
      return newBuf;
    };
    function checkOffset(offset, ext, length) {
      if (offset % 1 !== 0 || offset < 0)
        throw new RangeError("offset is not uint");
      if (offset + ext > length)
        throw new RangeError("Trying to access beyond buffer length");
    }
    Buffer3.prototype.readUintLE = Buffer3.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      let val = this[offset];
      let mul = 1;
      let i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      return val;
    };
    Buffer3.prototype.readUintBE = Buffer3.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        checkOffset(offset, byteLength2, this.length);
      }
      let val = this[offset + --byteLength2];
      let mul = 1;
      while (byteLength2 > 0 && (mul *= 256)) {
        val += this[offset + --byteLength2] * mul;
      }
      return val;
    };
    Buffer3.prototype.readUint8 = Buffer3.prototype.readUInt8 = function readUInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 1, this.length);
      return this[offset];
    };
    Buffer3.prototype.readUint16LE = Buffer3.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      return this[offset] | this[offset + 1] << 8;
    };
    Buffer3.prototype.readUint16BE = Buffer3.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      return this[offset] << 8 | this[offset + 1];
    };
    Buffer3.prototype.readUint32LE = Buffer3.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
    };
    Buffer3.prototype.readUint32BE = Buffer3.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
    };
    Buffer3.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const lo = first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
      const hi = this[++offset] + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24;
      return BigInt(lo) + (BigInt(hi) << BigInt(32));
    });
    Buffer3.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
      const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
      return (BigInt(hi) << BigInt(32)) + BigInt(lo);
    });
    Buffer3.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      let val = this[offset];
      let mul = 1;
      let i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      mul *= 128;
      if (val >= mul)
        val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer3.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      let i = byteLength2;
      let mul = 1;
      let val = this[offset + --i];
      while (i > 0 && (mul *= 256)) {
        val += this[offset + --i] * mul;
      }
      mul *= 128;
      if (val >= mul)
        val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer3.prototype.readInt8 = function readInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 1, this.length);
      if (!(this[offset] & 128))
        return this[offset];
      return (255 - this[offset] + 1) * -1;
    };
    Buffer3.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      const val = this[offset] | this[offset + 1] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer3.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      const val = this[offset + 1] | this[offset] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer3.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
    };
    Buffer3.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
    };
    Buffer3.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const val = this[offset + 4] + this[offset + 5] * 2 ** 8 + this[offset + 6] * 2 ** 16 + (last << 24);
      return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
    });
    Buffer3.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const val = (first << 24) + // Overflow
      this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
      return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last);
    });
    Buffer3.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, true, 23, 4);
    };
    Buffer3.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, false, 23, 4);
    };
    Buffer3.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, true, 52, 8);
    };
    Buffer3.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, false, 52, 8);
    };
    function checkInt(buf, value, offset, ext, max3, min) {
      if (!Buffer3.isBuffer(buf))
        throw new TypeError('"buffer" argument must be a Buffer instance');
      if (value > max3 || value < min)
        throw new RangeError('"value" argument is out of bounds');
      if (offset + ext > buf.length)
        throw new RangeError("Index out of range");
    }
    Buffer3.prototype.writeUintLE = Buffer3.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      let mul = 1;
      let i = 0;
      this[offset] = value & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        this[offset + i] = value / mul & 255;
      }
      return offset + byteLength2;
    };
    Buffer3.prototype.writeUintBE = Buffer3.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      let i = byteLength2 - 1;
      let mul = 1;
      this[offset + i] = value & 255;
      while (--i >= 0 && (mul *= 256)) {
        this[offset + i] = value / mul & 255;
      }
      return offset + byteLength2;
    };
    Buffer3.prototype.writeUint8 = Buffer3.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 1, 255, 0);
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer3.prototype.writeUint16LE = Buffer3.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };
    Buffer3.prototype.writeUint16BE = Buffer3.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    };
    Buffer3.prototype.writeUint32LE = Buffer3.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset + 3] = value >>> 24;
      this[offset + 2] = value >>> 16;
      this[offset + 1] = value >>> 8;
      this[offset] = value & 255;
      return offset + 4;
    };
    Buffer3.prototype.writeUint32BE = Buffer3.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 255;
      return offset + 4;
    };
    function wrtBigUInt64LE(buf, value, offset, min, max3) {
      checkIntBI(value, min, max3, buf, offset, 7);
      let lo = Number(value & BigInt(4294967295));
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      let hi = Number(value >> BigInt(32) & BigInt(4294967295));
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      return offset;
    }
    function wrtBigUInt64BE(buf, value, offset, min, max3) {
      checkIntBI(value, min, max3, buf, offset, 7);
      let lo = Number(value & BigInt(4294967295));
      buf[offset + 7] = lo;
      lo = lo >> 8;
      buf[offset + 6] = lo;
      lo = lo >> 8;
      buf[offset + 5] = lo;
      lo = lo >> 8;
      buf[offset + 4] = lo;
      let hi = Number(value >> BigInt(32) & BigInt(4294967295));
      buf[offset + 3] = hi;
      hi = hi >> 8;
      buf[offset + 2] = hi;
      hi = hi >> 8;
      buf[offset + 1] = hi;
      hi = hi >> 8;
      buf[offset] = hi;
      return offset + 8;
    }
    Buffer3.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
      return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    Buffer3.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
      return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    Buffer3.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      let i = 0;
      let mul = 1;
      let sub = 0;
      this[offset] = value & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer3.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      let i = byteLength2 - 1;
      let mul = 1;
      let sub = 0;
      this[offset + i] = value & 255;
      while (--i >= 0 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer3.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 1, 127, -128);
      if (value < 0)
        value = 255 + value + 1;
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer3.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };
    Buffer3.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    };
    Buffer3.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 2147483647, -2147483648);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      this[offset + 2] = value >>> 16;
      this[offset + 3] = value >>> 24;
      return offset + 4;
    };
    Buffer3.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 2147483647, -2147483648);
      if (value < 0)
        value = 4294967295 + value + 1;
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 255;
      return offset + 4;
    };
    Buffer3.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
      return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    Buffer3.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
      return wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    function checkIEEE754(buf, value, offset, ext, max3, min) {
      if (offset + ext > buf.length)
        throw new RangeError("Index out of range");
      if (offset < 0)
        throw new RangeError("Index out of range");
    }
    function writeFloat(buf, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 4, 34028234663852886e22, -34028234663852886e22);
      }
      ieee754.write(buf, value, offset, littleEndian, 23, 4);
      return offset + 4;
    }
    Buffer3.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
      return writeFloat(this, value, offset, true, noAssert);
    };
    Buffer3.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
      return writeFloat(this, value, offset, false, noAssert);
    };
    function writeDouble(buf, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 8, 17976931348623157e292, -17976931348623157e292);
      }
      ieee754.write(buf, value, offset, littleEndian, 52, 8);
      return offset + 8;
    }
    Buffer3.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
      return writeDouble(this, value, offset, true, noAssert);
    };
    Buffer3.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
      return writeDouble(this, value, offset, false, noAssert);
    };
    Buffer3.prototype.copy = function copy(target, targetStart, start, end) {
      if (!Buffer3.isBuffer(target))
        throw new TypeError("argument should be a Buffer");
      if (!start)
        start = 0;
      if (!end && end !== 0)
        end = this.length;
      if (targetStart >= target.length)
        targetStart = target.length;
      if (!targetStart)
        targetStart = 0;
      if (end > 0 && end < start)
        end = start;
      if (end === start)
        return 0;
      if (target.length === 0 || this.length === 0)
        return 0;
      if (targetStart < 0) {
        throw new RangeError("targetStart out of bounds");
      }
      if (start < 0 || start >= this.length)
        throw new RangeError("Index out of range");
      if (end < 0)
        throw new RangeError("sourceEnd out of bounds");
      if (end > this.length)
        end = this.length;
      if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start;
      }
      const len = end - start;
      if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
        this.copyWithin(targetStart, start, end);
      } else {
        Uint8Array.prototype.set.call(
          target,
          this.subarray(start, end),
          targetStart
        );
      }
      return len;
    };
    Buffer3.prototype.fill = function fill(val, start, end, encoding) {
      if (typeof val === "string") {
        if (typeof start === "string") {
          encoding = start;
          start = 0;
          end = this.length;
        } else if (typeof end === "string") {
          encoding = end;
          end = this.length;
        }
        if (encoding !== void 0 && typeof encoding !== "string") {
          throw new TypeError("encoding must be a string");
        }
        if (typeof encoding === "string" && !Buffer3.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        if (val.length === 1) {
          const code = val.charCodeAt(0);
          if (encoding === "utf8" && code < 128 || encoding === "latin1") {
            val = code;
          }
        }
      } else if (typeof val === "number") {
        val = val & 255;
      } else if (typeof val === "boolean") {
        val = Number(val);
      }
      if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError("Out of range index");
      }
      if (end <= start) {
        return this;
      }
      start = start >>> 0;
      end = end === void 0 ? this.length : end >>> 0;
      if (!val)
        val = 0;
      let i;
      if (typeof val === "number") {
        for (i = start; i < end; ++i) {
          this[i] = val;
        }
      } else {
        const bytes = Buffer3.isBuffer(val) ? val : Buffer3.from(val, encoding);
        const len = bytes.length;
        if (len === 0) {
          throw new TypeError('The value "' + val + '" is invalid for argument "value"');
        }
        for (i = 0; i < end - start; ++i) {
          this[i + start] = bytes[i % len];
        }
      }
      return this;
    };
    var errors = {};
    function E3(sym, getMessage, Base) {
      errors[sym] = class NodeError extends Base {
        constructor() {
          super();
          Object.defineProperty(this, "message", {
            value: getMessage.apply(this, arguments),
            writable: true,
            configurable: true
          });
          this.name = `${this.name} [${sym}]`;
          this.stack;
          delete this.name;
        }
        get code() {
          return sym;
        }
        set code(value) {
          Object.defineProperty(this, "code", {
            configurable: true,
            enumerable: true,
            value,
            writable: true
          });
        }
        toString() {
          return `${this.name} [${sym}]: ${this.message}`;
        }
      };
    }
    E3(
      "ERR_BUFFER_OUT_OF_BOUNDS",
      function(name) {
        if (name) {
          return `${name} is outside of buffer bounds`;
        }
        return "Attempt to access memory outside buffer bounds";
      },
      RangeError
    );
    E3(
      "ERR_INVALID_ARG_TYPE",
      function(name, actual) {
        return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
      },
      TypeError
    );
    E3(
      "ERR_OUT_OF_RANGE",
      function(str, range, input) {
        let msg = `The value of "${str}" is out of range.`;
        let received = input;
        if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
          received = addNumericalSeparator(String(input));
        } else if (typeof input === "bigint") {
          received = String(input);
          if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
            received = addNumericalSeparator(received);
          }
          received += "n";
        }
        msg += ` It must be ${range}. Received ${received}`;
        return msg;
      },
      RangeError
    );
    function addNumericalSeparator(val) {
      let res = "";
      let i = val.length;
      const start = val[0] === "-" ? 1 : 0;
      for (; i >= start + 4; i -= 3) {
        res = `_${val.slice(i - 3, i)}${res}`;
      }
      return `${val.slice(0, i)}${res}`;
    }
    function checkBounds(buf, offset, byteLength2) {
      validateNumber(offset, "offset");
      if (buf[offset] === void 0 || buf[offset + byteLength2] === void 0) {
        boundsError(offset, buf.length - (byteLength2 + 1));
      }
    }
    function checkIntBI(value, min, max3, buf, offset, byteLength2) {
      if (value > max3 || value < min) {
        const n = typeof min === "bigint" ? "n" : "";
        let range;
        if (byteLength2 > 3) {
          if (min === 0 || min === BigInt(0)) {
            range = `>= 0${n} and < 2${n} ** ${(byteLength2 + 1) * 8}${n}`;
          } else {
            range = `>= -(2${n} ** ${(byteLength2 + 1) * 8 - 1}${n}) and < 2 ** ${(byteLength2 + 1) * 8 - 1}${n}`;
          }
        } else {
          range = `>= ${min}${n} and <= ${max3}${n}`;
        }
        throw new errors.ERR_OUT_OF_RANGE("value", range, value);
      }
      checkBounds(buf, offset, byteLength2);
    }
    function validateNumber(value, name) {
      if (typeof value !== "number") {
        throw new errors.ERR_INVALID_ARG_TYPE(name, "number", value);
      }
    }
    function boundsError(value, length, type3) {
      if (Math.floor(value) !== value) {
        validateNumber(value, type3);
        throw new errors.ERR_OUT_OF_RANGE(type3 || "offset", "an integer", value);
      }
      if (length < 0) {
        throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
      }
      throw new errors.ERR_OUT_OF_RANGE(
        type3 || "offset",
        `>= ${type3 ? 1 : 0} and <= ${length}`,
        value
      );
    }
    var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
    function base64clean(str) {
      str = str.split("=")[0];
      str = str.trim().replace(INVALID_BASE64_RE, "");
      if (str.length < 2)
        return "";
      while (str.length % 4 !== 0) {
        str = str + "=";
      }
      return str;
    }
    function utf8ToBytes(string, units) {
      units = units || Infinity;
      let codePoint;
      const length = string.length;
      let leadSurrogate = null;
      const bytes = [];
      for (let i = 0; i < length; ++i) {
        codePoint = string.charCodeAt(i);
        if (codePoint > 55295 && codePoint < 57344) {
          if (!leadSurrogate) {
            if (codePoint > 56319) {
              if ((units -= 3) > -1)
                bytes.push(239, 191, 189);
              continue;
            } else if (i + 1 === length) {
              if ((units -= 3) > -1)
                bytes.push(239, 191, 189);
              continue;
            }
            leadSurrogate = codePoint;
            continue;
          }
          if (codePoint < 56320) {
            if ((units -= 3) > -1)
              bytes.push(239, 191, 189);
            leadSurrogate = codePoint;
            continue;
          }
          codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
        } else if (leadSurrogate) {
          if ((units -= 3) > -1)
            bytes.push(239, 191, 189);
        }
        leadSurrogate = null;
        if (codePoint < 128) {
          if ((units -= 1) < 0)
            break;
          bytes.push(codePoint);
        } else if (codePoint < 2048) {
          if ((units -= 2) < 0)
            break;
          bytes.push(
            codePoint >> 6 | 192,
            codePoint & 63 | 128
          );
        } else if (codePoint < 65536) {
          if ((units -= 3) < 0)
            break;
          bytes.push(
            codePoint >> 12 | 224,
            codePoint >> 6 & 63 | 128,
            codePoint & 63 | 128
          );
        } else if (codePoint < 1114112) {
          if ((units -= 4) < 0)
            break;
          bytes.push(
            codePoint >> 18 | 240,
            codePoint >> 12 & 63 | 128,
            codePoint >> 6 & 63 | 128,
            codePoint & 63 | 128
          );
        } else {
          throw new Error("Invalid code point");
        }
      }
      return bytes;
    }
    function asciiToBytes(str) {
      const byteArray = [];
      for (let i = 0; i < str.length; ++i) {
        byteArray.push(str.charCodeAt(i) & 255);
      }
      return byteArray;
    }
    function utf16leToBytes(str, units) {
      let c2, hi, lo;
      const byteArray = [];
      for (let i = 0; i < str.length; ++i) {
        if ((units -= 2) < 0)
          break;
        c2 = str.charCodeAt(i);
        hi = c2 >> 8;
        lo = c2 % 256;
        byteArray.push(lo);
        byteArray.push(hi);
      }
      return byteArray;
    }
    function base64ToBytes(str) {
      return base64.toByteArray(base64clean(str));
    }
    function blitBuffer(src, dst, offset, length) {
      let i;
      for (i = 0; i < length; ++i) {
        if (i + offset >= dst.length || i >= src.length)
          break;
        dst[i + offset] = src[i];
      }
      return i;
    }
    function isInstance(obj, type3) {
      return obj instanceof type3 || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type3.name;
    }
    function numberIsNaN(obj) {
      return obj !== obj;
    }
    var hexSliceLookupTable = function() {
      const alphabet = "0123456789abcdef";
      const table = new Array(256);
      for (let i = 0; i < 16; ++i) {
        const i16 = i * 16;
        for (let j2 = 0; j2 < 16; ++j2) {
          table[i16 + j2] = alphabet[i] + alphabet[j2];
        }
      }
      return table;
    }();
    function defineBigIntMethod(fn) {
      return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
    }
    function BufferBigIntNotDefined() {
      throw new Error("BigInt not supported");
    }
  }
});

// node_modules/@permaweb/ao-scheduler-utils/dist/browser.js
function c(r3) {
  return r3 != null && typeof r3 == "object" && r3["@@functional/placeholder"] === true;
}
function h(r3) {
  return function t(e) {
    return arguments.length === 0 || c(e) ? t : r3.apply(this, arguments);
  };
}
function u(r3) {
  return function t(e, o) {
    switch (arguments.length) {
      case 0:
        return t;
      case 1:
        return c(e) ? t : h(function(n) {
          return r3(e, n);
        });
      default:
        return c(e) && c(o) ? t : c(e) ? h(function(n) {
          return r3(n, o);
        }) : c(o) ? h(function(n) {
          return r3(e, n);
        }) : r3(e, o);
    }
  };
}
function b(r3, t) {
  switch (r3) {
    case 0:
      return function() {
        return t.apply(this, arguments);
      };
    case 1:
      return function(e) {
        return t.apply(this, arguments);
      };
    case 2:
      return function(e, o) {
        return t.apply(this, arguments);
      };
    case 3:
      return function(e, o, n) {
        return t.apply(this, arguments);
      };
    case 4:
      return function(e, o, n, i) {
        return t.apply(this, arguments);
      };
    case 5:
      return function(e, o, n, i, a) {
        return t.apply(this, arguments);
      };
    case 6:
      return function(e, o, n, i, a, f) {
        return t.apply(this, arguments);
      };
    case 7:
      return function(e, o, n, i, a, f, s) {
        return t.apply(this, arguments);
      };
    case 8:
      return function(e, o, n, i, a, f, s, l) {
        return t.apply(this, arguments);
      };
    case 9:
      return function(e, o, n, i, a, f, s, l, _2) {
        return t.apply(this, arguments);
      };
    case 10:
      return function(e, o, n, i, a, f, s, l, _2, d) {
        return t.apply(this, arguments);
      };
    default:
      throw new Error("First argument to _arity must be a non-negative integer no greater than ten");
  }
}
function J(r3, t, e) {
  return function() {
    for (var o = [], n = 0, i = r3, a = 0, f = false; a < t.length || n < arguments.length; ) {
      var s;
      a < t.length && (!c(t[a]) || n >= arguments.length) ? s = t[a] : (s = arguments[n], n += 1), o[a] = s, c(s) ? f = true : i -= 1, a += 1;
    }
    return !f && i <= 0 ? e.apply(this, o) : b(Math.max(0, i), J(r3, o, e));
  };
}
var we = u(function(t, e) {
  return t === 1 ? h(e) : b(t, J(t, [], e));
});
var K = we;
function P(r3) {
  return function t(e, o, n) {
    switch (arguments.length) {
      case 0:
        return t;
      case 1:
        return c(e) ? t : u(function(i, a) {
          return r3(e, i, a);
        });
      case 2:
        return c(e) && c(o) ? t : c(e) ? u(function(i, a) {
          return r3(i, o, a);
        }) : c(o) ? u(function(i, a) {
          return r3(e, i, a);
        }) : h(function(i) {
          return r3(e, o, i);
        });
      default:
        return c(e) && c(o) && c(n) ? t : c(e) && c(o) ? u(function(i, a) {
          return r3(i, a, n);
        }) : c(e) && c(n) ? u(function(i, a) {
          return r3(i, o, a);
        }) : c(o) && c(n) ? u(function(i, a) {
          return r3(e, i, a);
        }) : c(e) ? h(function(i) {
          return r3(i, o, n);
        }) : c(o) ? h(function(i) {
          return r3(e, i, n);
        }) : c(n) ? h(function(i) {
          return r3(e, o, i);
        }) : r3(e, o, n);
    }
  };
}
var U = Array.isArray || function(t) {
  return t != null && t.length >= 0 && Object.prototype.toString.call(t) === "[object Array]";
};
function ct(r3) {
  return r3 != null && typeof r3["@@transducer/step"] == "function";
}
function D(r3, t, e) {
  return function() {
    if (arguments.length === 0)
      return e();
    var o = arguments[arguments.length - 1];
    if (!U(o)) {
      for (var n = 0; n < r3.length; ) {
        if (typeof o[r3[n]] == "function")
          return o[r3[n]].apply(o, Array.prototype.slice.call(arguments, 0, -1));
        n += 1;
      }
      if (ct(o)) {
        var i = t.apply(null, Array.prototype.slice.call(arguments, 0, -1));
        return i(o);
      }
    }
    return e.apply(this, arguments);
  };
}
function pt(r3) {
  return r3 && r3["@@transducer/reduced"] ? r3 : { "@@transducer/value": r3, "@@transducer/reduced": true };
}
var F = { init: function() {
  return this.xf["@@transducer/init"]();
}, result: function(r3) {
  return this.xf["@@transducer/result"](r3);
} };
function Q(r3) {
  for (var t = [], e; !(e = r3.next()).done; )
    t.push(e.value);
  return t;
}
function Z(r3, t, e) {
  for (var o = 0, n = e.length; o < n; ) {
    if (r3(t, e[o]))
      return true;
    o += 1;
  }
  return false;
}
function ht(r3) {
  var t = String(r3).match(/^function (\w*)/);
  return t == null ? "" : t[1];
}
function C(r3, t) {
  return Object.prototype.hasOwnProperty.call(t, r3);
}
function Se(r3, t) {
  return r3 === t ? r3 !== 0 || 1 / r3 === 1 / t : r3 !== r3 && t !== t;
}
var tt = typeof Object.is == "function" ? Object.is : Se;
var Pt = Object.prototype.toString;
var ve = function() {
  return Pt.call(arguments) === "[object Arguments]" ? function(t) {
    return Pt.call(t) === "[object Arguments]";
  } : function(t) {
    return C("callee", t);
  };
}();
var Dt = ve;
var Oe = !{ toString: null }.propertyIsEnumerable("toString");
var Ut = ["constructor", "valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"];
var Nt = function() {
  "use strict";
  return arguments.propertyIsEnumerable("length");
}();
var Ae = function(t, e) {
  for (var o = 0; o < t.length; ) {
    if (t[o] === e)
      return true;
    o += 1;
  }
  return false;
};
var be = typeof Object.keys == "function" && !Nt ? h(function(t) {
  return Object(t) !== t ? [] : Object.keys(t);
}) : h(function(t) {
  if (Object(t) !== t)
    return [];
  var e, o, n = [], i = Nt && Dt(t);
  for (e in t)
    C(e, t) && (!i || e !== "length") && (n[n.length] = e);
  if (Oe)
    for (o = Ut.length - 1; o >= 0; )
      e = Ut[o], C(e, t) && !Ae(n, e) && (n[n.length] = e), o -= 1;
  return n;
});
var O = be;
var Te = h(function(t) {
  return t === null ? "Null" : t === void 0 ? "Undefined" : Object.prototype.toString.call(t).slice(8, -1);
});
var dt = Te;
function Bt(r3, t, e, o) {
  var n = Q(r3), i = Q(t);
  function a(f, s) {
    return q(f, s, e.slice(), o.slice());
  }
  return !Z(function(f, s) {
    return !Z(a, s, f);
  }, i, n);
}
function q(r3, t, e, o) {
  if (tt(r3, t))
    return true;
  var n = dt(r3);
  if (n !== dt(t))
    return false;
  if (typeof r3["fantasy-land/equals"] == "function" || typeof t["fantasy-land/equals"] == "function")
    return typeof r3["fantasy-land/equals"] == "function" && r3["fantasy-land/equals"](t) && typeof t["fantasy-land/equals"] == "function" && t["fantasy-land/equals"](r3);
  if (typeof r3.equals == "function" || typeof t.equals == "function")
    return typeof r3.equals == "function" && r3.equals(t) && typeof t.equals == "function" && t.equals(r3);
  switch (n) {
    case "Arguments":
    case "Array":
    case "Object":
      if (typeof r3.constructor == "function" && ht(r3.constructor) === "Promise")
        return r3 === t;
      break;
    case "Boolean":
    case "Number":
    case "String":
      if (!(typeof r3 == typeof t && tt(r3.valueOf(), t.valueOf())))
        return false;
      break;
    case "Date":
      if (!tt(r3.valueOf(), t.valueOf()))
        return false;
      break;
    case "Error":
      return r3.name === t.name && r3.message === t.message;
    case "RegExp":
      if (!(r3.source === t.source && r3.global === t.global && r3.ignoreCase === t.ignoreCase && r3.multiline === t.multiline && r3.sticky === t.sticky && r3.unicode === t.unicode))
        return false;
      break;
  }
  for (var i = e.length - 1; i >= 0; ) {
    if (e[i] === r3)
      return o[i] === t;
    i -= 1;
  }
  switch (n) {
    case "Map":
      return r3.size !== t.size ? false : Bt(r3.entries(), t.entries(), e.concat([r3]), o.concat([t]));
    case "Set":
      return r3.size !== t.size ? false : Bt(r3.values(), t.values(), e.concat([r3]), o.concat([t]));
    case "Arguments":
    case "Array":
    case "Object":
    case "Boolean":
    case "Number":
    case "String":
    case "Date":
    case "Error":
    case "RegExp":
    case "Int8Array":
    case "Uint8Array":
    case "Uint8ClampedArray":
    case "Int16Array":
    case "Uint16Array":
    case "Int32Array":
    case "Uint32Array":
    case "Float32Array":
    case "Float64Array":
    case "ArrayBuffer":
      break;
    default:
      return false;
  }
  var a = O(r3);
  if (a.length !== O(t).length)
    return false;
  var f = e.concat([r3]), s = o.concat([t]);
  for (i = a.length - 1; i >= 0; ) {
    var l = a[i];
    if (!(C(l, t) && q(t[l], r3[l], f, s)))
      return false;
    i -= 1;
  }
  return true;
}
var Ee = u(function(t, e) {
  return q(t, e, [], []);
});
var et = Ee;
function mt(r3, t, e) {
  var o, n;
  if (typeof r3.indexOf == "function")
    switch (typeof t) {
      case "number":
        if (t === 0) {
          for (o = 1 / t; e < r3.length; ) {
            if (n = r3[e], n === 0 && 1 / n === o)
              return e;
            e += 1;
          }
          return -1;
        } else if (t !== t) {
          for (; e < r3.length; ) {
            if (n = r3[e], typeof n == "number" && n !== n)
              return e;
            e += 1;
          }
          return -1;
        }
        return r3.indexOf(t, e);
      case "string":
      case "boolean":
      case "function":
      case "undefined":
        return r3.indexOf(t, e);
      case "object":
        if (t === null)
          return r3.indexOf(t, e);
    }
  for (; e < r3.length; ) {
    if (et(r3[e], t))
      return e;
    e += 1;
  }
  return -1;
}
function gt(r3, t) {
  return mt(t, r3, 0) >= 0;
}
function T(r3, t) {
  for (var e = 0, o = t.length, n = Array(o); e < o; )
    n[e] = r3(t[e]), e += 1;
  return n;
}
function k(r3) {
  var t = r3.replace(/\\/g, "\\\\").replace(/[\b]/g, "\\b").replace(/\f/g, "\\f").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t").replace(/\v/g, "\\v").replace(/\0/g, "\\0");
  return '"' + t.replace(/"/g, '\\"') + '"';
}
var M = function(t) {
  return (t < 10 ? "0" : "") + t;
};
var We = typeof Date.prototype.toISOString == "function" ? function(t) {
  return t.toISOString();
} : function(t) {
  return t.getUTCFullYear() + "-" + M(t.getUTCMonth() + 1) + "-" + M(t.getUTCDate()) + "T" + M(t.getUTCHours()) + ":" + M(t.getUTCMinutes()) + ":" + M(t.getUTCSeconds()) + "." + (t.getUTCMilliseconds() / 1e3).toFixed(3).slice(2, 5) + "Z";
};
var qt = We;
function xt(r3) {
  return function() {
    return !r3.apply(this, arguments);
  };
}
function G(r3, t, e) {
  for (var o = 0, n = e.length; o < n; )
    t = r3(t, e[o]), o += 1;
  return t;
}
function yt(r3, t) {
  for (var e = 0, o = t.length, n = []; e < o; )
    r3(t[e]) && (n[n.length] = t[e]), e += 1;
  return n;
}
function _t(r3) {
  return Object.prototype.toString.call(r3) === "[object Object]";
}
var Fe = function() {
  function r3(t, e) {
    this.xf = e, this.f = t;
  }
  return r3.prototype["@@transducer/init"] = F.init, r3.prototype["@@transducer/result"] = F.result, r3.prototype["@@transducer/step"] = function(t, e) {
    return this.f(e) ? this.xf["@@transducer/step"](t, e) : t;
  }, r3;
}();
function wt(r3) {
  return function(t) {
    return new Fe(r3, t);
  };
}
var Ce = u(D(["fantasy-land/filter", "filter"], wt, function(r3, t) {
  return _t(t) ? G(function(e, o) {
    return r3(t[o]) && (e[o] = t[o]), e;
  }, {}, O(t)) : yt(r3, t);
}));
var kt = Ce;
var Ie = u(function(t, e) {
  return kt(xt(t), e);
});
var Mt = Ie;
function rt(r3, t) {
  var e = function(a) {
    var f = t.concat([r3]);
    return gt(a, f) ? "<Circular>" : rt(a, f);
  }, o = function(i, a) {
    return T(function(f) {
      return k(f) + ": " + e(i[f]);
    }, a.slice().sort());
  };
  switch (Object.prototype.toString.call(r3)) {
    case "[object Arguments]":
      return "(function() { return arguments; }(" + T(e, r3).join(", ") + "))";
    case "[object Array]":
      return "[" + T(e, r3).concat(o(r3, Mt(function(i) {
        return /^\d+$/.test(i);
      }, O(r3)))).join(", ") + "]";
    case "[object Boolean]":
      return typeof r3 == "object" ? "new Boolean(" + e(r3.valueOf()) + ")" : r3.toString();
    case "[object Date]":
      return "new Date(" + (isNaN(r3.valueOf()) ? e(NaN) : k(qt(r3))) + ")";
    case "[object Map]":
      return "new Map(" + e(Array.from(r3)) + ")";
    case "[object Null]":
      return "null";
    case "[object Number]":
      return typeof r3 == "object" ? "new Number(" + e(r3.valueOf()) + ")" : 1 / r3 === -1 / 0 ? "-0" : r3.toString(10);
    case "[object Set]":
      return "new Set(" + e(Array.from(r3).sort()) + ")";
    case "[object String]":
      return typeof r3 == "object" ? "new String(" + e(r3.valueOf()) + ")" : k(r3);
    case "[object Undefined]":
      return "undefined";
    default:
      if (typeof r3.toString == "function") {
        var n = r3.toString();
        if (n !== "[object Object]")
          return n;
      }
      return "{" + o(r3, O(r3)).join(", ") + "}";
  }
}
var je = h(function(t) {
  return rt(t, []);
});
var St = je;
var Re = u(function(t, e) {
  if (t === e)
    return e;
  function o(s, l) {
    if (s > l != l > s)
      return l > s ? l : s;
  }
  var n = o(t, e);
  if (n !== void 0)
    return n;
  var i = o(typeof t, typeof e);
  if (i !== void 0)
    return i === typeof t ? t : e;
  var a = St(t), f = o(a, St(e));
  return f !== void 0 && f === a ? t : e;
});
var Gt = Re;
var Le = function() {
  function r3(t, e) {
    this.xf = e, this.f = t;
  }
  return r3.prototype["@@transducer/init"] = F.init, r3.prototype["@@transducer/result"] = F.result, r3.prototype["@@transducer/step"] = function(t, e) {
    return this.xf["@@transducer/step"](t, this.f(e));
  }, r3;
}();
var ze = function(t) {
  return function(e) {
    return new Le(t, e);
  };
};
var Ht = ze;
var Pe = u(D(["fantasy-land/map", "map"], Ht, function(t, e) {
  switch (Object.prototype.toString.call(e)) {
    case "[object Function]":
      return K(e.length, function() {
        return t.call(this, e.apply(this, arguments));
      });
    case "[object Object]":
      return G(function(o, n) {
        return o[n] = t(e[n]), o;
      }, {}, O(e));
    default:
      return T(t, e);
  }
}));
var $t = Pe;
var ot = Number.isInteger || function(t) {
  return t << 0 === t;
};
function H(r3) {
  return Object.prototype.toString.call(r3) === "[object String]";
}
var De = u(function(t, e) {
  var o = t < 0 ? e.length + t : t;
  return H(e) ? e.charAt(o) : e[o];
});
var nt = De;
var Ue = u(function(t, e) {
  if (e != null)
    return ot(t) ? nt(t, e) : e[t];
});
var I = Ue;
var Ne = u(function(t, e) {
  return $t(I(t), e);
});
var Xt = Ne;
var Be = h(function(t) {
  return U(t) ? true : !t || typeof t != "object" || H(t) ? false : t.length === 0 ? true : t.length > 0 ? t.hasOwnProperty(0) && t.hasOwnProperty(t.length - 1) : false;
});
var Vt = Be;
var Yt = typeof Symbol < "u" ? Symbol.iterator : "@@iterator";
function vt(r3, t, e) {
  return function(n, i, a) {
    if (Vt(a))
      return r3(n, i, a);
    if (a == null)
      return i;
    if (typeof a["fantasy-land/reduce"] == "function")
      return t(n, i, a, "fantasy-land/reduce");
    if (a[Yt] != null)
      return e(n, i, a[Yt]());
    if (typeof a.next == "function")
      return e(n, i, a);
    if (typeof a.reduce == "function")
      return t(n, i, a, "reduce");
    throw new TypeError("reduce: list must be array or iterable");
  };
}
function Ot(r3, t, e) {
  for (var o = 0, n = e.length; o < n; ) {
    if (t = r3["@@transducer/step"](t, e[o]), t && t["@@transducer/reduced"]) {
      t = t["@@transducer/value"];
      break;
    }
    o += 1;
  }
  return r3["@@transducer/result"](t);
}
var qe = u(function(t, e) {
  return b(t.length, function() {
    return t.apply(e, arguments);
  });
});
var Jt = qe;
function ke(r3, t, e) {
  for (var o = e.next(); !o.done; ) {
    if (t = r3["@@transducer/step"](t, o.value), t && t["@@transducer/reduced"]) {
      t = t["@@transducer/value"];
      break;
    }
    o = e.next();
  }
  return r3["@@transducer/result"](t);
}
function Me(r3, t, e, o) {
  return r3["@@transducer/result"](e[o](Jt(r3["@@transducer/step"], r3), t));
}
var Ge = vt(Ot, Me, ke);
var Kt = Ge;
var He = function() {
  function r3(t) {
    this.f = t;
  }
  return r3.prototype["@@transducer/init"] = function() {
    throw new Error("init not implemented on XWrap");
  }, r3.prototype["@@transducer/result"] = function(t) {
    return t;
  }, r3.prototype["@@transducer/step"] = function(t, e) {
    return this.f(t, e);
  }, r3;
}();
function At(r3) {
  return new He(r3);
}
var $e = P(function(r3, t, e) {
  return Kt(typeof r3 == "function" ? At(r3) : r3, t, e);
});
var it = $e;
function bt(r3, t) {
  return function() {
    return t.call(this, r3.apply(this, arguments));
  };
}
function $(r3, t) {
  return function() {
    var e = arguments.length;
    if (e === 0)
      return t();
    var o = arguments[e - 1];
    return U(o) || typeof o[r3] != "function" ? t.apply(this, arguments) : o[r3].apply(o, Array.prototype.slice.call(arguments, 0, e - 1));
  };
}
var Xe = P($("slice", function(t, e, o) {
  return Array.prototype.slice.call(o, t, e);
}));
var Qt = Xe;
var Ve = h($("tail", Qt(1, 1 / 0)));
var Zt = Ve;
function X() {
  if (arguments.length === 0)
    throw new Error("pipe requires at least one argument");
  return b(arguments[0].length, it(bt, arguments[0], Zt(arguments)));
}
var Ye = u(function(t, e) {
  return K(it(Gt, 0, Xt("length", e)), function() {
    var o = arguments, n = this;
    return t.apply(n, T(function(i) {
      return i.apply(n, o);
    }, e));
  });
});
var te = Ye;
var Je = u(function(t, e) {
  return e == null || e !== e ? t : e;
});
var V = Je;
var Ke = function() {
  function r3(t, e) {
    this.xf = e, this.f = t, this.found = false;
  }
  return r3.prototype["@@transducer/init"] = F.init, r3.prototype["@@transducer/result"] = function(t) {
    return this.found || (t = this.xf["@@transducer/step"](t, void 0)), this.xf["@@transducer/result"](t);
  }, r3.prototype["@@transducer/step"] = function(t, e) {
    return this.f(e) && (this.found = true, t = pt(this.xf["@@transducer/step"](t, e))), t;
  }, r3;
}();
function Tt(r3) {
  return function(t) {
    return new Ke(r3, t);
  };
}
var Qe = u(D(["find"], Tt, function(t, e) {
  for (var o = 0, n = e.length; o < n; ) {
    if (t(e[o]))
      return e[o];
    o += 1;
  }
}));
var Et = Qe;
var Ze = h(function(t) {
  return te(function() {
    return Array.prototype.slice.call(arguments, 0);
  }, t);
});
var Wt = Ze;
var tr = u(function(t, e) {
  return t.map(function(o) {
    for (var n = e, i = 0, a; i < o.length; ) {
      if (n == null)
        return;
      a = o[i], n = ot(a) ? nt(a, n) : n[a], i += 1;
    }
    return n;
  });
});
var ee = tr;
var er = u(function(t, e) {
  return ee([t], e)[0];
});
var at = er;
var rr = P(function(t, e, o) {
  return et(t, I(e, o));
});
var Ft = rr;
var E = class extends Error {
  name = "InvalidSchedulerLocation";
};
var st = class extends Error {
  name = "SchedulerTagNotFound";
};
var ft = class extends Error {
  name = "TransactionNotFound";
};
var or = "Url";
var nr = "Time-To-Live";
var ir = "Scheduler";
var Ct = (r3) => X(V([]), Et(Ft(r3, "name")), V({}), I("value"));
var re = (r3) => X((t) => {
  if (!t)
    throw new ft(r3);
  return t;
}, I("tags"), V([]));
function oe({ fetch: r3, GRAPHQL_URL: t }) {
  return async ({ query: e, variables: o }) => r3(t, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ query: e, variables: o }) }).then((n) => n.json());
}
function ne({ fetch: r3, GRAPHQL_URL: t }) {
  let e = oe({ fetch: r3, GRAPHQL_URL: t }), o = It({ fetch: r3, GRAPHQL_URL: t }), n = `
    query GetTransactions ($transactionIds: [ID!]!) {
      transactions(ids: $transactionIds) {
        edges {
          node {
            tags {
              name
              value
            }
          }
        }
      }
    }
  `;
  return async (i) => e({ query: n, variables: { transactionIds: [i] } }).then(at(["data", "transactions", "edges", "0", "node"])).then(re(`Process ${i} was not found on gateway`)).then(Ct(ir)).then((a) => {
    if (!a)
      throw new st('No "Scheduler" tag found on process');
    return o(a);
  });
}
function It({ fetch: r3, GRAPHQL_URL: t }) {
  let e = oe({ fetch: r3, GRAPHQL_URL: t }), o = `
    query GetSchedulerLocation ($owner: String!) {
      transactions (
        owners: [$owner]
        tags: [
          { name: "Data-Protocol", values: ["ao"] },
          { name: "Type", values: ["Scheduler-Location"] }
        ]
        # Only need the most recent Scheduler-Location
        sort: HEIGHT_DESC
        first: 1
      ) {
        edges {
          node {
            tags {
              name
              value
            }
          }
        }
      }
    }
  `;
  return async (n) => e({ query: o, variables: { owner: n } }).then(at(["data", "transactions", "edges", "0", "node"])).then(re(`Could not find 'Scheduler-Location' owner by wallet ${n}`)).then(Wt([Ct(or), Ct(nr)])).then(([i, a]) => {
    if (!i)
      throw new E('No "Url" tag found on Scheduler-Location');
    if (!a)
      throw new E('No "Time-To-Live" tag found on Scheduler-Location');
    return { url: i, ttl: a, owner: n };
  });
}
var N = typeof performance == "object" && performance && typeof performance.now == "function" ? performance : Date;
var ae = /* @__PURE__ */ new Set();
var jt = typeof process == "object" && process ? process : {};
var se = (r3, t, e, o) => {
  typeof jt.emitWarning == "function" ? jt.emitWarning(r3, t, e, o) : console.error(`[${e}] ${t}: ${r3}`);
};
var ut = globalThis.AbortController;
var ie = globalThis.AbortSignal;
if (typeof ut > "u") {
  ie = class {
    onabort;
    _onabort = [];
    reason;
    aborted = false;
    addEventListener(o, n) {
      this._onabort.push(n);
    }
  }, ut = class {
    constructor() {
      t();
    }
    signal = new ie();
    abort(o) {
      if (!this.signal.aborted) {
        this.signal.reason = o, this.signal.aborted = true;
        for (let n of this.signal._onabort)
          n(o);
        this.signal.onabort?.(o);
      }
    }
  };
  let r3 = jt.env?.LRU_CACHE_IGNORE_AC_WARNING !== "1", t = () => {
    r3 && (r3 = false, se("AbortController is not defined. If using lru-cache in node 14, load an AbortController polyfill from the `node-abort-controller` package. A minimal polyfill is provided for use by LRUCache.fetch(), but it should not be relied upon in other contexts (eg, passing it to other APIs that use AbortController/AbortSignal might have undesirable effects). You may disable this with LRU_CACHE_IGNORE_AC_WARNING=1 in the env.", "NO_ABORT_CONTROLLER", "ENOTSUP", t));
  };
}
var sr = (r3) => !ae.has(r3);
var ki = Symbol("type");
var j = (r3) => r3 && r3 === Math.floor(r3) && r3 > 0 && isFinite(r3);
var fe = (r3) => j(r3) ? r3 <= Math.pow(2, 8) ? Uint8Array : r3 <= Math.pow(2, 16) ? Uint16Array : r3 <= Math.pow(2, 32) ? Uint32Array : r3 <= Number.MAX_SAFE_INTEGER ? B : null : null;
var B = class extends Array {
  constructor(t) {
    super(t), this.fill(0);
  }
};
var Rt = class r {
  heap;
  length;
  static #f = false;
  static create(t) {
    let e = fe(t);
    if (!e)
      return [];
    r.#f = true;
    let o = new r(t, e);
    return r.#f = false, o;
  }
  constructor(t, e) {
    if (!r.#f)
      throw new TypeError("instantiate Stack using Stack.create(n)");
    this.heap = new e(t), this.length = 0;
  }
  push(t) {
    this.heap[this.length++] = t;
  }
  pop() {
    return this.heap[--this.length];
  }
};
var lt = class r2 {
  #f;
  #c;
  #m;
  #g;
  #F;
  ttl;
  ttlResolution;
  ttlAutopurge;
  updateAgeOnGet;
  updateAgeOnHas;
  allowStale;
  noDisposeOnSet;
  noUpdateTTL;
  maxEntrySize;
  sizeCalculation;
  noDeleteOnFetchRejection;
  noDeleteOnStaleGet;
  allowStaleOnFetchAbort;
  allowStaleOnFetchRejection;
  ignoreFetchAbort;
  #n;
  #x;
  #o;
  #r;
  #t;
  #u;
  #p;
  #s;
  #i;
  #y;
  #a;
  #_;
  #w;
  #h;
  #S;
  #b;
  #l;
  static unsafeExposeInternals(t) {
    return { starts: t.#w, ttls: t.#h, sizes: t.#_, keyMap: t.#o, keyList: t.#r, valList: t.#t, next: t.#u, prev: t.#p, get head() {
      return t.#s;
    }, get tail() {
      return t.#i;
    }, free: t.#y, isBackgroundFetch: (e) => t.#e(e), backgroundFetch: (e, o, n, i) => t.#j(e, o, n, i), moveToTail: (e) => t.#W(e), indexes: (e) => t.#v(e), rindexes: (e) => t.#O(e), isStale: (e) => t.#d(e) };
  }
  get max() {
    return this.#f;
  }
  get maxSize() {
    return this.#c;
  }
  get calculatedSize() {
    return this.#x;
  }
  get size() {
    return this.#n;
  }
  get fetchMethod() {
    return this.#F;
  }
  get dispose() {
    return this.#m;
  }
  get disposeAfter() {
    return this.#g;
  }
  constructor(t) {
    let { max: e = 0, ttl: o, ttlResolution: n = 1, ttlAutopurge: i, updateAgeOnGet: a, updateAgeOnHas: f, allowStale: s, dispose: l, disposeAfter: _2, noDisposeOnSet: d, noUpdateTTL: g, maxSize: m = 0, maxEntrySize: L = 0, sizeCalculation: x2, fetchMethod: S, noDeleteOnFetchRejection: p, noDeleteOnStaleGet: w2, allowStaleOnFetchRejection: A, allowStaleOnFetchAbort: y, ignoreFetchAbort: v2 } = t;
    if (e !== 0 && !j(e))
      throw new TypeError("max option must be a nonnegative integer");
    let z3 = e ? fe(e) : Array;
    if (!z3)
      throw new Error("invalid max value: " + e);
    if (this.#f = e, this.#c = m, this.maxEntrySize = L || this.#c, this.sizeCalculation = x2, this.sizeCalculation) {
      if (!this.#c && !this.maxEntrySize)
        throw new TypeError("cannot set sizeCalculation without setting maxSize or maxEntrySize");
      if (typeof this.sizeCalculation != "function")
        throw new TypeError("sizeCalculation set to non-function");
    }
    if (S !== void 0 && typeof S != "function")
      throw new TypeError("fetchMethod must be a function if specified");
    if (this.#F = S, this.#b = !!S, this.#o = /* @__PURE__ */ new Map(), this.#r = new Array(e).fill(void 0), this.#t = new Array(e).fill(void 0), this.#u = new z3(e), this.#p = new z3(e), this.#s = 0, this.#i = 0, this.#y = Rt.create(e), this.#n = 0, this.#x = 0, typeof l == "function" && (this.#m = l), typeof _2 == "function" ? (this.#g = _2, this.#a = []) : (this.#g = void 0, this.#a = void 0), this.#S = !!this.#m, this.#l = !!this.#g, this.noDisposeOnSet = !!d, this.noUpdateTTL = !!g, this.noDeleteOnFetchRejection = !!p, this.allowStaleOnFetchRejection = !!A, this.allowStaleOnFetchAbort = !!y, this.ignoreFetchAbort = !!v2, this.maxEntrySize !== 0) {
      if (this.#c !== 0 && !j(this.#c))
        throw new TypeError("maxSize must be a positive integer if specified");
      if (!j(this.maxEntrySize))
        throw new TypeError("maxEntrySize must be a positive integer if specified");
      this.#U();
    }
    if (this.allowStale = !!s, this.noDeleteOnStaleGet = !!w2, this.updateAgeOnGet = !!a, this.updateAgeOnHas = !!f, this.ttlResolution = j(n) || n === 0 ? n : 1, this.ttlAutopurge = !!i, this.ttl = o || 0, this.ttl) {
      if (!j(this.ttl))
        throw new TypeError("ttl must be a positive integer if specified");
      this.#R();
    }
    if (this.#f === 0 && this.ttl === 0 && this.#c === 0)
      throw new TypeError("At least one of max, maxSize, or ttl is required");
    if (!this.ttlAutopurge && !this.#f && !this.#c) {
      let W = "LRU_CACHE_UNBOUNDED";
      sr(W) && (ae.add(W), se("TTL caching without ttlAutopurge, max, or maxSize can result in unbounded memory consumption.", "UnboundedCacheWarning", W, r2));
    }
  }
  getRemainingTTL(t) {
    return this.#o.has(t) ? 1 / 0 : 0;
  }
  #R() {
    let t = new B(this.#f), e = new B(this.#f);
    this.#h = t, this.#w = e, this.#L = (i, a, f = N.now()) => {
      if (e[i] = a !== 0 ? f : 0, t[i] = a, a !== 0 && this.ttlAutopurge) {
        let s = setTimeout(() => {
          this.#d(i) && this.delete(this.#r[i]);
        }, a + 1);
        s.unref && s.unref();
      }
    }, this.#T = (i) => {
      e[i] = t[i] !== 0 ? N.now() : 0;
    }, this.#A = (i, a) => {
      if (t[a]) {
        let f = t[a], s = e[a];
        if (!f || !s)
          return;
        i.ttl = f, i.start = s, i.now = o || n();
        let l = i.now - s;
        i.remainingTTL = f - l;
      }
    };
    let o = 0, n = () => {
      let i = N.now();
      if (this.ttlResolution > 0) {
        o = i;
        let a = setTimeout(() => o = 0, this.ttlResolution);
        a.unref && a.unref();
      }
      return i;
    };
    this.getRemainingTTL = (i) => {
      let a = this.#o.get(i);
      if (a === void 0)
        return 0;
      let f = t[a], s = e[a];
      if (!f || !s)
        return 1 / 0;
      let l = (o || n()) - s;
      return f - l;
    }, this.#d = (i) => {
      let a = e[i], f = t[i];
      return !!f && !!a && (o || n()) - a > f;
    };
  }
  #T = () => {
  };
  #A = () => {
  };
  #L = () => {
  };
  #d = () => false;
  #U() {
    let t = new B(this.#f);
    this.#x = 0, this.#_ = t, this.#E = (e) => {
      this.#x -= t[e], t[e] = 0;
    }, this.#z = (e, o, n, i) => {
      if (this.#e(o))
        return 0;
      if (!j(n))
        if (i) {
          if (typeof i != "function")
            throw new TypeError("sizeCalculation must be a function");
          if (n = i(o, e), !j(n))
            throw new TypeError("sizeCalculation return invalid (expect positive integer)");
        } else
          throw new TypeError("invalid size value (must be positive integer). When maxSize or maxEntrySize is used, sizeCalculation or size must be set.");
      return n;
    }, this.#C = (e, o, n) => {
      if (t[e] = o, this.#c) {
        let i = this.#c - t[e];
        for (; this.#x > i; )
          this.#I(true);
      }
      this.#x += t[e], n && (n.entrySize = o, n.totalCalculatedSize = this.#x);
    };
  }
  #E = (t) => {
  };
  #C = (t, e, o) => {
  };
  #z = (t, e, o, n) => {
    if (o || n)
      throw new TypeError("cannot set size without setting maxSize or maxEntrySize on cache");
    return 0;
  };
  *#v({ allowStale: t = this.allowStale } = {}) {
    if (this.#n)
      for (let e = this.#i; !(!this.#P(e) || ((t || !this.#d(e)) && (yield e), e === this.#s)); )
        e = this.#p[e];
  }
  *#O({ allowStale: t = this.allowStale } = {}) {
    if (this.#n)
      for (let e = this.#s; !(!this.#P(e) || ((t || !this.#d(e)) && (yield e), e === this.#i)); )
        e = this.#u[e];
  }
  #P(t) {
    return t !== void 0 && this.#o.get(this.#r[t]) === t;
  }
  *entries() {
    for (let t of this.#v())
      this.#t[t] !== void 0 && this.#r[t] !== void 0 && !this.#e(this.#t[t]) && (yield [this.#r[t], this.#t[t]]);
  }
  *rentries() {
    for (let t of this.#O())
      this.#t[t] !== void 0 && this.#r[t] !== void 0 && !this.#e(this.#t[t]) && (yield [this.#r[t], this.#t[t]]);
  }
  *keys() {
    for (let t of this.#v()) {
      let e = this.#r[t];
      e !== void 0 && !this.#e(this.#t[t]) && (yield e);
    }
  }
  *rkeys() {
    for (let t of this.#O()) {
      let e = this.#r[t];
      e !== void 0 && !this.#e(this.#t[t]) && (yield e);
    }
  }
  *values() {
    for (let t of this.#v())
      this.#t[t] !== void 0 && !this.#e(this.#t[t]) && (yield this.#t[t]);
  }
  *rvalues() {
    for (let t of this.#O())
      this.#t[t] !== void 0 && !this.#e(this.#t[t]) && (yield this.#t[t]);
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  [Symbol.toStringTag] = "LRUCache";
  find(t, e = {}) {
    for (let o of this.#v()) {
      let n = this.#t[o], i = this.#e(n) ? n.__staleWhileFetching : n;
      if (i !== void 0 && t(i, this.#r[o], this))
        return this.get(this.#r[o], e);
    }
  }
  forEach(t, e = this) {
    for (let o of this.#v()) {
      let n = this.#t[o], i = this.#e(n) ? n.__staleWhileFetching : n;
      i !== void 0 && t.call(e, i, this.#r[o], this);
    }
  }
  rforEach(t, e = this) {
    for (let o of this.#O()) {
      let n = this.#t[o], i = this.#e(n) ? n.__staleWhileFetching : n;
      i !== void 0 && t.call(e, i, this.#r[o], this);
    }
  }
  purgeStale() {
    let t = false;
    for (let e of this.#O({ allowStale: true }))
      this.#d(e) && (this.delete(this.#r[e]), t = true);
    return t;
  }
  info(t) {
    let e = this.#o.get(t);
    if (e === void 0)
      return;
    let o = this.#t[e], n = this.#e(o) ? o.__staleWhileFetching : o;
    if (n === void 0)
      return;
    let i = { value: n };
    if (this.#h && this.#w) {
      let a = this.#h[e], f = this.#w[e];
      if (a && f) {
        let s = a - (N.now() - f);
        i.ttl = s, i.start = Date.now();
      }
    }
    return this.#_ && (i.size = this.#_[e]), i;
  }
  dump() {
    let t = [];
    for (let e of this.#v({ allowStale: true })) {
      let o = this.#r[e], n = this.#t[e], i = this.#e(n) ? n.__staleWhileFetching : n;
      if (i === void 0 || o === void 0)
        continue;
      let a = { value: i };
      if (this.#h && this.#w) {
        a.ttl = this.#h[e];
        let f = N.now() - this.#w[e];
        a.start = Math.floor(Date.now() - f);
      }
      this.#_ && (a.size = this.#_[e]), t.unshift([o, a]);
    }
    return t;
  }
  load(t) {
    this.clear();
    for (let [e, o] of t) {
      if (o.start) {
        let n = Date.now() - o.start;
        o.start = N.now() - n;
      }
      this.set(e, o.value, o);
    }
  }
  set(t, e, o = {}) {
    if (e === void 0)
      return this.delete(t), this;
    let { ttl: n = this.ttl, start: i, noDisposeOnSet: a = this.noDisposeOnSet, sizeCalculation: f = this.sizeCalculation, status: s } = o, { noUpdateTTL: l = this.noUpdateTTL } = o, _2 = this.#z(t, e, o.size || 0, f);
    if (this.maxEntrySize && _2 > this.maxEntrySize)
      return s && (s.set = "miss", s.maxEntrySizeExceeded = true), this.delete(t), this;
    let d = this.#n === 0 ? void 0 : this.#o.get(t);
    if (d === void 0)
      d = this.#n === 0 ? this.#i : this.#y.length !== 0 ? this.#y.pop() : this.#n === this.#f ? this.#I(false) : this.#n, this.#r[d] = t, this.#t[d] = e, this.#o.set(t, d), this.#u[this.#i] = d, this.#p[d] = this.#i, this.#i = d, this.#n++, this.#C(d, _2, s), s && (s.set = "add"), l = false;
    else {
      this.#W(d);
      let g = this.#t[d];
      if (e !== g) {
        if (this.#b && this.#e(g)) {
          g.__abortController.abort(new Error("replaced"));
          let { __staleWhileFetching: m } = g;
          m !== void 0 && !a && (this.#S && this.#m?.(m, t, "set"), this.#l && this.#a?.push([m, t, "set"]));
        } else
          a || (this.#S && this.#m?.(g, t, "set"), this.#l && this.#a?.push([g, t, "set"]));
        if (this.#E(d), this.#C(d, _2, s), this.#t[d] = e, s) {
          s.set = "replace";
          let m = g && this.#e(g) ? g.__staleWhileFetching : g;
          m !== void 0 && (s.oldValue = m);
        }
      } else
        s && (s.set = "update");
    }
    if (n !== 0 && !this.#h && this.#R(), this.#h && (l || this.#L(d, n, i), s && this.#A(s, d)), !a && this.#l && this.#a) {
      let g = this.#a, m;
      for (; m = g?.shift(); )
        this.#g?.(...m);
    }
    return this;
  }
  pop() {
    try {
      for (; this.#n; ) {
        let t = this.#t[this.#s];
        if (this.#I(true), this.#e(t)) {
          if (t.__staleWhileFetching)
            return t.__staleWhileFetching;
        } else if (t !== void 0)
          return t;
      }
    } finally {
      if (this.#l && this.#a) {
        let t = this.#a, e;
        for (; e = t?.shift(); )
          this.#g?.(...e);
      }
    }
  }
  #I(t) {
    let e = this.#s, o = this.#r[e], n = this.#t[e];
    return this.#b && this.#e(n) ? n.__abortController.abort(new Error("evicted")) : (this.#S || this.#l) && (this.#S && this.#m?.(n, o, "evict"), this.#l && this.#a?.push([n, o, "evict"])), this.#E(e), t && (this.#r[e] = void 0, this.#t[e] = void 0, this.#y.push(e)), this.#n === 1 ? (this.#s = this.#i = 0, this.#y.length = 0) : this.#s = this.#u[e], this.#o.delete(o), this.#n--, e;
  }
  has(t, e = {}) {
    let { updateAgeOnHas: o = this.updateAgeOnHas, status: n } = e, i = this.#o.get(t);
    if (i !== void 0) {
      let a = this.#t[i];
      if (this.#e(a) && a.__staleWhileFetching === void 0)
        return false;
      if (this.#d(i))
        n && (n.has = "stale", this.#A(n, i));
      else
        return o && this.#T(i), n && (n.has = "hit", this.#A(n, i)), true;
    } else
      n && (n.has = "miss");
    return false;
  }
  peek(t, e = {}) {
    let { allowStale: o = this.allowStale } = e, n = this.#o.get(t);
    if (n === void 0 || !o && this.#d(n))
      return;
    let i = this.#t[n];
    return this.#e(i) ? i.__staleWhileFetching : i;
  }
  #j(t, e, o, n) {
    let i = e === void 0 ? void 0 : this.#t[e];
    if (this.#e(i))
      return i;
    let a = new ut(), { signal: f } = o;
    f?.addEventListener("abort", () => a.abort(f.reason), { signal: a.signal });
    let s = { signal: a.signal, options: o, context: n }, l = (x2, S = false) => {
      let { aborted: p } = a.signal, w2 = o.ignoreFetchAbort && x2 !== void 0;
      if (o.status && (p && !S ? (o.status.fetchAborted = true, o.status.fetchError = a.signal.reason, w2 && (o.status.fetchAbortIgnored = true)) : o.status.fetchResolved = true), p && !w2 && !S)
        return d(a.signal.reason);
      let A = m;
      return this.#t[e] === m && (x2 === void 0 ? A.__staleWhileFetching ? this.#t[e] = A.__staleWhileFetching : this.delete(t) : (o.status && (o.status.fetchUpdated = true), this.set(t, x2, s.options))), x2;
    }, _2 = (x2) => (o.status && (o.status.fetchRejected = true, o.status.fetchError = x2), d(x2)), d = (x2) => {
      let { aborted: S } = a.signal, p = S && o.allowStaleOnFetchAbort, w2 = p || o.allowStaleOnFetchRejection, A = w2 || o.noDeleteOnFetchRejection, y = m;
      if (this.#t[e] === m && (!A || y.__staleWhileFetching === void 0 ? this.delete(t) : p || (this.#t[e] = y.__staleWhileFetching)), w2)
        return o.status && y.__staleWhileFetching !== void 0 && (o.status.returnedStale = true), y.__staleWhileFetching;
      if (y.__returned === y)
        throw x2;
    }, g = (x2, S) => {
      let p = this.#F?.(t, i, s);
      p && p instanceof Promise && p.then((w2) => x2(w2 === void 0 ? void 0 : w2), S), a.signal.addEventListener("abort", () => {
        (!o.ignoreFetchAbort || o.allowStaleOnFetchAbort) && (x2(void 0), o.allowStaleOnFetchAbort && (x2 = (w2) => l(w2, true)));
      });
    };
    o.status && (o.status.fetchDispatched = true);
    let m = new Promise(g).then(l, _2), L = Object.assign(m, { __abortController: a, __staleWhileFetching: i, __returned: void 0 });
    return e === void 0 ? (this.set(t, L, { ...s.options, status: void 0 }), e = this.#o.get(t)) : this.#t[e] = L, L;
  }
  #e(t) {
    if (!this.#b)
      return false;
    let e = t;
    return !!e && e instanceof Promise && e.hasOwnProperty("__staleWhileFetching") && e.__abortController instanceof ut;
  }
  async fetch(t, e = {}) {
    let { allowStale: o = this.allowStale, updateAgeOnGet: n = this.updateAgeOnGet, noDeleteOnStaleGet: i = this.noDeleteOnStaleGet, ttl: a = this.ttl, noDisposeOnSet: f = this.noDisposeOnSet, size: s = 0, sizeCalculation: l = this.sizeCalculation, noUpdateTTL: _2 = this.noUpdateTTL, noDeleteOnFetchRejection: d = this.noDeleteOnFetchRejection, allowStaleOnFetchRejection: g = this.allowStaleOnFetchRejection, ignoreFetchAbort: m = this.ignoreFetchAbort, allowStaleOnFetchAbort: L = this.allowStaleOnFetchAbort, context: x2, forceRefresh: S = false, status: p, signal: w2 } = e;
    if (!this.#b)
      return p && (p.fetch = "get"), this.get(t, { allowStale: o, updateAgeOnGet: n, noDeleteOnStaleGet: i, status: p });
    let A = { allowStale: o, updateAgeOnGet: n, noDeleteOnStaleGet: i, ttl: a, noDisposeOnSet: f, size: s, sizeCalculation: l, noUpdateTTL: _2, noDeleteOnFetchRejection: d, allowStaleOnFetchRejection: g, allowStaleOnFetchAbort: L, ignoreFetchAbort: m, status: p, signal: w2 }, y = this.#o.get(t);
    if (y === void 0) {
      p && (p.fetch = "miss");
      let v2 = this.#j(t, y, A, x2);
      return v2.__returned = v2;
    } else {
      let v2 = this.#t[y];
      if (this.#e(v2)) {
        let zt2 = o && v2.__staleWhileFetching !== void 0;
        return p && (p.fetch = "inflight", zt2 && (p.returnedStale = true)), zt2 ? v2.__staleWhileFetching : v2.__returned = v2;
      }
      let z3 = this.#d(y);
      if (!S && !z3)
        return p && (p.fetch = "hit"), this.#W(y), n && this.#T(y), p && this.#A(p, y), v2;
      let W = this.#j(t, y, A, x2), Lt2 = W.__staleWhileFetching !== void 0 && o;
      return p && (p.fetch = z3 ? "stale" : "refresh", Lt2 && z3 && (p.returnedStale = true)), Lt2 ? W.__staleWhileFetching : W.__returned = W;
    }
  }
  get(t, e = {}) {
    let { allowStale: o = this.allowStale, updateAgeOnGet: n = this.updateAgeOnGet, noDeleteOnStaleGet: i = this.noDeleteOnStaleGet, status: a } = e, f = this.#o.get(t);
    if (f !== void 0) {
      let s = this.#t[f], l = this.#e(s);
      return a && this.#A(a, f), this.#d(f) ? (a && (a.get = "stale"), l ? (a && o && s.__staleWhileFetching !== void 0 && (a.returnedStale = true), o ? s.__staleWhileFetching : void 0) : (i || this.delete(t), a && o && (a.returnedStale = true), o ? s : void 0)) : (a && (a.get = "hit"), l ? s.__staleWhileFetching : (this.#W(f), n && this.#T(f), s));
    } else
      a && (a.get = "miss");
  }
  #D(t, e) {
    this.#p[e] = t, this.#u[t] = e;
  }
  #W(t) {
    t !== this.#i && (t === this.#s ? this.#s = this.#u[t] : this.#D(this.#p[t], this.#u[t]), this.#D(this.#i, t), this.#i = t);
  }
  delete(t) {
    let e = false;
    if (this.#n !== 0) {
      let o = this.#o.get(t);
      if (o !== void 0)
        if (e = true, this.#n === 1)
          this.clear();
        else {
          this.#E(o);
          let n = this.#t[o];
          if (this.#e(n) ? n.__abortController.abort(new Error("deleted")) : (this.#S || this.#l) && (this.#S && this.#m?.(n, t, "delete"), this.#l && this.#a?.push([n, t, "delete"])), this.#o.delete(t), this.#r[o] = void 0, this.#t[o] = void 0, o === this.#i)
            this.#i = this.#p[o];
          else if (o === this.#s)
            this.#s = this.#u[o];
          else {
            let i = this.#p[o];
            this.#u[i] = this.#u[o];
            let a = this.#u[o];
            this.#p[a] = this.#p[o];
          }
          this.#n--, this.#y.push(o);
        }
    }
    if (this.#l && this.#a?.length) {
      let o = this.#a, n;
      for (; n = o?.shift(); )
        this.#g?.(...n);
    }
    return e;
  }
  clear() {
    for (let t of this.#O({ allowStale: true })) {
      let e = this.#t[t];
      if (this.#e(e))
        e.__abortController.abort(new Error("deleted"));
      else {
        let o = this.#r[t];
        this.#S && this.#m?.(e, o, "delete"), this.#l && this.#a?.push([e, o, "delete"]);
      }
    }
    if (this.#o.clear(), this.#t.fill(void 0), this.#r.fill(void 0), this.#h && this.#w && (this.#h.fill(0), this.#w.fill(0)), this.#_ && this.#_.fill(0), this.#s = 0, this.#i = 0, this.#y.length = 0, this.#x = 0, this.#n = 0, this.#l && this.#a) {
      let t = this.#a, e;
      for (; e = t?.shift(); )
        this.#g?.(...e);
    }
  }
};
var R;
var Y;
function ue({ size: r3 }) {
  return R || (Y = r3, R = new lt({ max: r3, maxSize: 1e6 * 5, sizeCalculation: (t) => JSON.stringify(t).length, allowStale: true }), R);
}
function le({ cache: r3 = R }) {
  return async (t) => {
    if (Y)
      return r3.get(t);
  };
}
function ce({ cache: r3 = R }) {
  return async (t, { url: e, address: o }, n) => {
    if (Y)
      return r3.set(t, { url: e, address: o }, { ttl: n });
  };
}
function pe({ cache: r3 = R }) {
  return async (t) => {
    if (Y)
      return r3.get(t);
  };
}
function he({ cache: r3 = R }) {
  return async (t, e, o) => {
    if (Y)
      return r3.set(t, { url: e, address: t }, { ttl: o });
  };
}
function de({ fetch: r3 }) {
  return async (t, e) => {
    let o = await r3(`${t}?process-id=${e}`, { method: "GET", redirect: "manual" });
    return [301, 302, 307, 308].includes(o.status) ? new URL(o.headers.get("Location")).origin : t;
  };
}
function me({ loadProcessScheduler: r3, loadScheduler: t, cache: e, followRedirects: o, checkForRedirect: n }) {
  return (i, a) => e.getByProcess(i).then(async (f) => f || Promise.resolve().then(async () => {
    if (a) {
      let s = await e.getByOwner(a);
      return s || t(a).then((l) => (e.setByOwner(l.owner, l.url, l.ttl), l));
    }
    return r3(i);
  }).then(async (s) => {
    let l = s.url;
    o && (l = await n(s.url, i));
    let _2 = { url: l, address: s.owner };
    return await e.setByProcess(i, _2, s.ttl), _2;
  }));
}
function ge({ loadScheduler: r3, cache: t }) {
  return (e) => t.getByOwner(e).then((o) => o ? { url: o.url } : r3(e).then((n) => t.setByOwner(e, n.url, n.ttl).then(() => ({ url: n.url }))).catch((n) => {
    if (!(n instanceof E))
      throw n;
  }));
}
function xe({ loadScheduler: r3, cache: t }) {
  return (e) => t.getByOwner(e).then((o) => o ? true : r3(e).then((n) => t.setByOwner(e, n.url, n.ttl)).then(() => true).catch((n) => {
    if (n instanceof E)
      return false;
    throw n;
  }));
}
var lr = "https://arweave.net/graphql";
function ye({ cacheSize: r3 = 100, GRAPHQL_URL: t = lr, followRedirects: e = false } = {}) {
  let o = ue({ size: r3 }), n = It({ fetch, GRAPHQL_URL: t }), i = { getByProcess: le({ cache: o }), getByOwner: pe({ cache: o }), setByProcess: ce({ cache: o }), setByOwner: he({ cache: o }) }, a = me({ loadProcessScheduler: ne({ fetch, GRAPHQL_URL: t }), loadScheduler: n, cache: i, followRedirects: e, checkForRedirect: de({ fetch }) }), f = xe({ loadScheduler: n, cache: i }), s = ge({ loadScheduler: n, cache: i });
  return { locate: a, validate: f, raw: s };
}
var cr = globalThis.GRAPHQL_URL || void 0;
var pr = globalThis.SCHEDULER_UTILS_CACHE_SIZE || void 0;
var hr = globalThis.SCHEDULER_UTILS_FOLLOW_REDIRECTS === "true" || void 0;
var { locate: ra, validate: oa, raw: na } = ye({ GRAPHQL_URL: cr, cacheSize: pr, followRedirects: hr });

// node_modules/hyper-async/dist/index.js
var Async = (fork) => ({
  fork,
  toPromise: () => new Promise((resolve, reject3) => fork(reject3, resolve)),
  map: (fn) => Async((rej, res) => fork(rej, (x2) => res(fn(x2)))),
  bimap: (f, g) => Async(
    (rej, res) => fork(
      (x2) => rej(f(x2)),
      (x2) => res(g(x2))
    )
  ),
  chain: (fn) => Async((rej, res) => fork(rej, (x2) => fn(x2).fork(rej, res))),
  bichain: (f, g) => Async(
    (rej, res) => fork(
      (x2) => f(x2).fork(rej, res),
      (x2) => g(x2).fork(rej, res)
    )
  ),
  fold: (f, g) => Async(
    (rej, res) => fork(
      (x2) => f(x2).fork(rej, res),
      (x2) => g(x2).fork(rej, res)
    )
  )
});
var of = (x2) => Async((rej, res) => res(x2));
var Resolved = (x2) => Async((rej, res) => res(x2));
var Rejected = (x2) => Async((rej, res) => rej(x2));
var fromPromise = (f) => (...args) => Async(
  (rej, res) => f(...args).then(res).catch(rej)
);

// src/client/ao-mu.js
function deployMessageWith({ fetch: fetch2, MU_URL: MU_URL2, logger: _logger }) {
  const logger = _logger.child("deployMessage");
  return (args) => {
    return of(args).chain(
      fromPromise(({ processId, data, tags, anchor, signer }) => (
        /**
         * The processId is the target set on the data item
         * See https://specs.g8way.io/?tx=xwOgX-MmqN5_-Ny_zNu2A8o-PnTGsoRb_3FrtiMAkuw
         */
        signer({ data, tags, target: processId, anchor })
      ))
    ).chain(
      (signedDataItem) => of(signedDataItem).chain(fromPromise(
        async (signedDataItem2) => fetch2(
          MU_URL2,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/octet-stream",
              Accept: "application/json"
            },
            redirect: "follow",
            body: signedDataItem2.raw
          }
        )
      )).bichain(
        (err) => Rejected(new Error(`Error while communicating with MU: ${JSON.stringify(err)}`)),
        fromPromise(
          async (res) => {
            if (res.ok)
              return res.json();
            throw new Error(`${res.status}: ${await res.text()}`);
          }
        )
      ).bimap(
        logger.tap("Error encountered when writing message via MU"),
        logger.tap("Successfully wrote message via MU")
      ).map((res) => ({ res, messageId: signedDataItem.id }))
    ).toPromise();
  };
}
function deployProcessWith({ fetch: fetch2, MU_URL: MU_URL2, logger: _logger }) {
  const logger = _logger.child("deployProcess");
  return (args) => {
    return of(args).chain(fromPromise(({ data, tags, signer }) => signer({ data, tags }))).chain(
      (signedDataItem) => of(signedDataItem).chain(fromPromise(
        async (signedDataItem2) => fetch2(
          MU_URL2,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/octet-stream",
              Accept: "application/json"
            },
            redirect: "follow",
            body: signedDataItem2.raw
          }
        )
      )).bichain(
        (err) => Rejected(new Error(`Error while communicating with MU: ${JSON.stringify(err)}`)),
        fromPromise(
          async (res) => {
            if (res.ok)
              return res.json();
            throw new Error(`${res.status}: ${await res.text()}`);
          }
        )
      ).bimap(
        logger.tap("Error encountered when deploying process via MU"),
        logger.tap("Successfully deployed process via MU")
      ).map((res) => ({ res, processId: signedDataItem.id }))
    ).toPromise();
  };
}
function deployMonitorWith({ fetch: fetch2, MU_URL: MU_URL2, logger: _logger }) {
  const logger = _logger.child("deployMonitor");
  return (args) => of(args).chain(
    fromPromise(({ processId, data, tags, anchor, signer }) => (
      /**
       * The processId is the target set on the data item
       */
      signer({ data, tags, target: processId, anchor })
    ))
  ).chain(
    (signedDataItem) => of(signedDataItem).chain(fromPromise(
      async (signedDataItem2) => fetch2(
        MU_URL2 + "/monitor/" + args.processId,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/octet-stream",
            Accept: "application/json"
          },
          redirect: "follow",
          body: signedDataItem2.raw
        }
      )
    )).bichain(
      (err) => Rejected(new Error(`Error while communicating with MU: ${JSON.stringify(err)}`)),
      fromPromise(
        async (res) => {
          if (res.ok)
            return { ok: true };
          throw new Error(`${res.status}: ${await res.text()}`);
        }
      )
    ).bimap(
      logger.tap("Error encountered when subscribing to process via MU"),
      logger.tap("Successfully subscribed to process via MU")
    ).map((res) => ({ res, messageId: signedDataItem.id }))
  ).toPromise();
}
function deployUnmonitorWith({ fetch: fetch2, MU_URL: MU_URL2, logger: _logger }) {
  const logger = _logger.child("deployUnmonitor");
  return (args) => of(args).chain(
    fromPromise(({ processId, data, tags, anchor, signer }) => (
      /**
       * The processId is the target set on the data item
       */
      signer({ data, tags, target: processId, anchor })
    ))
  ).chain(
    (signedDataItem) => of(signedDataItem).chain(fromPromise(
      async (signedDataItem2) => fetch2(
        MU_URL2 + "/monitor/" + args.processId,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/octet-stream",
            Accept: "application/json"
          },
          redirect: "follow",
          body: signedDataItem2.raw
        }
      )
    )).bichain(
      (err) => Rejected(new Error(`Error while communicating with MU: ${JSON.stringify(err)}`)),
      fromPromise(
        async (res) => {
          if (res.ok)
            return { ok: true };
          throw new Error(`${res.status}: ${await res.text()}`);
        }
      )
    ).bimap(
      logger.tap("Error encountered when unsubscribing to process via MU"),
      logger.tap("Successfully unsubscribed to process via MU")
    ).map((res) => ({ res, messageId: signedDataItem.id }))
  ).toPromise();
}
function deployAssignWith({ fetch: fetch2, MU_URL: MU_URL2, logger: _logger }) {
  const logger = _logger.child("deployAssign");
  return (args) => {
    return of(args).chain(fromPromise(
      async ({ process: process2, message: message2, baseLayer, exclude }) => fetch2(
        `${MU_URL2}?process-id=${process2}&assign=${message2}${baseLayer ? "&base-layer" : ""}${exclude ? "&exclude=" + exclude.join(",") : ""}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/octet-stream",
            Accept: "application/json"
          }
        }
      )
    )).bichain(
      (err) => Rejected(new Error(`Error while communicating with MU: ${JSON.stringify(err)}`)),
      fromPromise(
        async (res) => {
          if (res.ok)
            return res.json();
          throw new Error(`${res.status}: ${await res.text()}`);
        }
      )
    ).bimap(
      logger.tap("Error encountered when writing assignment via MU"),
      logger.tap("Successfully wrote assignment via MU")
    ).map((res) => ({ res, assignmentId: res.id })).toPromise();
  };
}

// src/client/ao-cu.js
function dryrunFetchWith({ fetch: fetch2, CU_URL: CU_URL2, logger }) {
  return (msg) => of(msg).map(logger.tap("posting dryrun request to CU")).chain(fromPromise((msg2) => fetch2(`${CU_URL2}/dry-run?process-id=${msg2.Target}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    redirect: "follow",
    body: JSON.stringify(msg2)
  }).then((res) => res.json()))).toPromise();
}
function loadResultWith({ fetch: fetch2, CU_URL: CU_URL2, logger }) {
  return ({ id, processId }) => {
    return of(`${CU_URL2}/result/${id}?process-id=${processId}`).map(logger.tap("fetching message result from CU")).chain(fromPromise(
      async (url) => fetch2(url, {
        method: "GET",
        headers: {
          Accept: "application/json"
        },
        redirect: "follow"
      }).then((res) => res.json())
    )).toPromise();
  };
}
function queryResultsWith({ fetch: fetch2, CU_URL: CU_URL2, logger }) {
  return ({ process: process2, from, to, sort, limit }) => {
    const target = new URL(`${CU_URL2}/results/${process2}`);
    const params = new URLSearchParams(target.search);
    if (from) {
      params.append("from", from);
    }
    if (to) {
      params.append("to", to);
    }
    if (sort) {
      params.append("sort", sort);
    }
    if (limit) {
      params.append("limit", limit);
    }
    target.search = params;
    return of(target.toString()).map(logger.tap("fetching message result from CU")).chain(fromPromise(
      async (url) => fetch2(url, {
        method: "GET",
        headers: {
          Accept: "application/json"
        },
        redirect: "follow"
      }).then((res) => res.json())
    )).toPromise();
  };
}

// src/client/ao-su.js
var import_lru_map = __toESM(require_lru_map(), 1);
var processMetaCache;
var createProcessMetaCache = ({ MAX_SIZE }) => {
  if (processMetaCache)
    return processMetaCache;
  processMetaCache = new import_lru_map.default(MAX_SIZE);
  return processMetaCache;
};
var loadProcessMetaWith = ({ logger, fetch: fetch2, cache = processMetaCache }) => {
  return async ({ suUrl, processId }) => {
    if (cache.has(processId))
      return cache.get(processId);
    return fetch2(`${suUrl}/processes/${processId}`, { method: "GET", redirect: "follow" }).then(async (res) => {
      if (res.ok)
        return res.json();
      logger("Error Encountered when fetching process meta from SU '%s' for process '%s'", suUrl, processId);
      throw new Error(`Encountered Error fetching scheduled messages from Scheduler Unit: ${res.status}: ${await res.text()}`);
    }).then((meta) => {
      logger("Caching process meta for process '%s'", processId);
      cache.set(processId, { tags: meta.tags });
      return meta;
    });
  };
};

// node_modules/ramda/es/F.js
var F2 = function() {
  return false;
};
var F_default = F2;

// node_modules/ramda/es/T.js
var T2 = function() {
  return true;
};
var T_default = T2;

// node_modules/ramda/es/__.js
var __default = {
  "@@functional/placeholder": true
};

// node_modules/ramda/es/internal/_isPlaceholder.js
function _isPlaceholder(a) {
  return a != null && typeof a === "object" && a["@@functional/placeholder"] === true;
}

// node_modules/ramda/es/internal/_curry1.js
function _curry1(fn) {
  return function f1(a) {
    if (arguments.length === 0 || _isPlaceholder(a)) {
      return f1;
    } else {
      return fn.apply(this, arguments);
    }
  };
}

// node_modules/ramda/es/internal/_curry2.js
function _curry2(fn) {
  return function f2(a, b2) {
    switch (arguments.length) {
      case 0:
        return f2;
      case 1:
        return _isPlaceholder(a) ? f2 : _curry1(function(_b) {
          return fn(a, _b);
        });
      default:
        return _isPlaceholder(a) && _isPlaceholder(b2) ? f2 : _isPlaceholder(a) ? _curry1(function(_a) {
          return fn(_a, b2);
        }) : _isPlaceholder(b2) ? _curry1(function(_b) {
          return fn(a, _b);
        }) : fn(a, b2);
    }
  };
}

// node_modules/ramda/es/internal/_concat.js
function _concat(set1, set2) {
  set1 = set1 || [];
  set2 = set2 || [];
  var idx;
  var len1 = set1.length;
  var len2 = set2.length;
  var result2 = [];
  idx = 0;
  while (idx < len1) {
    result2[result2.length] = set1[idx];
    idx += 1;
  }
  idx = 0;
  while (idx < len2) {
    result2[result2.length] = set2[idx];
    idx += 1;
  }
  return result2;
}

// node_modules/ramda/es/internal/_arity.js
function _arity(n, fn) {
  switch (n) {
    case 0:
      return function() {
        return fn.apply(this, arguments);
      };
    case 1:
      return function(a0) {
        return fn.apply(this, arguments);
      };
    case 2:
      return function(a0, a1) {
        return fn.apply(this, arguments);
      };
    case 3:
      return function(a0, a1, a2) {
        return fn.apply(this, arguments);
      };
    case 4:
      return function(a0, a1, a2, a3) {
        return fn.apply(this, arguments);
      };
    case 5:
      return function(a0, a1, a2, a3, a4) {
        return fn.apply(this, arguments);
      };
    case 6:
      return function(a0, a1, a2, a3, a4, a5) {
        return fn.apply(this, arguments);
      };
    case 7:
      return function(a0, a1, a2, a3, a4, a5, a6) {
        return fn.apply(this, arguments);
      };
    case 8:
      return function(a0, a1, a2, a3, a4, a5, a6, a7) {
        return fn.apply(this, arguments);
      };
    case 9:
      return function(a0, a1, a2, a3, a4, a5, a6, a7, a8) {
        return fn.apply(this, arguments);
      };
    case 10:
      return function(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        return fn.apply(this, arguments);
      };
    default:
      throw new Error("First argument to _arity must be a non-negative integer no greater than ten");
  }
}

// node_modules/ramda/es/internal/_curryN.js
function _curryN(length, received, fn) {
  return function() {
    var combined = [];
    var argsIdx = 0;
    var left = length;
    var combinedIdx = 0;
    var hasPlaceholder = false;
    while (combinedIdx < received.length || argsIdx < arguments.length) {
      var result2;
      if (combinedIdx < received.length && (!_isPlaceholder(received[combinedIdx]) || argsIdx >= arguments.length)) {
        result2 = received[combinedIdx];
      } else {
        result2 = arguments[argsIdx];
        argsIdx += 1;
      }
      combined[combinedIdx] = result2;
      if (!_isPlaceholder(result2)) {
        left -= 1;
      } else {
        hasPlaceholder = true;
      }
      combinedIdx += 1;
    }
    return !hasPlaceholder && left <= 0 ? fn.apply(this, combined) : _arity(Math.max(0, left), _curryN(length, combined, fn));
  };
}

// node_modules/ramda/es/curryN.js
var curryN = /* @__PURE__ */ _curry2(function curryN2(length, fn) {
  if (length === 1) {
    return _curry1(fn);
  }
  return _arity(length, _curryN(length, [], fn));
});
var curryN_default = curryN;

// node_modules/ramda/es/internal/_curry3.js
function _curry3(fn) {
  return function f3(a, b2, c2) {
    switch (arguments.length) {
      case 0:
        return f3;
      case 1:
        return _isPlaceholder(a) ? f3 : _curry2(function(_b, _c) {
          return fn(a, _b, _c);
        });
      case 2:
        return _isPlaceholder(a) && _isPlaceholder(b2) ? f3 : _isPlaceholder(a) ? _curry2(function(_a, _c) {
          return fn(_a, b2, _c);
        }) : _isPlaceholder(b2) ? _curry2(function(_b, _c) {
          return fn(a, _b, _c);
        }) : _curry1(function(_c) {
          return fn(a, b2, _c);
        });
      default:
        return _isPlaceholder(a) && _isPlaceholder(b2) && _isPlaceholder(c2) ? f3 : _isPlaceholder(a) && _isPlaceholder(b2) ? _curry2(function(_a, _b) {
          return fn(_a, _b, c2);
        }) : _isPlaceholder(a) && _isPlaceholder(c2) ? _curry2(function(_a, _c) {
          return fn(_a, b2, _c);
        }) : _isPlaceholder(b2) && _isPlaceholder(c2) ? _curry2(function(_b, _c) {
          return fn(a, _b, _c);
        }) : _isPlaceholder(a) ? _curry1(function(_a) {
          return fn(_a, b2, c2);
        }) : _isPlaceholder(b2) ? _curry1(function(_b) {
          return fn(a, _b, c2);
        }) : _isPlaceholder(c2) ? _curry1(function(_c) {
          return fn(a, b2, _c);
        }) : fn(a, b2, c2);
    }
  };
}

// node_modules/ramda/es/internal/_isArray.js
var isArray_default = Array.isArray || function _isArray(val) {
  return val != null && val.length >= 0 && Object.prototype.toString.call(val) === "[object Array]";
};

// node_modules/ramda/es/internal/_isTransformer.js
function _isTransformer(obj) {
  return obj != null && typeof obj["@@transducer/step"] === "function";
}

// node_modules/ramda/es/internal/_dispatchable.js
function _dispatchable(methodNames, transducerCreator, fn) {
  return function() {
    if (arguments.length === 0) {
      return fn();
    }
    var obj = arguments[arguments.length - 1];
    if (!isArray_default(obj)) {
      var idx = 0;
      while (idx < methodNames.length) {
        if (typeof obj[methodNames[idx]] === "function") {
          return obj[methodNames[idx]].apply(obj, Array.prototype.slice.call(arguments, 0, -1));
        }
        idx += 1;
      }
      if (_isTransformer(obj)) {
        var transducer = transducerCreator.apply(null, Array.prototype.slice.call(arguments, 0, -1));
        return transducer(obj);
      }
    }
    return fn.apply(this, arguments);
  };
}

// node_modules/ramda/es/internal/_xfBase.js
var xfBase_default = {
  init: function() {
    return this.xf["@@transducer/init"]();
  },
  result: function(result2) {
    return this.xf["@@transducer/result"](result2);
  }
};

// node_modules/ramda/es/internal/_arrayFromIterator.js
function _arrayFromIterator(iter) {
  var list = [];
  var next;
  while (!(next = iter.next()).done) {
    list.push(next.value);
  }
  return list;
}

// node_modules/ramda/es/internal/_includesWith.js
function _includesWith(pred, x2, list) {
  var idx = 0;
  var len = list.length;
  while (idx < len) {
    if (pred(x2, list[idx])) {
      return true;
    }
    idx += 1;
  }
  return false;
}

// node_modules/ramda/es/internal/_functionName.js
function _functionName(f) {
  var match = String(f).match(/^function (\w*)/);
  return match == null ? "" : match[1];
}

// node_modules/ramda/es/internal/_has.js
function _has(prop3, obj) {
  return Object.prototype.hasOwnProperty.call(obj, prop3);
}

// node_modules/ramda/es/internal/_objectIs.js
function _objectIs(a, b2) {
  if (a === b2) {
    return a !== 0 || 1 / a === 1 / b2;
  } else {
    return a !== a && b2 !== b2;
  }
}
var objectIs_default = typeof Object.is === "function" ? Object.is : _objectIs;

// node_modules/ramda/es/internal/_isArguments.js
var toString = Object.prototype.toString;
var _isArguments = /* @__PURE__ */ function() {
  return toString.call(arguments) === "[object Arguments]" ? function _isArguments2(x2) {
    return toString.call(x2) === "[object Arguments]";
  } : function _isArguments2(x2) {
    return _has("callee", x2);
  };
}();
var isArguments_default = _isArguments;

// node_modules/ramda/es/keys.js
var hasEnumBug = !/* @__PURE__ */ {
  toString: null
}.propertyIsEnumerable("toString");
var nonEnumerableProps = ["constructor", "valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"];
var hasArgsEnumBug = /* @__PURE__ */ function() {
  "use strict";
  return arguments.propertyIsEnumerable("length");
}();
var contains = function contains2(list, item) {
  var idx = 0;
  while (idx < list.length) {
    if (list[idx] === item) {
      return true;
    }
    idx += 1;
  }
  return false;
};
var keys = typeof Object.keys === "function" && !hasArgsEnumBug ? /* @__PURE__ */ _curry1(function keys2(obj) {
  return Object(obj) !== obj ? [] : Object.keys(obj);
}) : /* @__PURE__ */ _curry1(function keys3(obj) {
  if (Object(obj) !== obj) {
    return [];
  }
  var prop3, nIdx;
  var ks = [];
  var checkArgsLength = hasArgsEnumBug && isArguments_default(obj);
  for (prop3 in obj) {
    if (_has(prop3, obj) && (!checkArgsLength || prop3 !== "length")) {
      ks[ks.length] = prop3;
    }
  }
  if (hasEnumBug) {
    nIdx = nonEnumerableProps.length - 1;
    while (nIdx >= 0) {
      prop3 = nonEnumerableProps[nIdx];
      if (_has(prop3, obj) && !contains(ks, prop3)) {
        ks[ks.length] = prop3;
      }
      nIdx -= 1;
    }
  }
  return ks;
});
var keys_default = keys;

// node_modules/ramda/es/type.js
var type = /* @__PURE__ */ _curry1(function type2(val) {
  return val === null ? "Null" : val === void 0 ? "Undefined" : Object.prototype.toString.call(val).slice(8, -1);
});
var type_default = type;

// node_modules/ramda/es/internal/_equals.js
function _uniqContentEquals(aIterator, bIterator, stackA, stackB) {
  var a = _arrayFromIterator(aIterator);
  var b2 = _arrayFromIterator(bIterator);
  function eq(_a, _b) {
    return _equals(_a, _b, stackA.slice(), stackB.slice());
  }
  return !_includesWith(function(b3, aItem) {
    return !_includesWith(eq, aItem, b3);
  }, b2, a);
}
function _equals(a, b2, stackA, stackB) {
  if (objectIs_default(a, b2)) {
    return true;
  }
  var typeA = type_default(a);
  if (typeA !== type_default(b2)) {
    return false;
  }
  if (typeof a["fantasy-land/equals"] === "function" || typeof b2["fantasy-land/equals"] === "function") {
    return typeof a["fantasy-land/equals"] === "function" && a["fantasy-land/equals"](b2) && typeof b2["fantasy-land/equals"] === "function" && b2["fantasy-land/equals"](a);
  }
  if (typeof a.equals === "function" || typeof b2.equals === "function") {
    return typeof a.equals === "function" && a.equals(b2) && typeof b2.equals === "function" && b2.equals(a);
  }
  switch (typeA) {
    case "Arguments":
    case "Array":
    case "Object":
      if (typeof a.constructor === "function" && _functionName(a.constructor) === "Promise") {
        return a === b2;
      }
      break;
    case "Boolean":
    case "Number":
    case "String":
      if (!(typeof a === typeof b2 && objectIs_default(a.valueOf(), b2.valueOf()))) {
        return false;
      }
      break;
    case "Date":
      if (!objectIs_default(a.valueOf(), b2.valueOf())) {
        return false;
      }
      break;
    case "Error":
      return a.name === b2.name && a.message === b2.message;
    case "RegExp":
      if (!(a.source === b2.source && a.global === b2.global && a.ignoreCase === b2.ignoreCase && a.multiline === b2.multiline && a.sticky === b2.sticky && a.unicode === b2.unicode)) {
        return false;
      }
      break;
  }
  var idx = stackA.length - 1;
  while (idx >= 0) {
    if (stackA[idx] === a) {
      return stackB[idx] === b2;
    }
    idx -= 1;
  }
  switch (typeA) {
    case "Map":
      if (a.size !== b2.size) {
        return false;
      }
      return _uniqContentEquals(a.entries(), b2.entries(), stackA.concat([a]), stackB.concat([b2]));
    case "Set":
      if (a.size !== b2.size) {
        return false;
      }
      return _uniqContentEquals(a.values(), b2.values(), stackA.concat([a]), stackB.concat([b2]));
    case "Arguments":
    case "Array":
    case "Object":
    case "Boolean":
    case "Number":
    case "String":
    case "Date":
    case "Error":
    case "RegExp":
    case "Int8Array":
    case "Uint8Array":
    case "Uint8ClampedArray":
    case "Int16Array":
    case "Uint16Array":
    case "Int32Array":
    case "Uint32Array":
    case "Float32Array":
    case "Float64Array":
    case "ArrayBuffer":
      break;
    default:
      return false;
  }
  var keysA = keys_default(a);
  if (keysA.length !== keys_default(b2).length) {
    return false;
  }
  var extendedStackA = stackA.concat([a]);
  var extendedStackB = stackB.concat([b2]);
  idx = keysA.length - 1;
  while (idx >= 0) {
    var key = keysA[idx];
    if (!(_has(key, b2) && _equals(b2[key], a[key], extendedStackA, extendedStackB))) {
      return false;
    }
    idx -= 1;
  }
  return true;
}

// node_modules/ramda/es/equals.js
var equals = /* @__PURE__ */ _curry2(function equals2(a, b2) {
  return _equals(a, b2, [], []);
});
var equals_default = equals;

// node_modules/ramda/es/internal/_indexOf.js
function _indexOf(list, a, idx) {
  var inf, item;
  if (typeof list.indexOf === "function") {
    switch (typeof a) {
      case "number":
        if (a === 0) {
          inf = 1 / a;
          while (idx < list.length) {
            item = list[idx];
            if (item === 0 && 1 / item === inf) {
              return idx;
            }
            idx += 1;
          }
          return -1;
        } else if (a !== a) {
          while (idx < list.length) {
            item = list[idx];
            if (typeof item === "number" && item !== item) {
              return idx;
            }
            idx += 1;
          }
          return -1;
        }
        return list.indexOf(a, idx);
      case "string":
      case "boolean":
      case "function":
      case "undefined":
        return list.indexOf(a, idx);
      case "object":
        if (a === null) {
          return list.indexOf(a, idx);
        }
    }
  }
  while (idx < list.length) {
    if (equals_default(list[idx], a)) {
      return idx;
    }
    idx += 1;
  }
  return -1;
}

// node_modules/ramda/es/internal/_includes.js
function _includes(a, list) {
  return _indexOf(list, a, 0) >= 0;
}

// node_modules/ramda/es/internal/_map.js
function _map(fn, functor) {
  var idx = 0;
  var len = functor.length;
  var result2 = Array(len);
  while (idx < len) {
    result2[idx] = fn(functor[idx]);
    idx += 1;
  }
  return result2;
}

// node_modules/ramda/es/internal/_quote.js
function _quote(s) {
  var escaped = s.replace(/\\/g, "\\\\").replace(/[\b]/g, "\\b").replace(/\f/g, "\\f").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t").replace(/\v/g, "\\v").replace(/\0/g, "\\0");
  return '"' + escaped.replace(/"/g, '\\"') + '"';
}

// node_modules/ramda/es/internal/_toISOString.js
var pad = function pad2(n) {
  return (n < 10 ? "0" : "") + n;
};
var _toISOString = typeof Date.prototype.toISOString === "function" ? function _toISOString2(d) {
  return d.toISOString();
} : function _toISOString3(d) {
  return d.getUTCFullYear() + "-" + pad(d.getUTCMonth() + 1) + "-" + pad(d.getUTCDate()) + "T" + pad(d.getUTCHours()) + ":" + pad(d.getUTCMinutes()) + ":" + pad(d.getUTCSeconds()) + "." + (d.getUTCMilliseconds() / 1e3).toFixed(3).slice(2, 5) + "Z";
};
var toISOString_default = _toISOString;

// node_modules/ramda/es/internal/_complement.js
function _complement(f) {
  return function() {
    return !f.apply(this, arguments);
  };
}

// node_modules/ramda/es/internal/_arrayReduce.js
function _arrayReduce(reducer, acc, list) {
  var index = 0;
  var length = list.length;
  while (index < length) {
    acc = reducer(acc, list[index]);
    index += 1;
  }
  return acc;
}

// node_modules/ramda/es/internal/_filter.js
function _filter(fn, list) {
  var idx = 0;
  var len = list.length;
  var result2 = [];
  while (idx < len) {
    if (fn(list[idx])) {
      result2[result2.length] = list[idx];
    }
    idx += 1;
  }
  return result2;
}

// node_modules/ramda/es/internal/_isObject.js
function _isObject(x2) {
  return Object.prototype.toString.call(x2) === "[object Object]";
}

// node_modules/ramda/es/internal/_xfilter.js
var XFilter = /* @__PURE__ */ function() {
  function XFilter2(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XFilter2.prototype["@@transducer/init"] = xfBase_default.init;
  XFilter2.prototype["@@transducer/result"] = xfBase_default.result;
  XFilter2.prototype["@@transducer/step"] = function(result2, input) {
    return this.f(input) ? this.xf["@@transducer/step"](result2, input) : result2;
  };
  return XFilter2;
}();
function _xfilter(f) {
  return function(xf) {
    return new XFilter(f, xf);
  };
}

// node_modules/ramda/es/filter.js
var filter = /* @__PURE__ */ _curry2(
  /* @__PURE__ */ _dispatchable(["fantasy-land/filter", "filter"], _xfilter, function(pred, filterable) {
    return _isObject(filterable) ? _arrayReduce(function(acc, key) {
      if (pred(filterable[key])) {
        acc[key] = filterable[key];
      }
      return acc;
    }, {}, keys_default(filterable)) : (
      // else
      _filter(pred, filterable)
    );
  })
);
var filter_default = filter;

// node_modules/ramda/es/reject.js
var reject = /* @__PURE__ */ _curry2(function reject2(pred, filterable) {
  return filter_default(_complement(pred), filterable);
});
var reject_default = reject;

// node_modules/ramda/es/internal/_toString.js
function _toString(x2, seen) {
  var recur = function recur2(y) {
    var xs = seen.concat([x2]);
    return _includes(y, xs) ? "<Circular>" : _toString(y, xs);
  };
  var mapPairs = function(obj, keys4) {
    return _map(function(k2) {
      return _quote(k2) + ": " + recur(obj[k2]);
    }, keys4.slice().sort());
  };
  switch (Object.prototype.toString.call(x2)) {
    case "[object Arguments]":
      return "(function() { return arguments; }(" + _map(recur, x2).join(", ") + "))";
    case "[object Array]":
      return "[" + _map(recur, x2).concat(mapPairs(x2, reject_default(function(k2) {
        return /^\d+$/.test(k2);
      }, keys_default(x2)))).join(", ") + "]";
    case "[object Boolean]":
      return typeof x2 === "object" ? "new Boolean(" + recur(x2.valueOf()) + ")" : x2.toString();
    case "[object Date]":
      return "new Date(" + (isNaN(x2.valueOf()) ? recur(NaN) : _quote(toISOString_default(x2))) + ")";
    case "[object Map]":
      return "new Map(" + recur(Array.from(x2)) + ")";
    case "[object Null]":
      return "null";
    case "[object Number]":
      return typeof x2 === "object" ? "new Number(" + recur(x2.valueOf()) + ")" : 1 / x2 === -Infinity ? "-0" : x2.toString(10);
    case "[object Set]":
      return "new Set(" + recur(Array.from(x2).sort()) + ")";
    case "[object String]":
      return typeof x2 === "object" ? "new String(" + recur(x2.valueOf()) + ")" : _quote(x2);
    case "[object Undefined]":
      return "undefined";
    default:
      if (typeof x2.toString === "function") {
        var repr = x2.toString();
        if (repr !== "[object Object]") {
          return repr;
        }
      }
      return "{" + mapPairs(x2, keys_default(x2)).join(", ") + "}";
  }
}

// node_modules/ramda/es/toString.js
var toString2 = /* @__PURE__ */ _curry1(function toString3(val) {
  return _toString(val, []);
});
var toString_default = toString2;

// node_modules/ramda/es/max.js
var max = /* @__PURE__ */ _curry2(function max2(a, b2) {
  if (a === b2) {
    return b2;
  }
  function safeMax(x2, y) {
    if (x2 > y !== y > x2) {
      return y > x2 ? y : x2;
    }
    return void 0;
  }
  var maxByValue = safeMax(a, b2);
  if (maxByValue !== void 0) {
    return maxByValue;
  }
  var maxByType = safeMax(typeof a, typeof b2);
  if (maxByType !== void 0) {
    return maxByType === typeof a ? a : b2;
  }
  var stringA = toString_default(a);
  var maxByStringValue = safeMax(stringA, toString_default(b2));
  if (maxByStringValue !== void 0) {
    return maxByStringValue === stringA ? a : b2;
  }
  return b2;
});
var max_default = max;

// node_modules/ramda/es/internal/_xmap.js
var XMap = /* @__PURE__ */ function() {
  function XMap2(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XMap2.prototype["@@transducer/init"] = xfBase_default.init;
  XMap2.prototype["@@transducer/result"] = xfBase_default.result;
  XMap2.prototype["@@transducer/step"] = function(result2, input) {
    return this.xf["@@transducer/step"](result2, this.f(input));
  };
  return XMap2;
}();
var _xmap = function _xmap2(f) {
  return function(xf) {
    return new XMap(f, xf);
  };
};
var xmap_default = _xmap;

// node_modules/ramda/es/map.js
var map = /* @__PURE__ */ _curry2(
  /* @__PURE__ */ _dispatchable(["fantasy-land/map", "map"], xmap_default, function map2(fn, functor) {
    switch (Object.prototype.toString.call(functor)) {
      case "[object Function]":
        return curryN_default(functor.length, function() {
          return fn.call(this, functor.apply(this, arguments));
        });
      case "[object Object]":
        return _arrayReduce(function(acc, key) {
          acc[key] = fn(functor[key]);
          return acc;
        }, {}, keys_default(functor));
      default:
        return _map(fn, functor);
    }
  })
);
var map_default = map;

// node_modules/ramda/es/internal/_isInteger.js
var isInteger_default = Number.isInteger || function _isInteger(n) {
  return n << 0 === n;
};

// node_modules/ramda/es/internal/_isString.js
function _isString(x2) {
  return Object.prototype.toString.call(x2) === "[object String]";
}

// node_modules/ramda/es/nth.js
var nth = /* @__PURE__ */ _curry2(function nth2(offset, list) {
  var idx = offset < 0 ? list.length + offset : offset;
  return _isString(list) ? list.charAt(idx) : list[idx];
});
var nth_default = nth;

// node_modules/ramda/es/prop.js
var prop = /* @__PURE__ */ _curry2(function prop2(p, obj) {
  if (obj == null) {
    return;
  }
  return isInteger_default(p) ? nth_default(p, obj) : obj[p];
});
var prop_default = prop;

// node_modules/ramda/es/pluck.js
var pluck = /* @__PURE__ */ _curry2(function pluck2(p, list) {
  return map_default(prop_default(p), list);
});
var pluck_default = pluck;

// node_modules/ramda/es/internal/_isArrayLike.js
var _isArrayLike = /* @__PURE__ */ _curry1(function isArrayLike(x2) {
  if (isArray_default(x2)) {
    return true;
  }
  if (!x2) {
    return false;
  }
  if (typeof x2 !== "object") {
    return false;
  }
  if (_isString(x2)) {
    return false;
  }
  if (x2.length === 0) {
    return true;
  }
  if (x2.length > 0) {
    return x2.hasOwnProperty(0) && x2.hasOwnProperty(x2.length - 1);
  }
  return false;
});
var isArrayLike_default = _isArrayLike;

// node_modules/ramda/es/internal/_createReduce.js
var symIterator = typeof Symbol !== "undefined" ? Symbol.iterator : "@@iterator";
function _createReduce(arrayReduce, methodReduce, iterableReduce) {
  return function _reduce(xf, acc, list) {
    if (isArrayLike_default(list)) {
      return arrayReduce(xf, acc, list);
    }
    if (list == null) {
      return acc;
    }
    if (typeof list["fantasy-land/reduce"] === "function") {
      return methodReduce(xf, acc, list, "fantasy-land/reduce");
    }
    if (list[symIterator] != null) {
      return iterableReduce(xf, acc, list[symIterator]());
    }
    if (typeof list.next === "function") {
      return iterableReduce(xf, acc, list);
    }
    if (typeof list.reduce === "function") {
      return methodReduce(xf, acc, list, "reduce");
    }
    throw new TypeError("reduce: list must be array or iterable");
  };
}

// node_modules/ramda/es/internal/_xArrayReduce.js
function _xArrayReduce(xf, acc, list) {
  var idx = 0;
  var len = list.length;
  while (idx < len) {
    acc = xf["@@transducer/step"](acc, list[idx]);
    if (acc && acc["@@transducer/reduced"]) {
      acc = acc["@@transducer/value"];
      break;
    }
    idx += 1;
  }
  return xf["@@transducer/result"](acc);
}

// node_modules/ramda/es/bind.js
var bind = /* @__PURE__ */ _curry2(function bind2(fn, thisObj) {
  return _arity(fn.length, function() {
    return fn.apply(thisObj, arguments);
  });
});
var bind_default = bind;

// node_modules/ramda/es/internal/_xReduce.js
function _xIterableReduce(xf, acc, iter) {
  var step = iter.next();
  while (!step.done) {
    acc = xf["@@transducer/step"](acc, step.value);
    if (acc && acc["@@transducer/reduced"]) {
      acc = acc["@@transducer/value"];
      break;
    }
    step = iter.next();
  }
  return xf["@@transducer/result"](acc);
}
function _xMethodReduce(xf, acc, obj, methodName) {
  return xf["@@transducer/result"](obj[methodName](bind_default(xf["@@transducer/step"], xf), acc));
}
var _xReduce = /* @__PURE__ */ _createReduce(_xArrayReduce, _xMethodReduce, _xIterableReduce);
var xReduce_default = _xReduce;

// node_modules/ramda/es/internal/_xwrap.js
var XWrap = /* @__PURE__ */ function() {
  function XWrap2(fn) {
    this.f = fn;
  }
  XWrap2.prototype["@@transducer/init"] = function() {
    throw new Error("init not implemented on XWrap");
  };
  XWrap2.prototype["@@transducer/result"] = function(acc) {
    return acc;
  };
  XWrap2.prototype["@@transducer/step"] = function(acc, x2) {
    return this.f(acc, x2);
  };
  return XWrap2;
}();
function _xwrap(fn) {
  return new XWrap(fn);
}

// node_modules/ramda/es/reduce.js
var reduce = /* @__PURE__ */ _curry3(function(xf, acc, list) {
  return xReduce_default(typeof xf === "function" ? _xwrap(xf) : xf, acc, list);
});
var reduce_default = reduce;

// node_modules/ramda/es/allPass.js
var allPass = /* @__PURE__ */ _curry1(function allPass2(preds) {
  return curryN_default(reduce_default(max_default, 0, pluck_default("length", preds)), function() {
    var idx = 0;
    var len = preds.length;
    while (idx < len) {
      if (!preds[idx].apply(this, arguments)) {
        return false;
      }
      idx += 1;
    }
    return true;
  });
});
var allPass_default = allPass;

// node_modules/ramda/es/always.js
var always = /* @__PURE__ */ _curry1(function always2(val) {
  return function() {
    return val;
  };
});
var always_default = always;

// node_modules/ramda/es/append.js
var append = /* @__PURE__ */ _curry2(function append2(el, list) {
  return _concat(list, [el]);
});
var append_default = append;

// node_modules/ramda/es/internal/_assoc.js
function _assoc(prop3, val, obj) {
  if (isInteger_default(prop3) && isArray_default(obj)) {
    var arr = [].concat(obj);
    arr[prop3] = val;
    return arr;
  }
  var result2 = {};
  for (var p in obj) {
    result2[p] = obj[p];
  }
  result2[prop3] = val;
  return result2;
}

// node_modules/ramda/es/isNil.js
var isNil = /* @__PURE__ */ _curry1(function isNil2(x2) {
  return x2 == null;
});
var isNil_default = isNil;

// node_modules/ramda/es/assocPath.js
var assocPath = /* @__PURE__ */ _curry3(function assocPath2(path3, val, obj) {
  if (path3.length === 0) {
    return val;
  }
  var idx = path3[0];
  if (path3.length > 1) {
    var nextObj = !isNil_default(obj) && _has(idx, obj) && typeof obj[idx] === "object" ? obj[idx] : isInteger_default(path3[1]) ? [] : {};
    val = assocPath2(Array.prototype.slice.call(path3, 1), val, nextObj);
  }
  return _assoc(idx, val, obj);
});
var assocPath_default = assocPath;

// node_modules/ramda/es/assoc.js
var assoc = /* @__PURE__ */ _curry3(function assoc2(prop3, val, obj) {
  return assocPath_default([prop3], val, obj);
});
var assoc_default = assoc;

// node_modules/ramda/es/internal/_isFunction.js
function _isFunction(x2) {
  var type3 = Object.prototype.toString.call(x2);
  return type3 === "[object Function]" || type3 === "[object AsyncFunction]" || type3 === "[object GeneratorFunction]" || type3 === "[object AsyncGeneratorFunction]";
}

// node_modules/ramda/es/internal/_makeFlat.js
function _makeFlat(recursive) {
  return function flatt(list) {
    var value, jlen, j2;
    var result2 = [];
    var idx = 0;
    var ilen = list.length;
    while (idx < ilen) {
      if (isArrayLike_default(list[idx])) {
        value = recursive ? flatt(list[idx]) : list[idx];
        j2 = 0;
        jlen = value.length;
        while (j2 < jlen) {
          result2[result2.length] = value[j2];
          j2 += 1;
        }
      } else {
        result2[result2.length] = list[idx];
      }
      idx += 1;
    }
    return result2;
  };
}

// node_modules/ramda/es/internal/_forceReduced.js
function _forceReduced(x2) {
  return {
    "@@transducer/value": x2,
    "@@transducer/reduced": true
  };
}

// node_modules/ramda/es/internal/_flatCat.js
var tInit = "@@transducer/init";
var tStep = "@@transducer/step";
var tResult = "@@transducer/result";
var XPreservingReduced = /* @__PURE__ */ function() {
  function XPreservingReduced2(xf) {
    this.xf = xf;
  }
  XPreservingReduced2.prototype[tInit] = xfBase_default.init;
  XPreservingReduced2.prototype[tResult] = xfBase_default.result;
  XPreservingReduced2.prototype[tStep] = function(result2, input) {
    var ret = this.xf[tStep](result2, input);
    return ret["@@transducer/reduced"] ? _forceReduced(ret) : ret;
  };
  return XPreservingReduced2;
}();
var XFlatCat = /* @__PURE__ */ function() {
  function XFlatCat2(xf) {
    this.xf = new XPreservingReduced(xf);
  }
  XFlatCat2.prototype[tInit] = xfBase_default.init;
  XFlatCat2.prototype[tResult] = xfBase_default.result;
  XFlatCat2.prototype[tStep] = function(result2, input) {
    return !isArrayLike_default(input) ? _xArrayReduce(this.xf, result2, [input]) : xReduce_default(this.xf, result2, input);
  };
  return XFlatCat2;
}();
var _flatCat = function _xcat(xf) {
  return new XFlatCat(xf);
};
var flatCat_default = _flatCat;

// node_modules/ramda/es/internal/_xchain.js
function _xchain(f) {
  return function(xf) {
    return xmap_default(f)(flatCat_default(xf));
  };
}

// node_modules/ramda/es/chain.js
var chain = /* @__PURE__ */ _curry2(
  /* @__PURE__ */ _dispatchable(["fantasy-land/chain", "chain"], _xchain, function chain2(fn, monad) {
    if (typeof monad === "function") {
      return function(x2) {
        return fn(monad(x2))(x2);
      };
    }
    return _makeFlat(false)(map_default(fn, monad));
  })
);
var chain_default = chain;

// node_modules/ramda/es/internal/_pipe.js
function _pipe(f, g) {
  return function() {
    return g.call(this, f.apply(this, arguments));
  };
}

// node_modules/ramda/es/internal/_checkForMethod.js
function _checkForMethod(methodname, fn) {
  return function() {
    var length = arguments.length;
    if (length === 0) {
      return fn();
    }
    var obj = arguments[length - 1];
    return isArray_default(obj) || typeof obj[methodname] !== "function" ? fn.apply(this, arguments) : obj[methodname].apply(obj, Array.prototype.slice.call(arguments, 0, length - 1));
  };
}

// node_modules/ramda/es/slice.js
var slice = /* @__PURE__ */ _curry3(
  /* @__PURE__ */ _checkForMethod("slice", function slice2(fromIndex, toIndex, list) {
    return Array.prototype.slice.call(list, fromIndex, toIndex);
  })
);
var slice_default = slice;

// node_modules/ramda/es/tail.js
var tail = /* @__PURE__ */ _curry1(
  /* @__PURE__ */ _checkForMethod(
    "tail",
    /* @__PURE__ */ slice_default(1, Infinity)
  )
);
var tail_default = tail;

// node_modules/ramda/es/pipe.js
function pipe() {
  if (arguments.length === 0) {
    throw new Error("pipe requires at least one argument");
  }
  return _arity(arguments[0].length, reduce_default(_pipe, arguments[0], tail_default(arguments)));
}

// node_modules/ramda/es/internal/_identity.js
function _identity(x2) {
  return x2;
}

// node_modules/ramda/es/identity.js
var identity = /* @__PURE__ */ _curry1(_identity);
var identity_default = identity;

// node_modules/ramda/es/concat.js
var concat = /* @__PURE__ */ _curry2(function concat2(a, b2) {
  if (isArray_default(a)) {
    if (isArray_default(b2)) {
      return a.concat(b2);
    }
    throw new TypeError(toString_default(b2) + " is not an array");
  }
  if (_isString(a)) {
    if (_isString(b2)) {
      return a + b2;
    }
    throw new TypeError(toString_default(b2) + " is not a string");
  }
  if (a != null && _isFunction(a["fantasy-land/concat"])) {
    return a["fantasy-land/concat"](b2);
  }
  if (a != null && _isFunction(a.concat)) {
    return a.concat(b2);
  }
  throw new TypeError(toString_default(a) + ' does not have a method named "concat" or "fantasy-land/concat"');
});
var concat_default = concat;

// node_modules/ramda/es/cond.js
var cond = /* @__PURE__ */ _curry1(function cond2(pairs) {
  var arity = reduce_default(max_default, 0, map_default(function(pair) {
    return pair[0].length;
  }, pairs));
  return _arity(arity, function() {
    var idx = 0;
    while (idx < pairs.length) {
      if (pairs[idx][0].apply(this, arguments)) {
        return pairs[idx][1].apply(this, arguments);
      }
      idx += 1;
    }
  });
});
var cond_default = cond;

// node_modules/ramda/es/defaultTo.js
var defaultTo = /* @__PURE__ */ _curry2(function defaultTo2(d, v2) {
  return v2 == null || v2 !== v2 ? d : v2;
});
var defaultTo_default = defaultTo;

// node_modules/ramda/es/hasPath.js
var hasPath = /* @__PURE__ */ _curry2(function hasPath2(_path, obj) {
  if (_path.length === 0 || isNil_default(obj)) {
    return false;
  }
  var val = obj;
  var idx = 0;
  while (idx < _path.length) {
    if (!isNil_default(val) && _has(_path[idx], val)) {
      val = val[_path[idx]];
      idx += 1;
    } else {
      return false;
    }
  }
  return true;
});
var hasPath_default = hasPath;

// node_modules/ramda/es/has.js
var has = /* @__PURE__ */ _curry2(function has2(prop3, obj) {
  return hasPath_default([prop3], obj);
});
var has_default = has;

// node_modules/ramda/es/ifElse.js
var ifElse = /* @__PURE__ */ _curry3(function ifElse2(condition, onTrue, onFalse) {
  return curryN_default(Math.max(condition.length, onTrue.length, onFalse.length), function _ifElse() {
    return condition.apply(this, arguments) ? onTrue.apply(this, arguments) : onFalse.apply(this, arguments);
  });
});
var ifElse_default = ifElse;

// node_modules/ramda/es/includes.js
var includes = /* @__PURE__ */ _curry2(_includes);
var includes_default = includes;

// node_modules/ramda/es/invoker.js
var invoker = /* @__PURE__ */ _curry2(function invoker2(arity, method) {
  return curryN_default(arity + 1, function() {
    var target = arguments[arity];
    if (target != null && _isFunction(target[method])) {
      return target[method].apply(target, Array.prototype.slice.call(arguments, 0, arity));
    }
    throw new TypeError(toString_default(target) + ' does not have a method named "' + method + '"');
  });
});
var invoker_default = invoker;

// node_modules/ramda/es/is.js
var is = /* @__PURE__ */ _curry2(function is2(Ctor, val) {
  return val instanceof Ctor || val != null && (val.constructor === Ctor || Ctor.name === "Object" && typeof val === "object");
});
var is_default = is;

// node_modules/ramda/es/isNotNil.js
var isNotNil = /* @__PURE__ */ _curry1(function isNotNil2(x2) {
  return !isNil_default(x2);
});
var isNotNil_default = isNotNil;

// node_modules/ramda/es/join.js
var join = /* @__PURE__ */ invoker_default(1, "join");
var join_default = join;

// node_modules/ramda/es/paths.js
var paths = /* @__PURE__ */ _curry2(function paths2(pathsArray, obj) {
  return pathsArray.map(function(paths3) {
    var val = obj;
    var idx = 0;
    var p;
    while (idx < paths3.length) {
      if (val == null) {
        return;
      }
      p = paths3[idx];
      val = isInteger_default(p) ? nth_default(p, val) : val[p];
      idx += 1;
    }
    return val;
  });
});
var paths_default = paths;

// node_modules/ramda/es/path.js
var path = /* @__PURE__ */ _curry2(function path2(pathAr, obj) {
  return paths_default([pathAr], obj)[0];
});
var path_default = path;

// node_modules/ramda/es/propEq.js
var propEq = /* @__PURE__ */ _curry3(function propEq2(val, name, obj) {
  return equals_default(val, prop_default(name, obj));
});
var propEq_default = propEq;

// node_modules/ramda/es/propOr.js
var propOr = /* @__PURE__ */ _curry3(function propOr2(val, p, obj) {
  return defaultTo_default(val, prop_default(p, obj));
});
var propOr_default = propOr;

// node_modules/ramda/es/internal/_xtap.js
var XTap = /* @__PURE__ */ function() {
  function XTap2(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XTap2.prototype["@@transducer/init"] = xfBase_default.init;
  XTap2.prototype["@@transducer/result"] = xfBase_default.result;
  XTap2.prototype["@@transducer/step"] = function(result2, input) {
    this.f(input);
    return this.xf["@@transducer/step"](result2, input);
  };
  return XTap2;
}();
function _xtap(f) {
  return function(xf) {
    return new XTap(f, xf);
  };
}

// node_modules/ramda/es/tap.js
var tap = /* @__PURE__ */ _curry2(
  /* @__PURE__ */ _dispatchable([], _xtap, function tap2(fn, x2) {
    fn(x2);
    return x2;
  })
);
var tap_default = tap;

// node_modules/zod/lib/index.mjs
var util;
(function(util2) {
  util2.assertEqual = (val) => val;
  function assertIs(_arg) {
  }
  util2.assertIs = assertIs;
  function assertNever(_x) {
    throw new Error();
  }
  util2.assertNever = assertNever;
  util2.arrayToEnum = (items) => {
    const obj = {};
    for (const item of items) {
      obj[item] = item;
    }
    return obj;
  };
  util2.getValidEnumValues = (obj) => {
    const validKeys = util2.objectKeys(obj).filter((k2) => typeof obj[obj[k2]] !== "number");
    const filtered = {};
    for (const k2 of validKeys) {
      filtered[k2] = obj[k2];
    }
    return util2.objectValues(filtered);
  };
  util2.objectValues = (obj) => {
    return util2.objectKeys(obj).map(function(e) {
      return obj[e];
    });
  };
  util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
    const keys4 = [];
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        keys4.push(key);
      }
    }
    return keys4;
  };
  util2.find = (arr, checker) => {
    for (const item of arr) {
      if (checker(item))
        return item;
    }
    return void 0;
  };
  util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && isFinite(val) && Math.floor(val) === val;
  function joinValues(array, separator = " | ") {
    return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
  }
  util2.joinValues = joinValues;
  util2.jsonStringifyReplacer = (_2, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  };
})(util || (util = {}));
var objectUtil;
(function(objectUtil2) {
  objectUtil2.mergeShapes = (first, second) => {
    return {
      ...first,
      ...second
      // second overwrites first
    };
  };
})(objectUtil || (objectUtil = {}));
var ZodParsedType = util.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]);
var getParsedType = (data) => {
  const t = typeof data;
  switch (t) {
    case "undefined":
      return ZodParsedType.undefined;
    case "string":
      return ZodParsedType.string;
    case "number":
      return isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
    case "boolean":
      return ZodParsedType.boolean;
    case "function":
      return ZodParsedType.function;
    case "bigint":
      return ZodParsedType.bigint;
    case "symbol":
      return ZodParsedType.symbol;
    case "object":
      if (Array.isArray(data)) {
        return ZodParsedType.array;
      }
      if (data === null) {
        return ZodParsedType.null;
      }
      if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
        return ZodParsedType.promise;
      }
      if (typeof Map !== "undefined" && data instanceof Map) {
        return ZodParsedType.map;
      }
      if (typeof Set !== "undefined" && data instanceof Set) {
        return ZodParsedType.set;
      }
      if (typeof Date !== "undefined" && data instanceof Date) {
        return ZodParsedType.date;
      }
      return ZodParsedType.object;
    default:
      return ZodParsedType.unknown;
  }
};
var ZodIssueCode = util.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]);
var quotelessJson = (obj) => {
  const json = JSON.stringify(obj, null, 2);
  return json.replace(/"([^"]+)":/g, "$1:");
};
var ZodError = class extends Error {
  constructor(issues) {
    super();
    this.issues = [];
    this.addIssue = (sub) => {
      this.issues = [...this.issues, sub];
    };
    this.addIssues = (subs = []) => {
      this.issues = [...this.issues, ...subs];
    };
    const actualProto = new.target.prototype;
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto);
    } else {
      this.__proto__ = actualProto;
    }
    this.name = "ZodError";
    this.issues = issues;
  }
  get errors() {
    return this.issues;
  }
  format(_mapper) {
    const mapper = _mapper || function(issue) {
      return issue.message;
    };
    const fieldErrors = { _errors: [] };
    const processError = (error) => {
      for (const issue of error.issues) {
        if (issue.code === "invalid_union") {
          issue.unionErrors.map(processError);
        } else if (issue.code === "invalid_return_type") {
          processError(issue.returnTypeError);
        } else if (issue.code === "invalid_arguments") {
          processError(issue.argumentsError);
        } else if (issue.path.length === 0) {
          fieldErrors._errors.push(mapper(issue));
        } else {
          let curr = fieldErrors;
          let i = 0;
          while (i < issue.path.length) {
            const el = issue.path[i];
            const terminal = i === issue.path.length - 1;
            if (!terminal) {
              curr[el] = curr[el] || { _errors: [] };
            } else {
              curr[el] = curr[el] || { _errors: [] };
              curr[el]._errors.push(mapper(issue));
            }
            curr = curr[el];
            i++;
          }
        }
      }
    };
    processError(this);
    return fieldErrors;
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(mapper = (issue) => issue.message) {
    const fieldErrors = {};
    const formErrors = [];
    for (const sub of this.issues) {
      if (sub.path.length > 0) {
        fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
        fieldErrors[sub.path[0]].push(mapper(sub));
      } else {
        formErrors.push(mapper(sub));
      }
    }
    return { formErrors, fieldErrors };
  }
  get formErrors() {
    return this.flatten();
  }
};
ZodError.create = (issues) => {
  const error = new ZodError(issues);
  return error;
};
var errorMap = (issue, _ctx) => {
  let message2;
  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      if (issue.received === ZodParsedType.undefined) {
        message2 = "Required";
      } else {
        message2 = `Expected ${issue.expected}, received ${issue.received}`;
      }
      break;
    case ZodIssueCode.invalid_literal:
      message2 = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
      break;
    case ZodIssueCode.unrecognized_keys:
      message2 = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
      break;
    case ZodIssueCode.invalid_union:
      message2 = `Invalid input`;
      break;
    case ZodIssueCode.invalid_union_discriminator:
      message2 = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
      break;
    case ZodIssueCode.invalid_enum_value:
      message2 = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
      break;
    case ZodIssueCode.invalid_arguments:
      message2 = `Invalid function arguments`;
      break;
    case ZodIssueCode.invalid_return_type:
      message2 = `Invalid function return type`;
      break;
    case ZodIssueCode.invalid_date:
      message2 = `Invalid date`;
      break;
    case ZodIssueCode.invalid_string:
      if (typeof issue.validation === "object") {
        if ("includes" in issue.validation) {
          message2 = `Invalid input: must include "${issue.validation.includes}"`;
          if (typeof issue.validation.position === "number") {
            message2 = `${message2} at one or more positions greater than or equal to ${issue.validation.position}`;
          }
        } else if ("startsWith" in issue.validation) {
          message2 = `Invalid input: must start with "${issue.validation.startsWith}"`;
        } else if ("endsWith" in issue.validation) {
          message2 = `Invalid input: must end with "${issue.validation.endsWith}"`;
        } else {
          util.assertNever(issue.validation);
        }
      } else if (issue.validation !== "regex") {
        message2 = `Invalid ${issue.validation}`;
      } else {
        message2 = "Invalid";
      }
      break;
    case ZodIssueCode.too_small:
      if (issue.type === "array")
        message2 = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
      else if (issue.type === "string")
        message2 = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
      else if (issue.type === "number")
        message2 = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "date")
        message2 = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
      else
        message2 = "Invalid input";
      break;
    case ZodIssueCode.too_big:
      if (issue.type === "array")
        message2 = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
      else if (issue.type === "string")
        message2 = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
      else if (issue.type === "number")
        message2 = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "bigint")
        message2 = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "date")
        message2 = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
      else
        message2 = "Invalid input";
      break;
    case ZodIssueCode.custom:
      message2 = `Invalid input`;
      break;
    case ZodIssueCode.invalid_intersection_types:
      message2 = `Intersection results could not be merged`;
      break;
    case ZodIssueCode.not_multiple_of:
      message2 = `Number must be a multiple of ${issue.multipleOf}`;
      break;
    case ZodIssueCode.not_finite:
      message2 = "Number must be finite";
      break;
    default:
      message2 = _ctx.defaultError;
      util.assertNever(issue);
  }
  return { message: message2 };
};
var overrideErrorMap = errorMap;
function setErrorMap(map3) {
  overrideErrorMap = map3;
}
function getErrorMap() {
  return overrideErrorMap;
}
var makeIssue = (params) => {
  const { data, path: path3, errorMaps, issueData } = params;
  const fullPath = [...path3, ...issueData.path || []];
  const fullIssue = {
    ...issueData,
    path: fullPath
  };
  let errorMessage = "";
  const maps = errorMaps.filter((m) => !!m).slice().reverse();
  for (const map3 of maps) {
    errorMessage = map3(fullIssue, { data, defaultError: errorMessage }).message;
  }
  return {
    ...issueData,
    path: fullPath,
    message: issueData.message || errorMessage
  };
};
var EMPTY_PATH = [];
function addIssueToContext(ctx, issueData) {
  const issue = makeIssue({
    issueData,
    data: ctx.data,
    path: ctx.path,
    errorMaps: [
      ctx.common.contextualErrorMap,
      ctx.schemaErrorMap,
      getErrorMap(),
      errorMap
      // then global default map
    ].filter((x2) => !!x2)
  });
  ctx.common.issues.push(issue);
}
var ParseStatus = class _ParseStatus {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    if (this.value === "valid")
      this.value = "dirty";
  }
  abort() {
    if (this.value !== "aborted")
      this.value = "aborted";
  }
  static mergeArray(status, results2) {
    const arrayValue = [];
    for (const s of results2) {
      if (s.status === "aborted")
        return INVALID;
      if (s.status === "dirty")
        status.dirty();
      arrayValue.push(s.value);
    }
    return { status: status.value, value: arrayValue };
  }
  static async mergeObjectAsync(status, pairs) {
    const syncPairs = [];
    for (const pair of pairs) {
      syncPairs.push({
        key: await pair.key,
        value: await pair.value
      });
    }
    return _ParseStatus.mergeObjectSync(status, syncPairs);
  }
  static mergeObjectSync(status, pairs) {
    const finalObject = {};
    for (const pair of pairs) {
      const { key, value } = pair;
      if (key.status === "aborted")
        return INVALID;
      if (value.status === "aborted")
        return INVALID;
      if (key.status === "dirty")
        status.dirty();
      if (value.status === "dirty")
        status.dirty();
      if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) {
        finalObject[key.value] = value.value;
      }
    }
    return { status: status.value, value: finalObject };
  }
};
var INVALID = Object.freeze({
  status: "aborted"
});
var DIRTY = (value) => ({ status: "dirty", value });
var OK = (value) => ({ status: "valid", value });
var isAborted = (x2) => x2.status === "aborted";
var isDirty = (x2) => x2.status === "dirty";
var isValid = (x2) => x2.status === "valid";
var isAsync = (x2) => typeof Promise !== "undefined" && x2 instanceof Promise;
var errorUtil;
(function(errorUtil2) {
  errorUtil2.errToObj = (message2) => typeof message2 === "string" ? { message: message2 } : message2 || {};
  errorUtil2.toString = (message2) => typeof message2 === "string" ? message2 : message2 === null || message2 === void 0 ? void 0 : message2.message;
})(errorUtil || (errorUtil = {}));
var ParseInputLazyPath = class {
  constructor(parent, value, path3, key) {
    this._cachedPath = [];
    this.parent = parent;
    this.data = value;
    this._path = path3;
    this._key = key;
  }
  get path() {
    if (!this._cachedPath.length) {
      if (this._key instanceof Array) {
        this._cachedPath.push(...this._path, ...this._key);
      } else {
        this._cachedPath.push(...this._path, this._key);
      }
    }
    return this._cachedPath;
  }
};
var handleResult = (ctx, result2) => {
  if (isValid(result2)) {
    return { success: true, data: result2.value };
  } else {
    if (!ctx.common.issues.length) {
      throw new Error("Validation failed but no issues detected.");
    }
    return {
      success: false,
      get error() {
        if (this._error)
          return this._error;
        const error = new ZodError(ctx.common.issues);
        this._error = error;
        return this._error;
      }
    };
  }
};
function processCreateParams(params) {
  if (!params)
    return {};
  const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
  if (errorMap2 && (invalid_type_error || required_error)) {
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  }
  if (errorMap2)
    return { errorMap: errorMap2, description };
  const customMap = (iss, ctx) => {
    if (iss.code !== "invalid_type")
      return { message: ctx.defaultError };
    if (typeof ctx.data === "undefined") {
      return { message: required_error !== null && required_error !== void 0 ? required_error : ctx.defaultError };
    }
    return { message: invalid_type_error !== null && invalid_type_error !== void 0 ? invalid_type_error : ctx.defaultError };
  };
  return { errorMap: customMap, description };
}
var ZodType = class {
  constructor(def) {
    this.spa = this.safeParseAsync;
    this._def = def;
    this.parse = this.parse.bind(this);
    this.safeParse = this.safeParse.bind(this);
    this.parseAsync = this.parseAsync.bind(this);
    this.safeParseAsync = this.safeParseAsync.bind(this);
    this.spa = this.spa.bind(this);
    this.refine = this.refine.bind(this);
    this.refinement = this.refinement.bind(this);
    this.superRefine = this.superRefine.bind(this);
    this.optional = this.optional.bind(this);
    this.nullable = this.nullable.bind(this);
    this.nullish = this.nullish.bind(this);
    this.array = this.array.bind(this);
    this.promise = this.promise.bind(this);
    this.or = this.or.bind(this);
    this.and = this.and.bind(this);
    this.transform = this.transform.bind(this);
    this.brand = this.brand.bind(this);
    this.default = this.default.bind(this);
    this.catch = this.catch.bind(this);
    this.describe = this.describe.bind(this);
    this.pipe = this.pipe.bind(this);
    this.readonly = this.readonly.bind(this);
    this.isNullable = this.isNullable.bind(this);
    this.isOptional = this.isOptional.bind(this);
  }
  get description() {
    return this._def.description;
  }
  _getType(input) {
    return getParsedType(input.data);
  }
  _getOrReturnCtx(input, ctx) {
    return ctx || {
      common: input.parent.common,
      data: input.data,
      parsedType: getParsedType(input.data),
      schemaErrorMap: this._def.errorMap,
      path: input.path,
      parent: input.parent
    };
  }
  _processInputParams(input) {
    return {
      status: new ParseStatus(),
      ctx: {
        common: input.parent.common,
        data: input.data,
        parsedType: getParsedType(input.data),
        schemaErrorMap: this._def.errorMap,
        path: input.path,
        parent: input.parent
      }
    };
  }
  _parseSync(input) {
    const result2 = this._parse(input);
    if (isAsync(result2)) {
      throw new Error("Synchronous parse encountered promise.");
    }
    return result2;
  }
  _parseAsync(input) {
    const result2 = this._parse(input);
    return Promise.resolve(result2);
  }
  parse(data, params) {
    const result2 = this.safeParse(data, params);
    if (result2.success)
      return result2.data;
    throw result2.error;
  }
  safeParse(data, params) {
    var _a;
    const ctx = {
      common: {
        issues: [],
        async: (_a = params === null || params === void 0 ? void 0 : params.async) !== null && _a !== void 0 ? _a : false,
        contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap
      },
      path: (params === null || params === void 0 ? void 0 : params.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const result2 = this._parseSync({ data, path: ctx.path, parent: ctx });
    return handleResult(ctx, result2);
  }
  async parseAsync(data, params) {
    const result2 = await this.safeParseAsync(data, params);
    if (result2.success)
      return result2.data;
    throw result2.error;
  }
  async safeParseAsync(data, params) {
    const ctx = {
      common: {
        issues: [],
        contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap,
        async: true
      },
      path: (params === null || params === void 0 ? void 0 : params.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
    const result2 = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
    return handleResult(ctx, result2);
  }
  refine(check, message2) {
    const getIssueProperties = (val) => {
      if (typeof message2 === "string" || typeof message2 === "undefined") {
        return { message: message2 };
      } else if (typeof message2 === "function") {
        return message2(val);
      } else {
        return message2;
      }
    };
    return this._refinement((val, ctx) => {
      const result2 = check(val);
      const setError = () => ctx.addIssue({
        code: ZodIssueCode.custom,
        ...getIssueProperties(val)
      });
      if (typeof Promise !== "undefined" && result2 instanceof Promise) {
        return result2.then((data) => {
          if (!data) {
            setError();
            return false;
          } else {
            return true;
          }
        });
      }
      if (!result2) {
        setError();
        return false;
      } else {
        return true;
      }
    });
  }
  refinement(check, refinementData) {
    return this._refinement((val, ctx) => {
      if (!check(val)) {
        ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
        return false;
      } else {
        return true;
      }
    });
  }
  _refinement(refinement) {
    return new ZodEffects({
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "refinement", refinement }
    });
  }
  superRefine(refinement) {
    return this._refinement(refinement);
  }
  optional() {
    return ZodOptional.create(this, this._def);
  }
  nullable() {
    return ZodNullable.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return ZodArray.create(this, this._def);
  }
  promise() {
    return ZodPromise.create(this, this._def);
  }
  or(option) {
    return ZodUnion.create([this, option], this._def);
  }
  and(incoming) {
    return ZodIntersection.create(this, incoming, this._def);
  }
  transform(transform) {
    return new ZodEffects({
      ...processCreateParams(this._def),
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "transform", transform }
    });
  }
  default(def) {
    const defaultValueFunc = typeof def === "function" ? def : () => def;
    return new ZodDefault({
      ...processCreateParams(this._def),
      innerType: this,
      defaultValue: defaultValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodDefault
    });
  }
  brand() {
    return new ZodBranded({
      typeName: ZodFirstPartyTypeKind.ZodBranded,
      type: this,
      ...processCreateParams(this._def)
    });
  }
  catch(def) {
    const catchValueFunc = typeof def === "function" ? def : () => def;
    return new ZodCatch({
      ...processCreateParams(this._def),
      innerType: this,
      catchValue: catchValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodCatch
    });
  }
  describe(description) {
    const This = this.constructor;
    return new This({
      ...this._def,
      description
    });
  }
  pipe(target) {
    return ZodPipeline.create(this, target);
  }
  readonly() {
    return ZodReadonly.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
};
var cuidRegex = /^c[^\s-]{8,}$/i;
var cuid2Regex = /^[a-z][a-z0-9]*$/;
var ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/;
var uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
var emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_+-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
var _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
var emojiRegex;
var ipv4Regex = /^(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))$/;
var ipv6Regex = /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/;
var datetimeRegex = (args) => {
  if (args.precision) {
    if (args.offset) {
      return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${args.precision}}(([+-]\\d{2}(:?\\d{2})?)|Z)$`);
    } else {
      return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${args.precision}}Z$`);
    }
  } else if (args.precision === 0) {
    if (args.offset) {
      return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(([+-]\\d{2}(:?\\d{2})?)|Z)$`);
    } else {
      return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$`);
    }
  } else {
    if (args.offset) {
      return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(([+-]\\d{2}(:?\\d{2})?)|Z)$`);
    } else {
      return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?Z$`);
    }
  }
};
function isValidIP(ip, version) {
  if ((version === "v4" || !version) && ipv4Regex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6Regex.test(ip)) {
    return true;
  }
  return false;
}
var ZodString = class _ZodString extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = String(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.string) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(
        ctx2,
        {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.string,
          received: ctx2.parsedType
        }
        //
      );
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.length < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.length > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "length") {
        const tooBig = input.data.length > check.value;
        const tooSmall = input.data.length < check.value;
        if (tooBig || tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          if (tooBig) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          } else if (tooSmall) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          }
          status.dirty();
        }
      } else if (check.kind === "email") {
        if (!emailRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "email",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "emoji") {
        if (!emojiRegex) {
          emojiRegex = new RegExp(_emojiRegex, "u");
        }
        if (!emojiRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "emoji",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "uuid") {
        if (!uuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "uuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid") {
        if (!cuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid2") {
        if (!cuid2Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid2",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ulid") {
        if (!ulidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ulid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "url") {
        try {
          new URL(input.data);
        } catch (_a) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "regex") {
        check.regex.lastIndex = 0;
        const testResult = check.regex.test(input.data);
        if (!testResult) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "regex",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "trim") {
        input.data = input.data.trim();
      } else if (check.kind === "includes") {
        if (!input.data.includes(check.value, check.position)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { includes: check.value, position: check.position },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "toLowerCase") {
        input.data = input.data.toLowerCase();
      } else if (check.kind === "toUpperCase") {
        input.data = input.data.toUpperCase();
      } else if (check.kind === "startsWith") {
        if (!input.data.startsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { startsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "endsWith") {
        if (!input.data.endsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { endsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "datetime") {
        const regex = datetimeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "datetime",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ip") {
        if (!isValidIP(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ip",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _regex(regex, validation, message2) {
    return this.refinement((data) => regex.test(data), {
      validation,
      code: ZodIssueCode.invalid_string,
      ...errorUtil.errToObj(message2)
    });
  }
  _addCheck(check) {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  email(message2) {
    return this._addCheck({ kind: "email", ...errorUtil.errToObj(message2) });
  }
  url(message2) {
    return this._addCheck({ kind: "url", ...errorUtil.errToObj(message2) });
  }
  emoji(message2) {
    return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message2) });
  }
  uuid(message2) {
    return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message2) });
  }
  cuid(message2) {
    return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message2) });
  }
  cuid2(message2) {
    return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message2) });
  }
  ulid(message2) {
    return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message2) });
  }
  ip(options) {
    return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options) });
  }
  datetime(options) {
    var _a;
    if (typeof options === "string") {
      return this._addCheck({
        kind: "datetime",
        precision: null,
        offset: false,
        message: options
      });
    }
    return this._addCheck({
      kind: "datetime",
      precision: typeof (options === null || options === void 0 ? void 0 : options.precision) === "undefined" ? null : options === null || options === void 0 ? void 0 : options.precision,
      offset: (_a = options === null || options === void 0 ? void 0 : options.offset) !== null && _a !== void 0 ? _a : false,
      ...errorUtil.errToObj(options === null || options === void 0 ? void 0 : options.message)
    });
  }
  regex(regex, message2) {
    return this._addCheck({
      kind: "regex",
      regex,
      ...errorUtil.errToObj(message2)
    });
  }
  includes(value, options) {
    return this._addCheck({
      kind: "includes",
      value,
      position: options === null || options === void 0 ? void 0 : options.position,
      ...errorUtil.errToObj(options === null || options === void 0 ? void 0 : options.message)
    });
  }
  startsWith(value, message2) {
    return this._addCheck({
      kind: "startsWith",
      value,
      ...errorUtil.errToObj(message2)
    });
  }
  endsWith(value, message2) {
    return this._addCheck({
      kind: "endsWith",
      value,
      ...errorUtil.errToObj(message2)
    });
  }
  min(minLength, message2) {
    return this._addCheck({
      kind: "min",
      value: minLength,
      ...errorUtil.errToObj(message2)
    });
  }
  max(maxLength, message2) {
    return this._addCheck({
      kind: "max",
      value: maxLength,
      ...errorUtil.errToObj(message2)
    });
  }
  length(len, message2) {
    return this._addCheck({
      kind: "length",
      value: len,
      ...errorUtil.errToObj(message2)
    });
  }
  /**
   * @deprecated Use z.string().min(1) instead.
   * @see {@link ZodString.min}
   */
  nonempty(message2) {
    return this.min(1, errorUtil.errToObj(message2));
  }
  trim() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((ch) => ch.kind === "datetime");
  }
  get isEmail() {
    return !!this._def.checks.find((ch) => ch.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((ch) => ch.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((ch) => ch.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((ch) => ch.kind === "uuid");
  }
  get isCUID() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((ch) => ch.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((ch) => ch.kind === "ip");
  }
  get minLength() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxLength() {
    let max3 = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max3 === null || ch.value < max3)
          max3 = ch.value;
      }
    }
    return max3;
  }
};
ZodString.create = (params) => {
  var _a;
  return new ZodString({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodString,
    coerce: (_a = params === null || params === void 0 ? void 0 : params.coerce) !== null && _a !== void 0 ? _a : false,
    ...processCreateParams(params)
  });
};
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepDecCount = (step.toString().split(".")[1] || "").length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / Math.pow(10, decCount);
}
var ZodNumber = class _ZodNumber extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
    this.step = this.multipleOf;
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = Number(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.number) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.number,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "int") {
        if (!util.isInteger(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: "integer",
            received: "float",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (floatSafeRemainder(input.data, check.value) !== 0) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "finite") {
        if (!Number.isFinite(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_finite,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  gte(value, message2) {
    return this.setLimit("min", value, true, errorUtil.toString(message2));
  }
  gt(value, message2) {
    return this.setLimit("min", value, false, errorUtil.toString(message2));
  }
  lte(value, message2) {
    return this.setLimit("max", value, true, errorUtil.toString(message2));
  }
  lt(value, message2) {
    return this.setLimit("max", value, false, errorUtil.toString(message2));
  }
  setLimit(kind, value, inclusive, message2) {
    return new _ZodNumber({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message2)
        }
      ]
    });
  }
  _addCheck(check) {
    return new _ZodNumber({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  int(message2) {
    return this._addCheck({
      kind: "int",
      message: errorUtil.toString(message2)
    });
  }
  positive(message2) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message2)
    });
  }
  negative(message2) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message2)
    });
  }
  nonpositive(message2) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message2)
    });
  }
  nonnegative(message2) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message2)
    });
  }
  multipleOf(value, message2) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message2)
    });
  }
  finite(message2) {
    return this._addCheck({
      kind: "finite",
      message: errorUtil.toString(message2)
    });
  }
  safe(message2) {
    return this._addCheck({
      kind: "min",
      inclusive: true,
      value: Number.MIN_SAFE_INTEGER,
      message: errorUtil.toString(message2)
    })._addCheck({
      kind: "max",
      inclusive: true,
      value: Number.MAX_SAFE_INTEGER,
      message: errorUtil.toString(message2)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max3 = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max3 === null || ch.value < max3)
          max3 = ch.value;
      }
    }
    return max3;
  }
  get isInt() {
    return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
  }
  get isFinite() {
    let max3 = null, min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
        return true;
      } else if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      } else if (ch.kind === "max") {
        if (max3 === null || ch.value < max3)
          max3 = ch.value;
      }
    }
    return Number.isFinite(min) && Number.isFinite(max3);
  }
};
ZodNumber.create = (params) => {
  return new ZodNumber({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodNumber,
    coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
    ...processCreateParams(params)
  });
};
var ZodBigInt = class _ZodBigInt extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = BigInt(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.bigint) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.bigint,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            type: "bigint",
            minimum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            type: "bigint",
            maximum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (input.data % check.value !== BigInt(0)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  gte(value, message2) {
    return this.setLimit("min", value, true, errorUtil.toString(message2));
  }
  gt(value, message2) {
    return this.setLimit("min", value, false, errorUtil.toString(message2));
  }
  lte(value, message2) {
    return this.setLimit("max", value, true, errorUtil.toString(message2));
  }
  lt(value, message2) {
    return this.setLimit("max", value, false, errorUtil.toString(message2));
  }
  setLimit(kind, value, inclusive, message2) {
    return new _ZodBigInt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message2)
        }
      ]
    });
  }
  _addCheck(check) {
    return new _ZodBigInt({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  positive(message2) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message2)
    });
  }
  negative(message2) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message2)
    });
  }
  nonpositive(message2) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message2)
    });
  }
  nonnegative(message2) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message2)
    });
  }
  multipleOf(value, message2) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message2)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max3 = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max3 === null || ch.value < max3)
          max3 = ch.value;
      }
    }
    return max3;
  }
};
ZodBigInt.create = (params) => {
  var _a;
  return new ZodBigInt({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodBigInt,
    coerce: (_a = params === null || params === void 0 ? void 0 : params.coerce) !== null && _a !== void 0 ? _a : false,
    ...processCreateParams(params)
  });
};
var ZodBoolean = class extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = Boolean(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.boolean) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.boolean,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodBoolean.create = (params) => {
  return new ZodBoolean({
    typeName: ZodFirstPartyTypeKind.ZodBoolean,
    coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
    ...processCreateParams(params)
  });
};
var ZodDate = class _ZodDate extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = new Date(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.date) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.date,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    if (isNaN(input.data.getTime())) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_date
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.getTime() < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            message: check.message,
            inclusive: true,
            exact: false,
            minimum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.getTime() > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            message: check.message,
            inclusive: true,
            exact: false,
            maximum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return {
      status: status.value,
      value: new Date(input.data.getTime())
    };
  }
  _addCheck(check) {
    return new _ZodDate({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  min(minDate, message2) {
    return this._addCheck({
      kind: "min",
      value: minDate.getTime(),
      message: errorUtil.toString(message2)
    });
  }
  max(maxDate, message2) {
    return this._addCheck({
      kind: "max",
      value: maxDate.getTime(),
      message: errorUtil.toString(message2)
    });
  }
  get minDate() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min != null ? new Date(min) : null;
  }
  get maxDate() {
    let max3 = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max3 === null || ch.value < max3)
          max3 = ch.value;
      }
    }
    return max3 != null ? new Date(max3) : null;
  }
};
ZodDate.create = (params) => {
  return new ZodDate({
    checks: [],
    coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
    typeName: ZodFirstPartyTypeKind.ZodDate,
    ...processCreateParams(params)
  });
};
var ZodSymbol = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.symbol) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.symbol,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodSymbol.create = (params) => {
  return new ZodSymbol({
    typeName: ZodFirstPartyTypeKind.ZodSymbol,
    ...processCreateParams(params)
  });
};
var ZodUndefined = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.undefined,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodUndefined.create = (params) => {
  return new ZodUndefined({
    typeName: ZodFirstPartyTypeKind.ZodUndefined,
    ...processCreateParams(params)
  });
};
var ZodNull = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.null) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.null,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodNull.create = (params) => {
  return new ZodNull({
    typeName: ZodFirstPartyTypeKind.ZodNull,
    ...processCreateParams(params)
  });
};
var ZodAny = class extends ZodType {
  constructor() {
    super(...arguments);
    this._any = true;
  }
  _parse(input) {
    return OK(input.data);
  }
};
ZodAny.create = (params) => {
  return new ZodAny({
    typeName: ZodFirstPartyTypeKind.ZodAny,
    ...processCreateParams(params)
  });
};
var ZodUnknown = class extends ZodType {
  constructor() {
    super(...arguments);
    this._unknown = true;
  }
  _parse(input) {
    return OK(input.data);
  }
};
ZodUnknown.create = (params) => {
  return new ZodUnknown({
    typeName: ZodFirstPartyTypeKind.ZodUnknown,
    ...processCreateParams(params)
  });
};
var ZodNever = class extends ZodType {
  _parse(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.never,
      received: ctx.parsedType
    });
    return INVALID;
  }
};
ZodNever.create = (params) => {
  return new ZodNever({
    typeName: ZodFirstPartyTypeKind.ZodNever,
    ...processCreateParams(params)
  });
};
var ZodVoid = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.void,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodVoid.create = (params) => {
  return new ZodVoid({
    typeName: ZodFirstPartyTypeKind.ZodVoid,
    ...processCreateParams(params)
  });
};
var ZodArray = class _ZodArray extends ZodType {
  _parse(input) {
    const { ctx, status } = this._processInputParams(input);
    const def = this._def;
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (def.exactLength !== null) {
      const tooBig = ctx.data.length > def.exactLength.value;
      const tooSmall = ctx.data.length < def.exactLength.value;
      if (tooBig || tooSmall) {
        addIssueToContext(ctx, {
          code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
          minimum: tooSmall ? def.exactLength.value : void 0,
          maximum: tooBig ? def.exactLength.value : void 0,
          type: "array",
          inclusive: true,
          exact: true,
          message: def.exactLength.message
        });
        status.dirty();
      }
    }
    if (def.minLength !== null) {
      if (ctx.data.length < def.minLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.minLength.message
        });
        status.dirty();
      }
    }
    if (def.maxLength !== null) {
      if (ctx.data.length > def.maxLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.maxLength.message
        });
        status.dirty();
      }
    }
    if (ctx.common.async) {
      return Promise.all([...ctx.data].map((item, i) => {
        return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
      })).then((result3) => {
        return ParseStatus.mergeArray(status, result3);
      });
    }
    const result2 = [...ctx.data].map((item, i) => {
      return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
    });
    return ParseStatus.mergeArray(status, result2);
  }
  get element() {
    return this._def.type;
  }
  min(minLength, message2) {
    return new _ZodArray({
      ...this._def,
      minLength: { value: minLength, message: errorUtil.toString(message2) }
    });
  }
  max(maxLength, message2) {
    return new _ZodArray({
      ...this._def,
      maxLength: { value: maxLength, message: errorUtil.toString(message2) }
    });
  }
  length(len, message2) {
    return new _ZodArray({
      ...this._def,
      exactLength: { value: len, message: errorUtil.toString(message2) }
    });
  }
  nonempty(message2) {
    return this.min(1, message2);
  }
};
ZodArray.create = (schema, params) => {
  return new ZodArray({
    type: schema,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: ZodFirstPartyTypeKind.ZodArray,
    ...processCreateParams(params)
  });
};
function deepPartialify(schema) {
  if (schema instanceof ZodObject) {
    const newShape = {};
    for (const key in schema.shape) {
      const fieldSchema = schema.shape[key];
      newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
    }
    return new ZodObject({
      ...schema._def,
      shape: () => newShape
    });
  } else if (schema instanceof ZodArray) {
    return new ZodArray({
      ...schema._def,
      type: deepPartialify(schema.element)
    });
  } else if (schema instanceof ZodOptional) {
    return ZodOptional.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodNullable) {
    return ZodNullable.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodTuple) {
    return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
  } else {
    return schema;
  }
}
var ZodObject = class _ZodObject extends ZodType {
  constructor() {
    super(...arguments);
    this._cached = null;
    this.nonstrict = this.passthrough;
    this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const shape = this._def.shape();
    const keys4 = util.objectKeys(shape);
    return this._cached = { shape, keys: keys4 };
  }
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.object) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const { status, ctx } = this._processInputParams(input);
    const { shape, keys: shapeKeys } = this._getCached();
    const extraKeys = [];
    if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
      for (const key in ctx.data) {
        if (!shapeKeys.includes(key)) {
          extraKeys.push(key);
        }
      }
    }
    const pairs = [];
    for (const key of shapeKeys) {
      const keyValidator = shape[key];
      const value = ctx.data[key];
      pairs.push({
        key: { status: "valid", value: key },
        value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (this._def.catchall instanceof ZodNever) {
      const unknownKeys = this._def.unknownKeys;
      if (unknownKeys === "passthrough") {
        for (const key of extraKeys) {
          pairs.push({
            key: { status: "valid", value: key },
            value: { status: "valid", value: ctx.data[key] }
          });
        }
      } else if (unknownKeys === "strict") {
        if (extraKeys.length > 0) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.unrecognized_keys,
            keys: extraKeys
          });
          status.dirty();
        }
      } else if (unknownKeys === "strip")
        ;
      else {
        throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
      }
    } else {
      const catchall = this._def.catchall;
      for (const key of extraKeys) {
        const value = ctx.data[key];
        pairs.push({
          key: { status: "valid", value: key },
          value: catchall._parse(
            new ParseInputLazyPath(ctx, value, ctx.path, key)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: key in ctx.data
        });
      }
    }
    if (ctx.common.async) {
      return Promise.resolve().then(async () => {
        const syncPairs = [];
        for (const pair of pairs) {
          const key = await pair.key;
          syncPairs.push({
            key,
            value: await pair.value,
            alwaysSet: pair.alwaysSet
          });
        }
        return syncPairs;
      }).then((syncPairs) => {
        return ParseStatus.mergeObjectSync(status, syncPairs);
      });
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get shape() {
    return this._def.shape();
  }
  strict(message2) {
    errorUtil.errToObj;
    return new _ZodObject({
      ...this._def,
      unknownKeys: "strict",
      ...message2 !== void 0 ? {
        errorMap: (issue, ctx) => {
          var _a, _b, _c, _d;
          const defaultError = (_c = (_b = (_a = this._def).errorMap) === null || _b === void 0 ? void 0 : _b.call(_a, issue, ctx).message) !== null && _c !== void 0 ? _c : ctx.defaultError;
          if (issue.code === "unrecognized_keys")
            return {
              message: (_d = errorUtil.errToObj(message2).message) !== null && _d !== void 0 ? _d : defaultError
            };
          return {
            message: defaultError
          };
        }
      } : {}
    });
  }
  strip() {
    return new _ZodObject({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new _ZodObject({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(augmentation) {
    return new _ZodObject({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...augmentation
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(merging) {
    const merged = new _ZodObject({
      unknownKeys: merging._def.unknownKeys,
      catchall: merging._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...merging._def.shape()
      }),
      typeName: ZodFirstPartyTypeKind.ZodObject
    });
    return merged;
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(key, schema) {
    return this.augment({ [key]: schema });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(index) {
    return new _ZodObject({
      ...this._def,
      catchall: index
    });
  }
  pick(mask) {
    const shape = {};
    util.objectKeys(mask).forEach((key) => {
      if (mask[key] && this.shape[key]) {
        shape[key] = this.shape[key];
      }
    });
    return new _ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  omit(mask) {
    const shape = {};
    util.objectKeys(this.shape).forEach((key) => {
      if (!mask[key]) {
        shape[key] = this.shape[key];
      }
    });
    return new _ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return deepPartialify(this);
  }
  partial(mask) {
    const newShape = {};
    util.objectKeys(this.shape).forEach((key) => {
      const fieldSchema = this.shape[key];
      if (mask && !mask[key]) {
        newShape[key] = fieldSchema;
      } else {
        newShape[key] = fieldSchema.optional();
      }
    });
    return new _ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  required(mask) {
    const newShape = {};
    util.objectKeys(this.shape).forEach((key) => {
      if (mask && !mask[key]) {
        newShape[key] = this.shape[key];
      } else {
        const fieldSchema = this.shape[key];
        let newField = fieldSchema;
        while (newField instanceof ZodOptional) {
          newField = newField._def.innerType;
        }
        newShape[key] = newField;
      }
    });
    return new _ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  keyof() {
    return createZodEnum(util.objectKeys(this.shape));
  }
};
ZodObject.create = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.strictCreate = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strict",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.lazycreate = (shape, params) => {
  return new ZodObject({
    shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
var ZodUnion = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const options = this._def.options;
    function handleResults(results2) {
      for (const result2 of results2) {
        if (result2.result.status === "valid") {
          return result2.result;
        }
      }
      for (const result2 of results2) {
        if (result2.result.status === "dirty") {
          ctx.common.issues.push(...result2.ctx.common.issues);
          return result2.result;
        }
      }
      const unionErrors = results2.map((result2) => new ZodError(result2.ctx.common.issues));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return Promise.all(options.map(async (option) => {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await option._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: childCtx
          }),
          ctx: childCtx
        };
      })).then(handleResults);
    } else {
      let dirty = void 0;
      const issues = [];
      for (const option of options) {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        const result2 = option._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: childCtx
        });
        if (result2.status === "valid") {
          return result2;
        } else if (result2.status === "dirty" && !dirty) {
          dirty = { result: result2, ctx: childCtx };
        }
        if (childCtx.common.issues.length) {
          issues.push(childCtx.common.issues);
        }
      }
      if (dirty) {
        ctx.common.issues.push(...dirty.ctx.common.issues);
        return dirty.result;
      }
      const unionErrors = issues.map((issues2) => new ZodError(issues2));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
  }
  get options() {
    return this._def.options;
  }
};
ZodUnion.create = (types, params) => {
  return new ZodUnion({
    options: types,
    typeName: ZodFirstPartyTypeKind.ZodUnion,
    ...processCreateParams(params)
  });
};
var getDiscriminator = (type3) => {
  if (type3 instanceof ZodLazy) {
    return getDiscriminator(type3.schema);
  } else if (type3 instanceof ZodEffects) {
    return getDiscriminator(type3.innerType());
  } else if (type3 instanceof ZodLiteral) {
    return [type3.value];
  } else if (type3 instanceof ZodEnum) {
    return type3.options;
  } else if (type3 instanceof ZodNativeEnum) {
    return Object.keys(type3.enum);
  } else if (type3 instanceof ZodDefault) {
    return getDiscriminator(type3._def.innerType);
  } else if (type3 instanceof ZodUndefined) {
    return [void 0];
  } else if (type3 instanceof ZodNull) {
    return [null];
  } else {
    return null;
  }
};
var ZodDiscriminatedUnion = class _ZodDiscriminatedUnion extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const discriminator = this.discriminator;
    const discriminatorValue = ctx.data[discriminator];
    const option = this.optionsMap.get(discriminatorValue);
    if (!option) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union_discriminator,
        options: Array.from(this.optionsMap.keys()),
        path: [discriminator]
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return option._parseAsync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    } else {
      return option._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    }
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  /**
   * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
   * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
   * have a different value for each object in the union.
   * @param discriminator the name of the discriminator property
   * @param types an array of object schemas
   * @param params
   */
  static create(discriminator, options, params) {
    const optionsMap = /* @__PURE__ */ new Map();
    for (const type3 of options) {
      const discriminatorValues = getDiscriminator(type3.shape[discriminator]);
      if (!discriminatorValues) {
        throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
      }
      for (const value of discriminatorValues) {
        if (optionsMap.has(value)) {
          throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
        }
        optionsMap.set(value, type3);
      }
    }
    return new _ZodDiscriminatedUnion({
      typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
      discriminator,
      options,
      optionsMap,
      ...processCreateParams(params)
    });
  }
};
function mergeValues(a, b2) {
  const aType = getParsedType(a);
  const bType = getParsedType(b2);
  if (a === b2) {
    return { valid: true, data: a };
  } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
    const bKeys = util.objectKeys(b2);
    const sharedKeys = util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a, ...b2 };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a[key], b2[key]);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
    if (a.length !== b2.length) {
      return { valid: false };
    }
    const newArray = [];
    for (let index = 0; index < a.length; index++) {
      const itemA = a[index];
      const itemB = b2[index];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b2) {
    return { valid: true, data: a };
  } else {
    return { valid: false };
  }
}
var ZodIntersection = class extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const handleParsed = (parsedLeft, parsedRight) => {
      if (isAborted(parsedLeft) || isAborted(parsedRight)) {
        return INVALID;
      }
      const merged = mergeValues(parsedLeft.value, parsedRight.value);
      if (!merged.valid) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_intersection_types
        });
        return INVALID;
      }
      if (isDirty(parsedLeft) || isDirty(parsedRight)) {
        status.dirty();
      }
      return { status: status.value, value: merged.data };
    };
    if (ctx.common.async) {
      return Promise.all([
        this._def.left._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        }),
        this._def.right._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        })
      ]).then(([left, right]) => handleParsed(left, right));
    } else {
      return handleParsed(this._def.left._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }), this._def.right._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }));
    }
  }
};
ZodIntersection.create = (left, right, params) => {
  return new ZodIntersection({
    left,
    right,
    typeName: ZodFirstPartyTypeKind.ZodIntersection,
    ...processCreateParams(params)
  });
};
var ZodTuple = class _ZodTuple extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (ctx.data.length < this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_small,
        minimum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      return INVALID;
    }
    const rest = this._def.rest;
    if (!rest && ctx.data.length > this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_big,
        maximum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      status.dirty();
    }
    const items = [...ctx.data].map((item, itemIndex) => {
      const schema = this._def.items[itemIndex] || this._def.rest;
      if (!schema)
        return null;
      return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
    }).filter((x2) => !!x2);
    if (ctx.common.async) {
      return Promise.all(items).then((results2) => {
        return ParseStatus.mergeArray(status, results2);
      });
    } else {
      return ParseStatus.mergeArray(status, items);
    }
  }
  get items() {
    return this._def.items;
  }
  rest(rest) {
    return new _ZodTuple({
      ...this._def,
      rest
    });
  }
};
ZodTuple.create = (schemas, params) => {
  if (!Array.isArray(schemas)) {
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  }
  return new ZodTuple({
    items: schemas,
    typeName: ZodFirstPartyTypeKind.ZodTuple,
    rest: null,
    ...processCreateParams(params)
  });
};
var ZodRecord = class _ZodRecord extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const pairs = [];
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    for (const key in ctx.data) {
      pairs.push({
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
        value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key))
      });
    }
    if (ctx.common.async) {
      return ParseStatus.mergeObjectAsync(status, pairs);
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get element() {
    return this._def.valueType;
  }
  static create(first, second, third) {
    if (second instanceof ZodType) {
      return new _ZodRecord({
        keyType: first,
        valueType: second,
        typeName: ZodFirstPartyTypeKind.ZodRecord,
        ...processCreateParams(third)
      });
    }
    return new _ZodRecord({
      keyType: ZodString.create(),
      valueType: first,
      typeName: ZodFirstPartyTypeKind.ZodRecord,
      ...processCreateParams(second)
    });
  }
};
var ZodMap = class extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.map) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.map,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    const pairs = [...ctx.data.entries()].map(([key, value], index) => {
      return {
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
        value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
      };
    });
    if (ctx.common.async) {
      const finalMap = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          if (key.status === "aborted" || value.status === "aborted") {
            return INVALID;
          }
          if (key.status === "dirty" || value.status === "dirty") {
            status.dirty();
          }
          finalMap.set(key.value, value.value);
        }
        return { status: status.value, value: finalMap };
      });
    } else {
      const finalMap = /* @__PURE__ */ new Map();
      for (const pair of pairs) {
        const key = pair.key;
        const value = pair.value;
        if (key.status === "aborted" || value.status === "aborted") {
          return INVALID;
        }
        if (key.status === "dirty" || value.status === "dirty") {
          status.dirty();
        }
        finalMap.set(key.value, value.value);
      }
      return { status: status.value, value: finalMap };
    }
  }
};
ZodMap.create = (keyType, valueType, params) => {
  return new ZodMap({
    valueType,
    keyType,
    typeName: ZodFirstPartyTypeKind.ZodMap,
    ...processCreateParams(params)
  });
};
var ZodSet = class _ZodSet extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.set) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.set,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const def = this._def;
    if (def.minSize !== null) {
      if (ctx.data.size < def.minSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.minSize.message
        });
        status.dirty();
      }
    }
    if (def.maxSize !== null) {
      if (ctx.data.size > def.maxSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.maxSize.message
        });
        status.dirty();
      }
    }
    const valueType = this._def.valueType;
    function finalizeSet(elements2) {
      const parsedSet = /* @__PURE__ */ new Set();
      for (const element of elements2) {
        if (element.status === "aborted")
          return INVALID;
        if (element.status === "dirty")
          status.dirty();
        parsedSet.add(element.value);
      }
      return { status: status.value, value: parsedSet };
    }
    const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
    if (ctx.common.async) {
      return Promise.all(elements).then((elements2) => finalizeSet(elements2));
    } else {
      return finalizeSet(elements);
    }
  }
  min(minSize, message2) {
    return new _ZodSet({
      ...this._def,
      minSize: { value: minSize, message: errorUtil.toString(message2) }
    });
  }
  max(maxSize, message2) {
    return new _ZodSet({
      ...this._def,
      maxSize: { value: maxSize, message: errorUtil.toString(message2) }
    });
  }
  size(size, message2) {
    return this.min(size, message2).max(size, message2);
  }
  nonempty(message2) {
    return this.min(1, message2);
  }
};
ZodSet.create = (valueType, params) => {
  return new ZodSet({
    valueType,
    minSize: null,
    maxSize: null,
    typeName: ZodFirstPartyTypeKind.ZodSet,
    ...processCreateParams(params)
  });
};
var ZodFunction = class _ZodFunction extends ZodType {
  constructor() {
    super(...arguments);
    this.validate = this.implement;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.function) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.function,
        received: ctx.parsedType
      });
      return INVALID;
    }
    function makeArgsIssue(args, error) {
      return makeIssue({
        data: args,
        path: ctx.path,
        errorMaps: [
          ctx.common.contextualErrorMap,
          ctx.schemaErrorMap,
          getErrorMap(),
          errorMap
        ].filter((x2) => !!x2),
        issueData: {
          code: ZodIssueCode.invalid_arguments,
          argumentsError: error
        }
      });
    }
    function makeReturnsIssue(returns, error) {
      return makeIssue({
        data: returns,
        path: ctx.path,
        errorMaps: [
          ctx.common.contextualErrorMap,
          ctx.schemaErrorMap,
          getErrorMap(),
          errorMap
        ].filter((x2) => !!x2),
        issueData: {
          code: ZodIssueCode.invalid_return_type,
          returnTypeError: error
        }
      });
    }
    const params = { errorMap: ctx.common.contextualErrorMap };
    const fn = ctx.data;
    if (this._def.returns instanceof ZodPromise) {
      const me2 = this;
      return OK(async function(...args) {
        const error = new ZodError([]);
        const parsedArgs = await me2._def.args.parseAsync(args, params).catch((e) => {
          error.addIssue(makeArgsIssue(args, e));
          throw error;
        });
        const result2 = await Reflect.apply(fn, this, parsedArgs);
        const parsedReturns = await me2._def.returns._def.type.parseAsync(result2, params).catch((e) => {
          error.addIssue(makeReturnsIssue(result2, e));
          throw error;
        });
        return parsedReturns;
      });
    } else {
      const me2 = this;
      return OK(function(...args) {
        const parsedArgs = me2._def.args.safeParse(args, params);
        if (!parsedArgs.success) {
          throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
        }
        const result2 = Reflect.apply(fn, this, parsedArgs.data);
        const parsedReturns = me2._def.returns.safeParse(result2, params);
        if (!parsedReturns.success) {
          throw new ZodError([makeReturnsIssue(result2, parsedReturns.error)]);
        }
        return parsedReturns.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...items) {
    return new _ZodFunction({
      ...this._def,
      args: ZodTuple.create(items).rest(ZodUnknown.create())
    });
  }
  returns(returnType) {
    return new _ZodFunction({
      ...this._def,
      returns: returnType
    });
  }
  implement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  strictImplement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  static create(args, returns, params) {
    return new _ZodFunction({
      args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
      returns: returns || ZodUnknown.create(),
      typeName: ZodFirstPartyTypeKind.ZodFunction,
      ...processCreateParams(params)
    });
  }
};
var ZodLazy = class extends ZodType {
  get schema() {
    return this._def.getter();
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const lazySchema = this._def.getter();
    return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
  }
};
ZodLazy.create = (getter, params) => {
  return new ZodLazy({
    getter,
    typeName: ZodFirstPartyTypeKind.ZodLazy,
    ...processCreateParams(params)
  });
};
var ZodLiteral = class extends ZodType {
  _parse(input) {
    if (input.data !== this._def.value) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_literal,
        expected: this._def.value
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
  get value() {
    return this._def.value;
  }
};
ZodLiteral.create = (value, params) => {
  return new ZodLiteral({
    value,
    typeName: ZodFirstPartyTypeKind.ZodLiteral,
    ...processCreateParams(params)
  });
};
function createZodEnum(values, params) {
  return new ZodEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodEnum,
    ...processCreateParams(params)
  });
}
var ZodEnum = class _ZodEnum extends ZodType {
  _parse(input) {
    if (typeof input.data !== "string") {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (this._def.values.indexOf(input.data) === -1) {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Values() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  extract(values) {
    return _ZodEnum.create(values);
  }
  exclude(values) {
    return _ZodEnum.create(this.options.filter((opt) => !values.includes(opt)));
  }
};
ZodEnum.create = createZodEnum;
var ZodNativeEnum = class extends ZodType {
  _parse(input) {
    const nativeEnumValues = util.getValidEnumValues(this._def.values);
    const ctx = this._getOrReturnCtx(input);
    if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (nativeEnumValues.indexOf(input.data) === -1) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get enum() {
    return this._def.values;
  }
};
ZodNativeEnum.create = (values, params) => {
  return new ZodNativeEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
    ...processCreateParams(params)
  });
};
var ZodPromise = class extends ZodType {
  unwrap() {
    return this._def.type;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.promise,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
    return OK(promisified.then((data) => {
      return this._def.type.parseAsync(data, {
        path: ctx.path,
        errorMap: ctx.common.contextualErrorMap
      });
    }));
  }
};
ZodPromise.create = (schema, params) => {
  return new ZodPromise({
    type: schema,
    typeName: ZodFirstPartyTypeKind.ZodPromise,
    ...processCreateParams(params)
  });
};
var ZodEffects = class extends ZodType {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const effect = this._def.effect || null;
    const checkCtx = {
      addIssue: (arg) => {
        addIssueToContext(ctx, arg);
        if (arg.fatal) {
          status.abort();
        } else {
          status.dirty();
        }
      },
      get path() {
        return ctx.path;
      }
    };
    checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
    if (effect.type === "preprocess") {
      const processed = effect.transform(ctx.data, checkCtx);
      if (ctx.common.issues.length) {
        return {
          status: "dirty",
          value: ctx.data
        };
      }
      if (ctx.common.async) {
        return Promise.resolve(processed).then((processed2) => {
          return this._def.schema._parseAsync({
            data: processed2,
            path: ctx.path,
            parent: ctx
          });
        });
      } else {
        return this._def.schema._parseSync({
          data: processed,
          path: ctx.path,
          parent: ctx
        });
      }
    }
    if (effect.type === "refinement") {
      const executeRefinement = (acc) => {
        const result2 = effect.refinement(acc, checkCtx);
        if (ctx.common.async) {
          return Promise.resolve(result2);
        }
        if (result2 instanceof Promise) {
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        }
        return acc;
      };
      if (ctx.common.async === false) {
        const inner = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inner.status === "aborted")
          return INVALID;
        if (inner.status === "dirty")
          status.dirty();
        executeRefinement(inner.value);
        return { status: status.value, value: inner.value };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
          if (inner.status === "aborted")
            return INVALID;
          if (inner.status === "dirty")
            status.dirty();
          return executeRefinement(inner.value).then(() => {
            return { status: status.value, value: inner.value };
          });
        });
      }
    }
    if (effect.type === "transform") {
      if (ctx.common.async === false) {
        const base = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (!isValid(base))
          return base;
        const result2 = effect.transform(base.value, checkCtx);
        if (result2 instanceof Promise) {
          throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
        }
        return { status: status.value, value: result2 };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
          if (!isValid(base))
            return base;
          return Promise.resolve(effect.transform(base.value, checkCtx)).then((result2) => ({ status: status.value, value: result2 }));
        });
      }
    }
    util.assertNever(effect);
  }
};
ZodEffects.create = (schema, effect, params) => {
  return new ZodEffects({
    schema,
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    effect,
    ...processCreateParams(params)
  });
};
ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
  return new ZodEffects({
    schema,
    effect: { type: "preprocess", transform: preprocess },
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    ...processCreateParams(params)
  });
};
var ZodOptional = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.undefined) {
      return OK(void 0);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodOptional.create = (type3, params) => {
  return new ZodOptional({
    innerType: type3,
    typeName: ZodFirstPartyTypeKind.ZodOptional,
    ...processCreateParams(params)
  });
};
var ZodNullable = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.null) {
      return OK(null);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodNullable.create = (type3, params) => {
  return new ZodNullable({
    innerType: type3,
    typeName: ZodFirstPartyTypeKind.ZodNullable,
    ...processCreateParams(params)
  });
};
var ZodDefault = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    let data = ctx.data;
    if (ctx.parsedType === ZodParsedType.undefined) {
      data = this._def.defaultValue();
    }
    return this._def.innerType._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
};
ZodDefault.create = (type3, params) => {
  return new ZodDefault({
    innerType: type3,
    typeName: ZodFirstPartyTypeKind.ZodDefault,
    defaultValue: typeof params.default === "function" ? params.default : () => params.default,
    ...processCreateParams(params)
  });
};
var ZodCatch = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const newCtx = {
      ...ctx,
      common: {
        ...ctx.common,
        issues: []
      }
    };
    const result2 = this._def.innerType._parse({
      data: newCtx.data,
      path: newCtx.path,
      parent: {
        ...newCtx
      }
    });
    if (isAsync(result2)) {
      return result2.then((result3) => {
        return {
          status: "valid",
          value: result3.status === "valid" ? result3.value : this._def.catchValue({
            get error() {
              return new ZodError(newCtx.common.issues);
            },
            input: newCtx.data
          })
        };
      });
    } else {
      return {
        status: "valid",
        value: result2.status === "valid" ? result2.value : this._def.catchValue({
          get error() {
            return new ZodError(newCtx.common.issues);
          },
          input: newCtx.data
        })
      };
    }
  }
  removeCatch() {
    return this._def.innerType;
  }
};
ZodCatch.create = (type3, params) => {
  return new ZodCatch({
    innerType: type3,
    typeName: ZodFirstPartyTypeKind.ZodCatch,
    catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
    ...processCreateParams(params)
  });
};
var ZodNaN = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.nan) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.nan,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
};
ZodNaN.create = (params) => {
  return new ZodNaN({
    typeName: ZodFirstPartyTypeKind.ZodNaN,
    ...processCreateParams(params)
  });
};
var BRAND = Symbol("zod_brand");
var ZodBranded = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const data = ctx.data;
    return this._def.type._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  unwrap() {
    return this._def.type;
  }
};
var ZodPipeline = class _ZodPipeline extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.common.async) {
      const handleAsync = async () => {
        const inResult = await this._def.in._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inResult.status === "aborted")
          return INVALID;
        if (inResult.status === "dirty") {
          status.dirty();
          return DIRTY(inResult.value);
        } else {
          return this._def.out._parseAsync({
            data: inResult.value,
            path: ctx.path,
            parent: ctx
          });
        }
      };
      return handleAsync();
    } else {
      const inResult = this._def.in._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
      if (inResult.status === "aborted")
        return INVALID;
      if (inResult.status === "dirty") {
        status.dirty();
        return {
          status: "dirty",
          value: inResult.value
        };
      } else {
        return this._def.out._parseSync({
          data: inResult.value,
          path: ctx.path,
          parent: ctx
        });
      }
    }
  }
  static create(a, b2) {
    return new _ZodPipeline({
      in: a,
      out: b2,
      typeName: ZodFirstPartyTypeKind.ZodPipeline
    });
  }
};
var ZodReadonly = class extends ZodType {
  _parse(input) {
    const result2 = this._def.innerType._parse(input);
    if (isValid(result2)) {
      result2.value = Object.freeze(result2.value);
    }
    return result2;
  }
};
ZodReadonly.create = (type3, params) => {
  return new ZodReadonly({
    innerType: type3,
    typeName: ZodFirstPartyTypeKind.ZodReadonly,
    ...processCreateParams(params)
  });
};
var custom = (check, params = {}, fatal) => {
  if (check)
    return ZodAny.create().superRefine((data, ctx) => {
      var _a, _b;
      if (!check(data)) {
        const p = typeof params === "function" ? params(data) : typeof params === "string" ? { message: params } : params;
        const _fatal = (_b = (_a = p.fatal) !== null && _a !== void 0 ? _a : fatal) !== null && _b !== void 0 ? _b : true;
        const p2 = typeof p === "string" ? { message: p } : p;
        ctx.addIssue({ code: "custom", ...p2, fatal: _fatal });
      }
    });
  return ZodAny.create();
};
var late = {
  object: ZodObject.lazycreate
};
var ZodFirstPartyTypeKind;
(function(ZodFirstPartyTypeKind2) {
  ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
  ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
  ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
  ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
  ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
  ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
  ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
  ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
  ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
  ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
  ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
  ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
  ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
  ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
  ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
  ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
  ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
  ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
  ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
  ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
  ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
  ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
  ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
  ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
  ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
  ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
  ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
  ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
  ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
  ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
  ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
  ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
  ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
  ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
  ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
  ZodFirstPartyTypeKind2["ZodReadonly"] = "ZodReadonly";
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
var instanceOfType = (cls, params = {
  message: `Input not instance of ${cls.name}`
}) => custom((data) => data instanceof cls, params);
var stringType = ZodString.create;
var numberType = ZodNumber.create;
var nanType = ZodNaN.create;
var bigIntType = ZodBigInt.create;
var booleanType = ZodBoolean.create;
var dateType = ZodDate.create;
var symbolType = ZodSymbol.create;
var undefinedType = ZodUndefined.create;
var nullType = ZodNull.create;
var anyType = ZodAny.create;
var unknownType = ZodUnknown.create;
var neverType = ZodNever.create;
var voidType = ZodVoid.create;
var arrayType = ZodArray.create;
var objectType = ZodObject.create;
var strictObjectType = ZodObject.strictCreate;
var unionType = ZodUnion.create;
var discriminatedUnionType = ZodDiscriminatedUnion.create;
var intersectionType = ZodIntersection.create;
var tupleType = ZodTuple.create;
var recordType = ZodRecord.create;
var mapType = ZodMap.create;
var setType = ZodSet.create;
var functionType = ZodFunction.create;
var lazyType = ZodLazy.create;
var literalType = ZodLiteral.create;
var enumType = ZodEnum.create;
var nativeEnumType = ZodNativeEnum.create;
var promiseType = ZodPromise.create;
var effectsType = ZodEffects.create;
var optionalType = ZodOptional.create;
var nullableType = ZodNullable.create;
var preprocessType = ZodEffects.createWithPreprocess;
var pipelineType = ZodPipeline.create;
var ostring = () => stringType().optional();
var onumber = () => numberType().optional();
var oboolean = () => booleanType().optional();
var coerce = {
  string: (arg) => ZodString.create({ ...arg, coerce: true }),
  number: (arg) => ZodNumber.create({ ...arg, coerce: true }),
  boolean: (arg) => ZodBoolean.create({
    ...arg,
    coerce: true
  }),
  bigint: (arg) => ZodBigInt.create({ ...arg, coerce: true }),
  date: (arg) => ZodDate.create({ ...arg, coerce: true })
};
var NEVER = INVALID;
var z = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  defaultErrorMap: errorMap,
  setErrorMap,
  getErrorMap,
  makeIssue,
  EMPTY_PATH,
  addIssueToContext,
  ParseStatus,
  INVALID,
  DIRTY,
  OK,
  isAborted,
  isDirty,
  isValid,
  isAsync,
  get util() {
    return util;
  },
  get objectUtil() {
    return objectUtil;
  },
  ZodParsedType,
  getParsedType,
  ZodType,
  ZodString,
  ZodNumber,
  ZodBigInt,
  ZodBoolean,
  ZodDate,
  ZodSymbol,
  ZodUndefined,
  ZodNull,
  ZodAny,
  ZodUnknown,
  ZodNever,
  ZodVoid,
  ZodArray,
  ZodObject,
  ZodUnion,
  ZodDiscriminatedUnion,
  ZodIntersection,
  ZodTuple,
  ZodRecord,
  ZodMap,
  ZodSet,
  ZodFunction,
  ZodLazy,
  ZodLiteral,
  ZodEnum,
  ZodNativeEnum,
  ZodPromise,
  ZodEffects,
  ZodTransformer: ZodEffects,
  ZodOptional,
  ZodNullable,
  ZodDefault,
  ZodCatch,
  ZodNaN,
  BRAND,
  ZodBranded,
  ZodPipeline,
  ZodReadonly,
  custom,
  Schema: ZodType,
  ZodSchema: ZodType,
  late,
  get ZodFirstPartyTypeKind() {
    return ZodFirstPartyTypeKind;
  },
  coerce,
  any: anyType,
  array: arrayType,
  bigint: bigIntType,
  boolean: booleanType,
  date: dateType,
  discriminatedUnion: discriminatedUnionType,
  effect: effectsType,
  "enum": enumType,
  "function": functionType,
  "instanceof": instanceOfType,
  intersection: intersectionType,
  lazy: lazyType,
  literal: literalType,
  map: mapType,
  nan: nanType,
  nativeEnum: nativeEnumType,
  never: neverType,
  "null": nullType,
  nullable: nullableType,
  number: numberType,
  object: objectType,
  oboolean,
  onumber,
  optional: optionalType,
  ostring,
  pipeline: pipelineType,
  preprocess: preprocessType,
  promise: promiseType,
  record: recordType,
  set: setType,
  strictObject: strictObjectType,
  string: stringType,
  symbol: symbolType,
  transformer: effectsType,
  tuple: tupleType,
  "undefined": undefinedType,
  union: unionType,
  unknown: unknownType,
  "void": voidType,
  NEVER,
  ZodIssueCode,
  quotelessJson,
  ZodError
});

// src/client/gateway.js
function loadTransactionMetaWith({ fetch: fetch2, GRAPHQL_URL: GRAPHQL_URL2, logger }) {
  const GET_TRANSACTIONS_QUERY = `
    query GetTransactions ($transactionIds: [ID!]!) {
      transactions(ids: $transactionIds) {
        edges {
          node {
            owner {
              address
            }
            tags {
              name
              value
            }
            block {
              id
              height
              timestamp
            }
          }
        }
      }
    }`;
  const transactionConnectionSchema = z.object({
    data: z.object({
      transactions: z.object({
        edges: z.array(z.object({
          node: z.record(z.any())
        }))
      })
    })
  });
  return (id) => of(id).chain(fromPromise(
    (id2) => fetch2(GRAPHQL_URL2, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: GET_TRANSACTIONS_QUERY,
        variables: { transactionIds: [id2] }
      })
    }).then(async (res) => {
      if (res.ok)
        return res.json();
      logger('Error Encountered when querying gateway for transaction "%s"', id2);
      throw new Error(`${res.status}: ${await res.text()}`);
    }).then(transactionConnectionSchema.parse).then(path_default(["data", "transactions", "edges", "0", "node"]))
  )).toPromise();
}

// src/logger.js
var import_debug = __toESM(require_browser(), 1);
var createLogger = (name = "@permaweb/aoconnect") => {
  const logger = (0, import_debug.default)(name);
  logger.child = (name2) => createLogger(`${logger.namespace}:${name2}`);
  logger.tap = (note, ...rest) => tap_default((...args) => logger(note, ...rest, ...args));
  return logger;
};

// src/lib/utils.js
var joinUrl = ({ url, path: path3 }) => {
  if (!path3)
    return url;
  if (path3.startsWith("/"))
    return joinUrl({ url, path: path3.slice(1) });
  url = new URL(url);
  url.pathname += path3;
  return url.toString();
};
function parseTags(rawTags) {
  return pipe(
    defaultTo_default([]),
    reduce_default(
      (map3, tag) => pipe(
        // [value, value, ...] || []
        propOr_default([], tag.name),
        // [value]
        append_default(tag.value),
        // { [name]: [value, value, ...] }
        assoc_default(tag.name, __default, map3)
      )(map3),
      {}
    ),
    /**
    * If the field is only a singly list, then extract the one value.
    *
    * Otherwise, keep the value as a list.
    */
    map_default((values) => values.length > 1 ? values : values[0])
  )(rawTags);
}
function removeTagsByNameMaybeValue(name, value) {
  return (tags) => reject_default(
    allPass_default([
      propEq_default(name, "name"),
      ifElse_default(
        always_default(value),
        propEq_default(value, "value"),
        T_default
      )
    ]),
    tags
  );
}
function eqOrIncludes(val) {
  return cond_default([
    [is_default(String), equals_default(val)],
    [is_default(Array), includes_default(val)],
    [T_default, F_default]
  ]);
}
function errFrom(err) {
  let e;
  if (is_default(ZodError, err)) {
    e = new Error(mapZodErr(err));
    e.stack += err.stack;
  } else if (is_default(Error, err)) {
    e = err;
  } else if (has_default("message", err)) {
    e = new Error(err.message);
  } else if (is_default(String, err)) {
    e = new Error(err);
  } else {
    e = new Error("An error occurred");
  }
  return e;
}
function mapZodErr(zodErr) {
  return pipe(
    (zodErr2) => (
      /**
       * Take a ZodError and flatten it's issues into a single depth array
       */
      function gatherZodIssues(zodErr3, status, contextCode) {
        return reduce_default(
          (issues, issue) => pipe(
            cond_default([
              /**
               * These issue codes indicate nested ZodErrors, so we resursively gather those
               * See https://github.com/colinhacks/zod/blob/HEAD/ERROR_HANDLING.md#zodissuecode
               */
              [
                equals_default(ZodIssueCode.invalid_arguments),
                () => gatherZodIssues(issue.argumentsError, 422, "Invalid Arguments")
              ],
              [
                equals_default(ZodIssueCode.invalid_return_type),
                () => gatherZodIssues(issue.returnTypeError, 500, "Invalid Return")
              ],
              [
                equals_default(ZodIssueCode.invalid_union),
                // An array of ZodErrors, so map over and flatten them all
                () => chain_default((i) => gatherZodIssues(i, 400, "Invalid Union"), issue.unionErrors)
              ],
              [T_default, () => [{ ...issue, status, contextCode }]]
            ]),
            concat_default(issues)
          )(issue.code),
          [],
          zodErr3.issues
        );
      }(zodErr2, 400, "")
    ),
    /**
     * combine all zod issues into a list of { message, status }
     * summaries of each issue
     */
    (zodIssues) => reduce_default(
      (acc, zodIssue) => {
        const { message: message2, path: _path, contextCode: _contextCode } = zodIssue;
        const path3 = _path[1] || _path[0];
        const contextCode = _contextCode ? `${_contextCode} ` : "";
        acc.push(`${contextCode}'${path3}': ${message2}.`);
        return acc;
      },
      [],
      zodIssues
    ),
    join_default(" | ")
  )(zodErr);
}

// src/lib/result/verify-input.js
var inputSchema = z.object({
  id: z.string().min(1, { message: "message is required to be a message id" }),
  processId: z.string().min(1, { message: "process is required to be a process id" })
});
function verifyInputWith() {
  return (ctx) => {
    return of(ctx).map(inputSchema.parse).map(() => ctx);
  };
}

// src/dal.js
var tagSchema = z.object({
  name: z.string(),
  value: z.string()
});
var dryrunResultSchema = z.function().args(z.object({
  Id: z.string(),
  Target: z.string(),
  Owner: z.string(),
  Anchor: z.string().optional(),
  Data: z.any().default("1234"),
  Tags: z.array(z.object({ name: z.string(), value: z.string() }))
})).returns(z.promise(z.any()));
var loadResultSchema = z.function().args(z.object({
  id: z.string().min(1, { message: "message id is required" }),
  processId: z.string().min(1, { message: "process id is required" })
})).returns(z.promise(z.any()));
var queryResultsSchema = z.function().args(z.object({
  process: z.string().min(1, { message: "process id is required" }),
  from: z.string().optional(),
  to: z.string().optional(),
  sort: z.enum(["ASC", "DESC"]).default("ASC"),
  limit: z.number().optional()
})).returns(z.promise(z.object({
  edges: z.array(z.object({
    cursor: z.string(),
    node: z.object({
      Output: z.any().optional(),
      Messages: z.array(z.any()).optional(),
      Spawns: z.array(z.any()).optional(),
      Error: z.any().optional()
    })
  }))
})));
var deployMessageSchema = z.function().args(z.object({
  processId: z.string(),
  data: z.any(),
  tags: z.array(tagSchema),
  anchor: z.string().optional(),
  signer: z.any()
})).returns(z.promise(
  z.object({
    messageId: z.string()
  }).passthrough()
));
var deployProcessSchema = z.function().args(z.object({
  data: z.any(),
  tags: z.array(tagSchema),
  signer: z.any()
})).returns(z.promise(
  z.object({
    processId: z.string()
  }).passthrough()
));
var deployAssignSchema = z.function().args(z.object({
  process: z.string(),
  message: z.string(),
  baseLayer: z.boolean().optional(),
  exclude: z.array(z.string()).optional()
})).returns(z.promise(
  z.object({
    assignmentId: z.string()
  }).passthrough()
));
var deployMonitorSchema = deployMessageSchema;
var loadProcessMetaSchema = z.function().args(z.object({
  suUrl: z.string().url(),
  processId: z.string()
})).returns(z.promise(
  z.object({
    tags: z.array(tagSchema)
  }).passthrough()
));
var locateSchedulerSchema = z.function().args(z.string()).returns(z.promise(
  z.object({
    url: z.string()
  })
));
var validateSchedulerSchema = z.function().args(z.string()).returns(z.promise(z.boolean()));
var loadTransactionMetaSchema = z.function().args(z.string()).returns(z.promise(
  z.object({
    tags: z.array(tagSchema)
  }).passthrough()
));
var signerSchema = z.function().args(z.object({
  data: z.any(),
  tags: z.array(tagSchema),
  /**
   * target must be set with writeMessage,
   * but not for createProcess
   */
  target: z.string().optional(),
  anchor: z.string().optional()
})).returns(z.promise(
  z.object({
    id: z.string(),
    raw: z.any()
  })
));

// src/lib/result/read.js
function readWith({ loadResult }) {
  loadResult = fromPromise(loadResultSchema.implement(loadResult));
  return (ctx) => {
    return of({ id: ctx.id, processId: ctx.processId }).chain(loadResult);
  };
}

// src/lib/result/index.js
function resultWith(env) {
  const verifyInput = verifyInputWith(env);
  const read = readWith(env);
  return ({ message: message2, process: process2 }) => {
    return of({ id: message2, processId: process2 }).chain(verifyInput).chain(read).map(
      env.logger.tap(
        'readResult result for message "%s": %O',
        message2
      )
    ).map((result2) => result2).bimap(errFrom, identity_default).toPromise();
  };
}

// src/lib/message/upload-message.js
var tagSchema2 = z.array(z.object({
  name: z.string(),
  value: z.string()
}));
function buildTagsWith() {
  return (ctx) => {
    return of(ctx.tags).map(defaultTo_default([])).map(removeTagsByNameMaybeValue("Data-Protocol", "ao")).map(removeTagsByNameMaybeValue("Variant")).map(removeTagsByNameMaybeValue("Type")).map(removeTagsByNameMaybeValue("SDK")).map(concat_default(__default, [
      { name: "Data-Protocol", value: "ao" },
      { name: "Variant", value: "ao.TN.1" },
      { name: "Type", value: "Message" },
      { name: "SDK", value: "aoconnect" }
    ])).map(tagSchema2.parse).map(assoc_default("tags", __default, ctx));
  };
}
function buildDataWith({ logger }) {
  return (ctx) => {
    return of(ctx).chain(ifElse_default(
      always_default(ctx.data),
      /**
       * data is provided as input, so do nothing
       */
      () => Resolved(ctx),
      /**
       * Just generate a random value for data
       */
      () => Resolved(Math.random().toString().slice(-4)).map(assoc_default("data", __default, ctx)).map(
        (ctx2) => pipe(
          prop_default("tags"),
          removeTagsByNameMaybeValue("Content-Type"),
          append_default({ name: "Content-Type", value: "text/plain" }),
          assoc_default("tags", __default, ctx2)
        )(ctx2)
      ).map(logger.tap('added pseudo-random string as message "data"'))
    ));
  };
}
function uploadMessageWith(env) {
  const buildTags = buildTagsWith(env);
  const buildData = buildDataWith(env);
  const deployMessage = deployMessageSchema.implement(env.deployMessage);
  return (ctx) => {
    return of(ctx).chain(buildTags).chain(buildData).chain(fromPromise(
      ({ id, data, tags, anchor, signer }) => deployMessage({ processId: id, data, tags, anchor, signer: signerSchema.implement(signer) })
    )).map((res) => assoc_default("messageId", res.messageId, ctx));
  };
}

// src/lib/message/index.js
function messageWith(env) {
  const uploadMessage = uploadMessageWith(env);
  return ({ process: process2, data, tags, anchor, signer }) => {
    return of({ id: process2, data, tags, anchor, signer }).chain(uploadMessage).map((ctx) => ctx.messageId).bimap(errFrom, identity_default).toPromise();
  };
}

// src/lib/spawn/verify-inputs.js
var checkTag = (name, pred, err) => (tags) => pred(tags[name]) ? Resolved(tags) : Rejected(`Tag '${name}': ${err}`);
function verifyModuleWith({ loadTransactionMeta, logger }) {
  loadTransactionMeta = fromPromise(loadTransactionMetaSchema.implement(loadTransactionMeta));
  return (module) => of(module).chain(loadTransactionMeta).map(prop_default("tags")).map(parseTags).chain(checkTag("Data-Protocol", eqOrIncludes("ao"), "value 'ao' was not found on module")).chain(checkTag("Type", eqOrIncludes("Module"), "value 'Module' was not found on module")).chain(checkTag("Module-Format", isNotNil_default, "was not found on module")).chain(checkTag("Input-Encoding", isNotNil_default, "was not found on module")).chain(checkTag("Output-Encoding", isNotNil_default, "was not found on module")).bimap(
    logger.tap("Verifying module source failed: %s"),
    logger.tap("Verified module source")
  );
}
function verifySchedulerWith({ logger, validateScheduler }) {
  validateScheduler = fromPromise(validateSchedulerSchema.implement(validateScheduler));
  return (scheduler) => of(scheduler).chain(
    (scheduler2) => validateScheduler(scheduler2).chain((isValid2) => isValid2 ? Resolved(scheduler2) : Rejected(`Valid Scheduler-Location owned by ${scheduler2} not found`))
  ).bimap(
    logger.tap("Verifying scheduler failed: %s"),
    logger.tap("Verified scheduler")
  );
}
function verifySignerWith({ logger }) {
  return (signer) => of(signer).map(logger.tap("Checking for signer")).chain((signer2) => signer2 ? Resolved(signer2) : Rejected("signer not found"));
}
function verifyInputsWith(env) {
  const logger = env.logger.child("verifyInput");
  env = { ...env, logger };
  const verifyModule = verifyModuleWith(env);
  const verifyScheduler = verifySchedulerWith(env);
  const verifySigner = verifySignerWith(env);
  return (ctx) => {
    return of(ctx).chain((ctx2) => verifyModule(ctx2.module).map(() => ctx2)).chain((ctx2) => verifyScheduler(ctx2.scheduler)).map(() => ctx).chain((ctx2) => verifySigner(ctx2.signer).map(() => ctx2)).bimap(
      logger.tap("Error when verify input: %s"),
      logger.tap("Successfully verified inputs")
    );
  };
}

// src/lib/spawn/upload-process.js
var tagSchema3 = z.array(z.object({
  name: z.string(),
  value: z.string()
}));
function buildTagsWith2() {
  return (ctx) => {
    return of(ctx).map(prop_default("tags")).map(defaultTo_default([])).map(removeTagsByNameMaybeValue("Data-Protocol", "ao")).map(removeTagsByNameMaybeValue("Variant")).map(removeTagsByNameMaybeValue("Type")).map(removeTagsByNameMaybeValue("Module")).map(removeTagsByNameMaybeValue("Scheduler")).map(removeTagsByNameMaybeValue("SDK")).map(concat_default(__default, [
      { name: "Data-Protocol", value: "ao" },
      { name: "Variant", value: "ao.TN.1" },
      { name: "Type", value: "Process" },
      { name: "Module", value: ctx.module },
      { name: "Scheduler", value: ctx.scheduler },
      { name: "SDK", value: "aoconnect" }
    ])).map(tagSchema3.parse).map(assoc_default("tags", __default, ctx));
  };
}
function buildDataWith2({ logger }) {
  return (ctx) => {
    return of(ctx).chain(ifElse_default(
      always_default(ctx.data),
      /**
       * data is provided as input, so do nothing
       */
      () => Resolved(ctx),
      /**
       * Just generate a random value for data
       */
      () => Resolved(Math.random().toString().slice(-4)).map(assoc_default("data", __default, ctx)).map(
        (ctx2) => pipe(
          prop_default("tags"),
          removeTagsByNameMaybeValue("Content-Type"),
          append_default({ name: "Content-Type", value: "text/plain" }),
          assoc_default("tags", __default, ctx2)
        )(ctx2)
      ).map(logger.tap('added pseudo-random string as process "data"'))
    ));
  };
}
function uploadProcessWith(env) {
  const logger = env.logger.child("uploadProcess");
  env = { ...env, logger };
  const buildTags = buildTagsWith2(env);
  const buildData = buildDataWith2(env);
  const deployProcess = deployProcessSchema.implement(env.deployProcess);
  return (ctx) => {
    return of(ctx).chain(buildTags).chain(buildData).chain(fromPromise(
      ({ data, tags, signer }) => deployProcess({ data, tags, signer: signerSchema.implement(signer) })
    )).map((res) => assoc_default("processId", res.processId, ctx));
  };
}

// src/lib/spawn/index.js
function spawnWith(env) {
  const verifyInputs = verifyInputsWith(env);
  const uploadProcess = uploadProcessWith(env);
  return ({ module, scheduler, signer, tags, data }) => {
    return of({ module, scheduler, signer, tags, data }).chain(verifyInputs).chain(uploadProcess).map((ctx) => ctx.processId).bimap(errFrom, identity_default).toPromise();
  };
}

// src/lib/monitor/upload-monitor.js
function uploadMonitorWith(env) {
  const deployMonitor = deployMonitorSchema.implement(env.deployMonitor);
  return (ctx) => {
    return of(ctx).chain(fromPromise(
      ({ id, signer }) => deployMonitor({
        processId: id,
        signer: signerSchema.implement(signer),
        /**
         * No tags or data can be provided right now,
         *
         * so just randomize data and set tags to an empty array
         */
        data: Math.random().toString().slice(-4),
        tags: []
      })
    )).map((res) => assoc_default("monitorId", res.messageId, ctx));
  };
}

// src/lib/monitor/index.js
function monitorWith(env) {
  const uploadMonitor = uploadMonitorWith(env);
  return ({ process: process2, signer }) => of({ id: process2, signer }).chain(uploadMonitor).map((ctx) => ctx.monitorId).bimap(errFrom, identity_default).toPromise();
}

// src/lib/unmonitor/upload-unmonitor.js
function uploadUnmonitorWith(env) {
  const deployUnmonitor = deployMonitorSchema.implement(env.deployUnmonitor);
  return (ctx) => {
    return of(ctx).chain(fromPromise(
      ({ id, signer }) => deployUnmonitor({
        processId: id,
        signer: signerSchema.implement(signer),
        /**
         * No tags or data can be provided right now,
         *
         * so just randomize data and set tags to an empty array
         */
        data: Math.random().toString().slice(-4),
        tags: []
      })
    )).map((res) => assoc_default("monitorId", res.messageId, ctx));
  };
}

// src/lib/unmonitor/index.js
function unmonitorWith(env) {
  const uploadUnmonitor = uploadUnmonitorWith(env);
  return ({ process: process2, signer }) => of({ id: process2, signer }).chain(uploadUnmonitor).map((ctx) => ctx.monitorId).bimap(errFrom, identity_default).toPromise();
}

// src/lib/results/verify-input.js
var inputSchema2 = z.object({
  process: z.string().min(1, { message: "process identifier is required" }),
  from: z.string().optional(),
  to: z.string().optional(),
  sort: z.enum(["ASC", "DESC"]).default("ASC"),
  limit: z.number().optional()
});
function verifyInputWith2() {
  return (ctx) => {
    return of(ctx).map(inputSchema2.parse).map(() => ctx);
  };
}

// src/lib/results/query.js
function queryWith({ queryResults }) {
  queryResults = fromPromise(queryResultsSchema.implement(queryResults));
  return (ctx) => {
    return of({ process: ctx.process, from: ctx.from, to: ctx.to, sort: ctx.sort, limit: ctx.limit }).chain(queryResults);
  };
}

// src/lib/results/index.js
function resultsWith(env) {
  const verifyInput = verifyInputWith2(env);
  const query = queryWith(env);
  return ({ process: process2, from, to, sort, limit }) => {
    return of({ process: process2, from, to, sort, limit }).chain(verifyInput).chain(query).map(
      env.logger.tap(
        'readResults result for message "%s": %O',
        process2
      )
    ).map((result2) => result2).bimap(errFrom, identity_default).toPromise();
  };
}

// src/lib/dryrun/verify-input.js
var inputSchema3 = z.object({
  Id: z.string(),
  Target: z.string(),
  Owner: z.string(),
  Anchor: z.string().optional(),
  Data: z.any().default("1234"),
  Tags: z.array(z.object({ name: z.string(), value: z.string() }))
});
function verifyInputWith3() {
  return (msg) => {
    return of(msg).map(inputSchema3.parse).map((m) => {
      m.Tags = m.Tags.concat([
        { name: "Data-Protocol", value: "ao" },
        { name: "Type", value: "Message" },
        { name: "Variant", value: "ao.TN.1" }
      ]);
      return m;
    });
  };
}

// src/lib/dryrun/run.js
function runWith({ dryrunFetch }) {
  return fromPromise(dryrunResultSchema.implement(dryrunFetch));
}

// src/lib/dryrun/index.js
function dryrunWith(env) {
  const verifyInput = verifyInputWith3(env);
  const dryrun2 = runWith(env);
  return (msg) => of(msg).map(convert).chain(verifyInput).chain(dryrun2).toPromise();
}
function convert({ process: process2, data, tags, anchor, ...rest }) {
  return {
    Id: "1234",
    Owner: "1234",
    ...rest,
    Target: process2,
    Data: data || "1234",
    Tags: tags || [],
    Anchor: anchor || "0"
  };
}

// src/lib/assign/send-assign.js
function sendAssignWith(env) {
  const deployAssign = deployAssignSchema.implement(env.deployAssign);
  return (ctx) => {
    return of(ctx).chain(fromPromise(
      ({ process: process2, message: message2, baseLayer, exclude }) => deployAssign({ process: process2, message: message2, baseLayer, exclude })
    )).map((res) => assoc_default("assignmentId", res.assignmentId, ctx));
  };
}

// src/lib/assign/index.js
function assignWith(env) {
  const sendAssign = sendAssignWith(env);
  return ({ process: process2, message: message2, baseLayer, exclude }) => {
    return of({ process: process2, message: message2, baseLayer, exclude }).chain(sendAssign).map((ctx) => ctx.assignmentId).bimap(errFrom, identity_default).toPromise();
  };
}

// src/index.common.js
var DEFAULT_GATEWAY_URL = "https://arweave.net";
var DEFAULT_MU_URL = "https://mu.ao-testnet.xyz";
var DEFAULT_CU_URL = "https://cu.ao-testnet.xyz";
function connect({
  GRAPHQL_URL: GRAPHQL_URL2,
  GATEWAY_URL: GATEWAY_URL2 = DEFAULT_GATEWAY_URL,
  MU_URL: MU_URL2 = DEFAULT_MU_URL,
  CU_URL: CU_URL2 = DEFAULT_CU_URL
} = {}) {
  const logger = createLogger();
  if (!GRAPHQL_URL2)
    GRAPHQL_URL2 = joinUrl({ url: GATEWAY_URL2, path: "/graphql" });
  const { validate } = ye({ cacheSize: 100, GRAPHQL_URL: GRAPHQL_URL2 });
  const processMetaCache2 = createProcessMetaCache({ MAX_SIZE: 25 });
  const resultLogger = logger.child("result");
  const result2 = resultWith({
    loadResult: loadResultWith({ fetch, CU_URL: CU_URL2, logger: resultLogger }),
    logger: resultLogger
  });
  const messageLogger = logger.child("message");
  const message2 = messageWith({
    loadProcessMeta: loadProcessMetaWith({
      fetch,
      cache: processMetaCache2,
      logger: messageLogger
    }),
    // locateScheduler: locate,
    deployMessage: deployMessageWith({ fetch, MU_URL: MU_URL2, logger: messageLogger }),
    logger: messageLogger
  });
  const spawnLogger = logger.child("spawn");
  const spawn2 = spawnWith({
    loadTransactionMeta: loadTransactionMetaWith({ fetch, GRAPHQL_URL: GRAPHQL_URL2, logger: spawnLogger }),
    validateScheduler: validate,
    deployProcess: deployProcessWith({ fetch, MU_URL: MU_URL2, logger: spawnLogger }),
    logger: spawnLogger
  });
  const monitorLogger = logger.child("monitor");
  const monitor2 = monitorWith({
    loadProcessMeta: loadProcessMetaWith({
      fetch,
      cache: processMetaCache2,
      logger: monitorLogger
    }),
    // locateScheduler: locate,
    deployMonitor: deployMonitorWith({ fetch, MU_URL: MU_URL2, logger: monitorLogger }),
    logger: monitorLogger
  });
  const unmonitorLogger = logger.child("unmonitor");
  const unmonitor2 = unmonitorWith({
    loadProcessMeta: loadProcessMetaWith({
      fetch,
      cache: processMetaCache2,
      logger: unmonitorLogger
    }),
    // locateScheduler: locate,
    deployUnmonitor: deployUnmonitorWith({ fetch, MU_URL: MU_URL2, logger: unmonitorLogger }),
    logger: monitorLogger
  });
  const resultsLogger = logger.child("results");
  const results2 = resultsWith({
    queryResults: queryResultsWith({ fetch, CU_URL: CU_URL2, logger: resultsLogger }),
    logger: resultsLogger
  });
  const dryrunLogger = logger.child("dryrun");
  const dryrun2 = dryrunWith({
    dryrunFetch: dryrunFetchWith({ fetch, CU_URL: CU_URL2, logger: dryrunLogger }),
    logger: dryrunLogger
  });
  const assignLogger = logger.child("assign");
  const assign2 = assignWith({
    deployAssign: deployAssignWith({
      fetch,
      MU_URL: MU_URL2,
      logger: assignLogger
    }),
    logger: messageLogger
  });
  return { result: result2, results: results2, message: message2, spawn: spawn2, monitor: monitor2, unmonitor: unmonitor2, dryrun: dryrun2, assign: assign2 };
}

// src/client/browser/wallet.js
var wallet_exports = {};
__export(wallet_exports, {
  createDataItemSigner: () => createDataItemSigner
});
var import_buffer = __toESM(require_buffer(), 1);

// node_modules/warp-arbundles/build/web/esm/bundle.js
var bundle_exports = {};
__export(bundle_exports, {
  AVSCTap: () => $2,
  ArweaveSigner: () => N2,
  DataItem: () => _,
  MAX_TAG_BYTES: () => tt2,
  MIN_BINARY_SIZE: () => gr,
  SIG_CONFIG: () => P2,
  SignatureConfig: () => B2,
  Signer: () => ot2,
  createData: () => ge2,
  default: () => wn,
  deserializeTags: () => Q2,
  indexToType: () => wt2,
  serializeTags: () => dt2,
  tagsExceedLimit: () => jr,
  warparbundles: () => dn
});
var xr = Object.create;
var it2 = Object.defineProperty;
var mr = Object.getOwnPropertyDescriptor;
var Br = Object.getOwnPropertyNames;
var Er = Object.getPrototypeOf;
var br = Object.prototype.hasOwnProperty;
var T3 = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
var Ar = (e, t) => {
  for (var r3 in t)
    it2(e, r3, { get: t[r3], enumerable: true });
};
var Tr = (e, t, r3, n) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let i of Br(t))
      !br.call(e, i) && i !== r3 && it2(e, i, { get: () => t[i], enumerable: !(n = mr(t, i)) || n.enumerable });
  return e;
};
var C2 = (e, t, r3) => (r3 = e != null ? xr(Er(e)) : {}, Tr(t || !e || !e.__esModule ? it2(r3, "default", { value: e, enumerable: true }) : r3, e));
var Rt2 = T3((st2) => {
  "use strict";
  Object.defineProperty(st2, "__esModule", { value: true });
  function Ir(e) {
    var t = 4, r3 = e.length, n = r3 % t;
    if (!n)
      return e;
    var i = r3, o = t - n, s = r3 + o, u2 = Buffer.alloc(s);
    for (u2.write(e); o--; )
      u2.write("=", i++);
    return u2.toString();
  }
  st2.default = Ir;
});
var Dt2 = T3((ht2) => {
  "use strict";
  Object.defineProperty(ht2, "__esModule", { value: true });
  var Sr = Rt2();
  function Ct2(e, t) {
    return t === void 0 && (t = "utf8"), Buffer.isBuffer(e) ? at2(e.toString("base64")) : at2(Buffer.from(e, t).toString("base64"));
  }
  function Ur(e, t) {
    return t === void 0 && (t = "utf8"), Buffer.from(ut2(e), "base64").toString(t);
  }
  function ut2(e) {
    return e = e.toString(), Sr.default(e).replace(/\-/g, "+").replace(/_/g, "/");
  }
  function at2(e) {
    return e.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  }
  function Fr(e) {
    return Buffer.from(ut2(e), "base64");
  }
  var O2 = Ct2;
  O2.encode = Ct2;
  O2.decode = Ur;
  O2.toBase64 = ut2;
  O2.fromBase64 = at2;
  O2.toBuffer = Fr;
  ht2.default = O2;
});
var z2 = T3((me2, V2) => {
  V2.exports = Dt2().default;
  V2.exports.default = V2.exports;
});
var ct2 = T3((J2) => {
  "use strict";
  J2.byteLength = _r;
  J2.toByteArray = Cr;
  J2.fromByteArray = Nr;
  var b2 = [], m = [], Lr = typeof Uint8Array < "u" ? Uint8Array : Array, ft2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  for (D2 = 0, Pt2 = ft2.length; D2 < Pt2; ++D2)
    b2[D2] = ft2[D2], m[ft2.charCodeAt(D2)] = D2;
  var D2, Pt2;
  m["-".charCodeAt(0)] = 62;
  m["_".charCodeAt(0)] = 63;
  function Nt2(e) {
    var t = e.length;
    if (t % 4 > 0)
      throw new Error("Invalid string. Length must be a multiple of 4");
    var r3 = e.indexOf("=");
    r3 === -1 && (r3 = t);
    var n = r3 === t ? 0 : 4 - r3 % 4;
    return [r3, n];
  }
  function _r(e) {
    var t = Nt2(e), r3 = t[0], n = t[1];
    return (r3 + n) * 3 / 4 - n;
  }
  function Rr(e, t, r3) {
    return (t + r3) * 3 / 4 - r3;
  }
  function Cr(e) {
    var t, r3 = Nt2(e), n = r3[0], i = r3[1], o = new Lr(Rr(e, n, i)), s = 0, u2 = i > 0 ? n - 4 : n, h2;
    for (h2 = 0; h2 < u2; h2 += 4)
      t = m[e.charCodeAt(h2)] << 18 | m[e.charCodeAt(h2 + 1)] << 12 | m[e.charCodeAt(h2 + 2)] << 6 | m[e.charCodeAt(h2 + 3)], o[s++] = t >> 16 & 255, o[s++] = t >> 8 & 255, o[s++] = t & 255;
    return i === 2 && (t = m[e.charCodeAt(h2)] << 2 | m[e.charCodeAt(h2 + 1)] >> 4, o[s++] = t & 255), i === 1 && (t = m[e.charCodeAt(h2)] << 10 | m[e.charCodeAt(h2 + 1)] << 4 | m[e.charCodeAt(h2 + 2)] >> 2, o[s++] = t >> 8 & 255, o[s++] = t & 255), o;
  }
  function Dr(e) {
    return b2[e >> 18 & 63] + b2[e >> 12 & 63] + b2[e >> 6 & 63] + b2[e & 63];
  }
  function Pr(e, t, r3) {
    for (var n, i = [], o = t; o < r3; o += 3)
      n = (e[o] << 16 & 16711680) + (e[o + 1] << 8 & 65280) + (e[o + 2] & 255), i.push(Dr(n));
    return i.join("");
  }
  function Nr(e) {
    for (var t, r3 = e.length, n = r3 % 3, i = [], o = 16383, s = 0, u2 = r3 - n; s < u2; s += o)
      i.push(Pr(e, s, s + o > u2 ? u2 : s + o));
    return n === 1 ? (t = e[r3 - 1], i.push(b2[t >> 2] + b2[t << 4 & 63] + "==")) : n === 2 && (t = (e[r3 - 2] << 8) + e[r3 - 1], i.push(b2[t >> 10] + b2[t >> 4 & 63] + b2[t << 2 & 63] + "=")), i.join("");
  }
});
var pt2 = T3((g) => {
  "use strict";
  Object.defineProperty(g, "__esModule", { value: true });
  g.b64UrlDecode = g.b64UrlEncode = g.bufferTob64Url = g.bufferTob64 = g.b64UrlToBuffer = g.stringToB64Url = g.stringToBuffer = g.bufferToString = g.b64UrlToString = g.concatBuffers = void 0;
  var kt2 = ct2();
  function kr(e) {
    let t = 0;
    for (let i = 0; i < e.length; i++)
      t += e[i].byteLength;
    let r3 = new Uint8Array(t), n = 0;
    r3.set(new Uint8Array(e[0]), n), n += e[0].byteLength;
    for (let i = 1; i < e.length; i++)
      r3.set(new Uint8Array(e[i]), n), n += e[i].byteLength;
    return r3;
  }
  g.concatBuffers = kr;
  function Mr(e) {
    let t = $t2(e);
    return Mt2(t);
  }
  g.b64UrlToString = Mr;
  function Mt2(e) {
    return new TextDecoder("utf-8", { fatal: true }).decode(e);
  }
  g.bufferToString = Mt2;
  function Ot2(e) {
    return new TextEncoder().encode(e);
  }
  g.stringToBuffer = Ot2;
  function Or(e) {
    return Ht2(Ot2(e));
  }
  g.stringToB64Url = Or;
  function $t2(e) {
    return new Uint8Array(kt2.toByteArray(qt2(e)));
  }
  g.b64UrlToBuffer = $t2;
  function Kt2(e) {
    return kt2.fromByteArray(new Uint8Array(e));
  }
  g.bufferTob64 = Kt2;
  function Ht2(e) {
    return jt2(Kt2(e));
  }
  g.bufferTob64Url = Ht2;
  function jt2(e) {
    return e.replace(/\+/g, "-").replace(/\//g, "_").replace(/\=/g, "");
  }
  g.b64UrlEncode = jt2;
  function qt2(e) {
    e = e.replace(/\-/g, "+").replace(/\_/g, "/");
    let t;
    return e.length % 4 == 0 ? t = 0 : t = 4 - e.length % 4, e.concat("=".repeat(t));
  }
  g.b64UrlDecode = qt2;
});
var Yt2 = T3((gt2) => {
  "use strict";
  Object.defineProperty(gt2, "__esModule", { value: true });
  var F3 = pt2(), lt2 = class {
    keyLength = 4096;
    publicExponent = 65537;
    hashAlgorithm = "sha256";
    driver;
    constructor() {
      if (!this.detectWebCrypto())
        throw new Error("SubtleCrypto not available!");
      this.driver = crypto.subtle;
    }
    async generateJWK() {
      let t = await this.driver.generateKey({ name: "RSA-PSS", modulusLength: 4096, publicExponent: new Uint8Array([1, 0, 1]), hash: { name: "SHA-256" } }, true, ["sign"]), r3 = await this.driver.exportKey("jwk", t.privateKey);
      return { kty: r3.kty, e: r3.e, n: r3.n, d: r3.d, p: r3.p, q: r3.q, dp: r3.dp, dq: r3.dq, qi: r3.qi };
    }
    async sign(t, r3, { saltLength: n } = {}) {
      let i = await this.driver.sign({ name: "RSA-PSS", saltLength: 32 }, await this.jwkToCryptoKey(t), r3);
      return new Uint8Array(i);
    }
    async hash(t, r3 = "SHA-256") {
      let n = await this.driver.digest(r3, t);
      return new Uint8Array(n);
    }
    async verify(t, r3, n) {
      let i = { kty: "RSA", e: "AQAB", n: t }, o = await this.jwkToPublicCryptoKey(i), s = await this.driver.digest("SHA-256", r3), u2 = await this.driver.verify({ name: "RSA-PSS", saltLength: 0 }, o, n, r3), h2 = await this.driver.verify({ name: "RSA-PSS", saltLength: 32 }, o, n, r3), p = await this.driver.verify({ name: "RSA-PSS", saltLength: Math.ceil((o.algorithm.modulusLength - 1) / 8) - s.byteLength - 2 }, o, n, r3);
      return u2 || h2 || p;
    }
    async jwkToCryptoKey(t) {
      return this.driver.importKey("jwk", t, { name: "RSA-PSS", hash: { name: "SHA-256" } }, false, ["sign"]);
    }
    async jwkToPublicCryptoKey(t) {
      return this.driver.importKey("jwk", t, { name: "RSA-PSS", hash: { name: "SHA-256" } }, false, ["verify"]);
    }
    detectWebCrypto() {
      if (typeof crypto > "u")
        return false;
      let t = crypto?.subtle;
      return t === void 0 ? false : ["generateKey", "importKey", "exportKey", "digest", "sign"].every((n) => typeof t[n] == "function");
    }
    async encrypt(t, r3, n) {
      let i = await this.driver.importKey("raw", typeof r3 == "string" ? F3.stringToBuffer(r3) : r3, { name: "PBKDF2", length: 32 }, false, ["deriveKey"]), o = await this.driver.deriveKey({ name: "PBKDF2", salt: n ? F3.stringToBuffer(n) : F3.stringToBuffer("salt"), iterations: 1e5, hash: "SHA-256" }, i, { name: "AES-CBC", length: 256 }, false, ["encrypt", "decrypt"]), s = new Uint8Array(16);
      crypto.getRandomValues(s);
      let u2 = await this.driver.encrypt({ name: "AES-CBC", iv: s }, o, t);
      return F3.concatBuffers([s, u2]);
    }
    async decrypt(t, r3, n) {
      let i = await this.driver.importKey("raw", typeof r3 == "string" ? F3.stringToBuffer(r3) : r3, { name: "PBKDF2", length: 32 }, false, ["deriveKey"]), o = await this.driver.deriveKey({ name: "PBKDF2", salt: n ? F3.stringToBuffer(n) : F3.stringToBuffer("salt"), iterations: 1e5, hash: "SHA-256" }, i, { name: "AES-CBC", length: 256 }, false, ["encrypt", "decrypt"]), s = t.slice(0, 16), u2 = await this.driver.decrypt({ name: "AES-CBC", iv: s }, o, t.slice(16));
      return F3.concatBuffers([u2]);
    }
  };
  gt2.default = lt2;
});
var zt = T3((mt2) => {
  mt2.read = function(e, t, r3, n, i) {
    var o, s, u2 = i * 8 - n - 1, h2 = (1 << u2) - 1, p = h2 >> 1, f = -7, c2 = r3 ? i - 1 : 0, U2 = r3 ? -1 : 1, l = e[t + c2];
    for (c2 += U2, o = l & (1 << -f) - 1, l >>= -f, f += u2; f > 0; o = o * 256 + e[t + c2], c2 += U2, f -= 8)
      ;
    for (s = o & (1 << -f) - 1, o >>= -f, f += n; f > 0; s = s * 256 + e[t + c2], c2 += U2, f -= 8)
      ;
    if (o === 0)
      o = 1 - p;
    else {
      if (o === h2)
        return s ? NaN : (l ? -1 : 1) * (1 / 0);
      s = s + Math.pow(2, n), o = o - p;
    }
    return (l ? -1 : 1) * s * Math.pow(2, o - n);
  };
  mt2.write = function(e, t, r3, n, i, o) {
    var s, u2, h2, p = o * 8 - i - 1, f = (1 << p) - 1, c2 = f >> 1, U2 = i === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, l = n ? 0 : o - 1, R2 = n ? 1 : -1, G2 = t < 0 || t === 0 && 1 / t < 0 ? 1 : 0;
    for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (u2 = isNaN(t) ? 1 : 0, s = f) : (s = Math.floor(Math.log(t) / Math.LN2), t * (h2 = Math.pow(2, -s)) < 1 && (s--, h2 *= 2), s + c2 >= 1 ? t += U2 / h2 : t += U2 * Math.pow(2, 1 - c2), t * h2 >= 2 && (s++, h2 /= 2), s + c2 >= f ? (u2 = 0, s = f) : s + c2 >= 1 ? (u2 = (t * h2 - 1) * Math.pow(2, i), s = s + c2) : (u2 = t * Math.pow(2, c2 - 1) * Math.pow(2, i), s = 0)); i >= 8; e[r3 + l] = u2 & 255, l += R2, u2 /= 256, i -= 8)
      ;
    for (s = s << i | u2, p += i; p > 0; e[r3 + l] = s & 255, l += R2, s /= 256, p -= 8)
      ;
    e[r3 + l - R2] |= G2 * 128;
  };
});
var nt2 = T3((q2) => {
  "use strict";
  var Bt2 = ct2(), H2 = zt(), Jt2 = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
  q2.Buffer = a;
  q2.SlowBuffer = Vr;
  q2.INSPECT_MAX_BYTES = 50;
  var rt2 = 2147483647;
  q2.kMaxLength = rt2;
  a.TYPED_ARRAY_SUPPORT = qr();
  !a.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
  function qr() {
    try {
      let e = new Uint8Array(1), t = { foo: function() {
        return 42;
      } };
      return Object.setPrototypeOf(t, Uint8Array.prototype), Object.setPrototypeOf(e, t), e.foo() === 42;
    } catch {
      return false;
    }
  }
  Object.defineProperty(a.prototype, "parent", { enumerable: true, get: function() {
    if (a.isBuffer(this))
      return this.buffer;
  } });
  Object.defineProperty(a.prototype, "offset", { enumerable: true, get: function() {
    if (a.isBuffer(this))
      return this.byteOffset;
  } });
  function S(e) {
    if (e > rt2)
      throw new RangeError('The value "' + e + '" is invalid for option "size"');
    let t = new Uint8Array(e);
    return Object.setPrototypeOf(t, a.prototype), t;
  }
  function a(e, t, r3) {
    if (typeof e == "number") {
      if (typeof t == "string")
        throw new TypeError('The "string" argument must be of type string. Received type number');
      return Tt2(e);
    }
    return tr2(e, t, r3);
  }
  a.poolSize = 8192;
  function tr2(e, t, r3) {
    if (typeof e == "string")
      return Yr(e, t);
    if (ArrayBuffer.isView(e))
      return vr(e);
    if (e == null)
      throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e);
    if (A(e, ArrayBuffer) || e && A(e.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (A(e, SharedArrayBuffer) || e && A(e.buffer, SharedArrayBuffer)))
      return bt2(e, t, r3);
    if (typeof e == "number")
      throw new TypeError('The "value" argument must not be of type number. Received type number');
    let n = e.valueOf && e.valueOf();
    if (n != null && n !== e)
      return a.from(n, t, r3);
    let i = Wr(e);
    if (i)
      return i;
    if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof e[Symbol.toPrimitive] == "function")
      return a.from(e[Symbol.toPrimitive]("string"), t, r3);
    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e);
  }
  a.from = function(e, t, r3) {
    return tr2(e, t, r3);
  };
  Object.setPrototypeOf(a.prototype, Uint8Array.prototype);
  Object.setPrototypeOf(a, Uint8Array);
  function rr2(e) {
    if (typeof e != "number")
      throw new TypeError('"size" argument must be of type number');
    if (e < 0)
      throw new RangeError('The value "' + e + '" is invalid for option "size"');
  }
  function Gr(e, t, r3) {
    return rr2(e), e <= 0 ? S(e) : t !== void 0 ? typeof r3 == "string" ? S(e).fill(t, r3) : S(e).fill(t) : S(e);
  }
  a.alloc = function(e, t, r3) {
    return Gr(e, t, r3);
  };
  function Tt2(e) {
    return rr2(e), S(e < 0 ? 0 : It2(e) | 0);
  }
  a.allocUnsafe = function(e) {
    return Tt2(e);
  };
  a.allocUnsafeSlow = function(e) {
    return Tt2(e);
  };
  function Yr(e, t) {
    if ((typeof t != "string" || t === "") && (t = "utf8"), !a.isEncoding(t))
      throw new TypeError("Unknown encoding: " + t);
    let r3 = er2(e, t) | 0, n = S(r3), i = n.write(e, t);
    return i !== r3 && (n = n.slice(0, i)), n;
  }
  function Et2(e) {
    let t = e.length < 0 ? 0 : It2(e.length) | 0, r3 = S(t);
    for (let n = 0; n < t; n += 1)
      r3[n] = e[n] & 255;
    return r3;
  }
  function vr(e) {
    if (A(e, Uint8Array)) {
      let t = new Uint8Array(e);
      return bt2(t.buffer, t.byteOffset, t.byteLength);
    }
    return Et2(e);
  }
  function bt2(e, t, r3) {
    if (t < 0 || e.byteLength < t)
      throw new RangeError('"offset" is outside of buffer bounds');
    if (e.byteLength < t + (r3 || 0))
      throw new RangeError('"length" is outside of buffer bounds');
    let n;
    return t === void 0 && r3 === void 0 ? n = new Uint8Array(e) : r3 === void 0 ? n = new Uint8Array(e, t) : n = new Uint8Array(e, t, r3), Object.setPrototypeOf(n, a.prototype), n;
  }
  function Wr(e) {
    if (a.isBuffer(e)) {
      let t = It2(e.length) | 0, r3 = S(t);
      return r3.length === 0 || e.copy(r3, 0, 0, t), r3;
    }
    if (e.length !== void 0)
      return typeof e.length != "number" || Ut2(e.length) ? S(0) : Et2(e);
    if (e.type === "Buffer" && Array.isArray(e.data))
      return Et2(e.data);
  }
  function It2(e) {
    if (e >= rt2)
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + rt2.toString(16) + " bytes");
    return e | 0;
  }
  function Vr(e) {
    return +e != e && (e = 0), a.alloc(+e);
  }
  a.isBuffer = function(t) {
    return t != null && t._isBuffer === true && t !== a.prototype;
  };
  a.compare = function(t, r3) {
    if (A(t, Uint8Array) && (t = a.from(t, t.offset, t.byteLength)), A(r3, Uint8Array) && (r3 = a.from(r3, r3.offset, r3.byteLength)), !a.isBuffer(t) || !a.isBuffer(r3))
      throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
    if (t === r3)
      return 0;
    let n = t.length, i = r3.length;
    for (let o = 0, s = Math.min(n, i); o < s; ++o)
      if (t[o] !== r3[o]) {
        n = t[o], i = r3[o];
        break;
      }
    return n < i ? -1 : i < n ? 1 : 0;
  };
  a.isEncoding = function(t) {
    switch (String(t).toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "latin1":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return true;
      default:
        return false;
    }
  };
  a.concat = function(t, r3) {
    if (!Array.isArray(t))
      throw new TypeError('"list" argument must be an Array of Buffers');
    if (t.length === 0)
      return a.alloc(0);
    let n;
    if (r3 === void 0)
      for (r3 = 0, n = 0; n < t.length; ++n)
        r3 += t[n].length;
    let i = a.allocUnsafe(r3), o = 0;
    for (n = 0; n < t.length; ++n) {
      let s = t[n];
      if (A(s, Uint8Array))
        o + s.length > i.length ? (a.isBuffer(s) || (s = a.from(s)), s.copy(i, o)) : Uint8Array.prototype.set.call(i, s, o);
      else if (a.isBuffer(s))
        s.copy(i, o);
      else
        throw new TypeError('"list" argument must be an Array of Buffers');
      o += s.length;
    }
    return i;
  };
  function er2(e, t) {
    if (a.isBuffer(e))
      return e.length;
    if (ArrayBuffer.isView(e) || A(e, ArrayBuffer))
      return e.byteLength;
    if (typeof e != "string")
      throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof e);
    let r3 = e.length, n = arguments.length > 2 && arguments[2] === true;
    if (!n && r3 === 0)
      return 0;
    let i = false;
    for (; ; )
      switch (t) {
        case "ascii":
        case "latin1":
        case "binary":
          return r3;
        case "utf8":
        case "utf-8":
          return At2(e).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return r3 * 2;
        case "hex":
          return r3 >>> 1;
        case "base64":
          return cr2(e).length;
        default:
          if (i)
            return n ? -1 : At2(e).length;
          t = ("" + t).toLowerCase(), i = true;
      }
  }
  a.byteLength = er2;
  function zr(e, t, r3) {
    let n = false;
    if ((t === void 0 || t < 0) && (t = 0), t > this.length || ((r3 === void 0 || r3 > this.length) && (r3 = this.length), r3 <= 0) || (r3 >>>= 0, t >>>= 0, r3 <= t))
      return "";
    for (e || (e = "utf8"); ; )
      switch (e) {
        case "hex":
          return oe2(this, t, r3);
        case "utf8":
        case "utf-8":
          return ir2(this, t, r3);
        case "ascii":
          return ne2(this, t, r3);
        case "latin1":
        case "binary":
          return ie2(this, t, r3);
        case "base64":
          return re2(this, t, r3);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return se2(this, t, r3);
        default:
          if (n)
            throw new TypeError("Unknown encoding: " + e);
          e = (e + "").toLowerCase(), n = true;
      }
  }
  a.prototype._isBuffer = true;
  function k2(e, t, r3) {
    let n = e[t];
    e[t] = e[r3], e[r3] = n;
  }
  a.prototype.swap16 = function() {
    let t = this.length;
    if (t % 2 !== 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (let r3 = 0; r3 < t; r3 += 2)
      k2(this, r3, r3 + 1);
    return this;
  };
  a.prototype.swap32 = function() {
    let t = this.length;
    if (t % 4 !== 0)
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (let r3 = 0; r3 < t; r3 += 4)
      k2(this, r3, r3 + 3), k2(this, r3 + 1, r3 + 2);
    return this;
  };
  a.prototype.swap64 = function() {
    let t = this.length;
    if (t % 8 !== 0)
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (let r3 = 0; r3 < t; r3 += 8)
      k2(this, r3, r3 + 7), k2(this, r3 + 1, r3 + 6), k2(this, r3 + 2, r3 + 5), k2(this, r3 + 3, r3 + 4);
    return this;
  };
  a.prototype.toString = function() {
    let t = this.length;
    return t === 0 ? "" : arguments.length === 0 ? ir2(this, 0, t) : zr.apply(this, arguments);
  };
  a.prototype.toLocaleString = a.prototype.toString;
  a.prototype.equals = function(t) {
    if (!a.isBuffer(t))
      throw new TypeError("Argument must be a Buffer");
    return this === t ? true : a.compare(this, t) === 0;
  };
  a.prototype.inspect = function() {
    let t = "", r3 = q2.INSPECT_MAX_BYTES;
    return t = this.toString("hex", 0, r3).replace(/(.{2})/g, "$1 ").trim(), this.length > r3 && (t += " ... "), "<Buffer " + t + ">";
  };
  Jt2 && (a.prototype[Jt2] = a.prototype.inspect);
  a.prototype.compare = function(t, r3, n, i, o) {
    if (A(t, Uint8Array) && (t = a.from(t, t.offset, t.byteLength)), !a.isBuffer(t))
      throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof t);
    if (r3 === void 0 && (r3 = 0), n === void 0 && (n = t ? t.length : 0), i === void 0 && (i = 0), o === void 0 && (o = this.length), r3 < 0 || n > t.length || i < 0 || o > this.length)
      throw new RangeError("out of range index");
    if (i >= o && r3 >= n)
      return 0;
    if (i >= o)
      return -1;
    if (r3 >= n)
      return 1;
    if (r3 >>>= 0, n >>>= 0, i >>>= 0, o >>>= 0, this === t)
      return 0;
    let s = o - i, u2 = n - r3, h2 = Math.min(s, u2), p = this.slice(i, o), f = t.slice(r3, n);
    for (let c2 = 0; c2 < h2; ++c2)
      if (p[c2] !== f[c2]) {
        s = p[c2], u2 = f[c2];
        break;
      }
    return s < u2 ? -1 : u2 < s ? 1 : 0;
  };
  function nr2(e, t, r3, n, i) {
    if (e.length === 0)
      return -1;
    if (typeof r3 == "string" ? (n = r3, r3 = 0) : r3 > 2147483647 ? r3 = 2147483647 : r3 < -2147483648 && (r3 = -2147483648), r3 = +r3, Ut2(r3) && (r3 = i ? 0 : e.length - 1), r3 < 0 && (r3 = e.length + r3), r3 >= e.length) {
      if (i)
        return -1;
      r3 = e.length - 1;
    } else if (r3 < 0)
      if (i)
        r3 = 0;
      else
        return -1;
    if (typeof t == "string" && (t = a.from(t, n)), a.isBuffer(t))
      return t.length === 0 ? -1 : Xt2(e, t, r3, n, i);
    if (typeof t == "number")
      return t = t & 255, typeof Uint8Array.prototype.indexOf == "function" ? i ? Uint8Array.prototype.indexOf.call(e, t, r3) : Uint8Array.prototype.lastIndexOf.call(e, t, r3) : Xt2(e, [t], r3, n, i);
    throw new TypeError("val must be string, number or Buffer");
  }
  function Xt2(e, t, r3, n, i) {
    let o = 1, s = e.length, u2 = t.length;
    if (n !== void 0 && (n = String(n).toLowerCase(), n === "ucs2" || n === "ucs-2" || n === "utf16le" || n === "utf-16le")) {
      if (e.length < 2 || t.length < 2)
        return -1;
      o = 2, s /= 2, u2 /= 2, r3 /= 2;
    }
    function h2(f, c2) {
      return o === 1 ? f[c2] : f.readUInt16BE(c2 * o);
    }
    let p;
    if (i) {
      let f = -1;
      for (p = r3; p < s; p++)
        if (h2(e, p) === h2(t, f === -1 ? 0 : p - f)) {
          if (f === -1 && (f = p), p - f + 1 === u2)
            return f * o;
        } else
          f !== -1 && (p -= p - f), f = -1;
    } else
      for (r3 + u2 > s && (r3 = s - u2), p = r3; p >= 0; p--) {
        let f = true;
        for (let c2 = 0; c2 < u2; c2++)
          if (h2(e, p + c2) !== h2(t, c2)) {
            f = false;
            break;
          }
        if (f)
          return p;
      }
    return -1;
  }
  a.prototype.includes = function(t, r3, n) {
    return this.indexOf(t, r3, n) !== -1;
  };
  a.prototype.indexOf = function(t, r3, n) {
    return nr2(this, t, r3, n, true);
  };
  a.prototype.lastIndexOf = function(t, r3, n) {
    return nr2(this, t, r3, n, false);
  };
  function Jr(e, t, r3, n) {
    r3 = Number(r3) || 0;
    let i = e.length - r3;
    n ? (n = Number(n), n > i && (n = i)) : n = i;
    let o = t.length;
    n > o / 2 && (n = o / 2);
    let s;
    for (s = 0; s < n; ++s) {
      let u2 = parseInt(t.substr(s * 2, 2), 16);
      if (Ut2(u2))
        return s;
      e[r3 + s] = u2;
    }
    return s;
  }
  function Xr(e, t, r3, n) {
    return et2(At2(t, e.length - r3), e, r3, n);
  }
  function Zr(e, t, r3, n) {
    return et2(fe2(t), e, r3, n);
  }
  function Qr(e, t, r3, n) {
    return et2(cr2(t), e, r3, n);
  }
  function te2(e, t, r3, n) {
    return et2(ce2(t, e.length - r3), e, r3, n);
  }
  a.prototype.write = function(t, r3, n, i) {
    if (r3 === void 0)
      i = "utf8", n = this.length, r3 = 0;
    else if (n === void 0 && typeof r3 == "string")
      i = r3, n = this.length, r3 = 0;
    else if (isFinite(r3))
      r3 = r3 >>> 0, isFinite(n) ? (n = n >>> 0, i === void 0 && (i = "utf8")) : (i = n, n = void 0);
    else
      throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
    let o = this.length - r3;
    if ((n === void 0 || n > o) && (n = o), t.length > 0 && (n < 0 || r3 < 0) || r3 > this.length)
      throw new RangeError("Attempt to write outside buffer bounds");
    i || (i = "utf8");
    let s = false;
    for (; ; )
      switch (i) {
        case "hex":
          return Jr(this, t, r3, n);
        case "utf8":
        case "utf-8":
          return Xr(this, t, r3, n);
        case "ascii":
        case "latin1":
        case "binary":
          return Zr(this, t, r3, n);
        case "base64":
          return Qr(this, t, r3, n);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return te2(this, t, r3, n);
        default:
          if (s)
            throw new TypeError("Unknown encoding: " + i);
          i = ("" + i).toLowerCase(), s = true;
      }
  };
  a.prototype.toJSON = function() {
    return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
  };
  function re2(e, t, r3) {
    return t === 0 && r3 === e.length ? Bt2.fromByteArray(e) : Bt2.fromByteArray(e.slice(t, r3));
  }
  function ir2(e, t, r3) {
    r3 = Math.min(e.length, r3);
    let n = [], i = t;
    for (; i < r3; ) {
      let o = e[i], s = null, u2 = o > 239 ? 4 : o > 223 ? 3 : o > 191 ? 2 : 1;
      if (i + u2 <= r3) {
        let h2, p, f, c2;
        switch (u2) {
          case 1:
            o < 128 && (s = o);
            break;
          case 2:
            h2 = e[i + 1], (h2 & 192) === 128 && (c2 = (o & 31) << 6 | h2 & 63, c2 > 127 && (s = c2));
            break;
          case 3:
            h2 = e[i + 1], p = e[i + 2], (h2 & 192) === 128 && (p & 192) === 128 && (c2 = (o & 15) << 12 | (h2 & 63) << 6 | p & 63, c2 > 2047 && (c2 < 55296 || c2 > 57343) && (s = c2));
            break;
          case 4:
            h2 = e[i + 1], p = e[i + 2], f = e[i + 3], (h2 & 192) === 128 && (p & 192) === 128 && (f & 192) === 128 && (c2 = (o & 15) << 18 | (h2 & 63) << 12 | (p & 63) << 6 | f & 63, c2 > 65535 && c2 < 1114112 && (s = c2));
        }
      }
      s === null ? (s = 65533, u2 = 1) : s > 65535 && (s -= 65536, n.push(s >>> 10 & 1023 | 55296), s = 56320 | s & 1023), n.push(s), i += u2;
    }
    return ee2(n);
  }
  var Zt2 = 4096;
  function ee2(e) {
    let t = e.length;
    if (t <= Zt2)
      return String.fromCharCode.apply(String, e);
    let r3 = "", n = 0;
    for (; n < t; )
      r3 += String.fromCharCode.apply(String, e.slice(n, n += Zt2));
    return r3;
  }
  function ne2(e, t, r3) {
    let n = "";
    r3 = Math.min(e.length, r3);
    for (let i = t; i < r3; ++i)
      n += String.fromCharCode(e[i] & 127);
    return n;
  }
  function ie2(e, t, r3) {
    let n = "";
    r3 = Math.min(e.length, r3);
    for (let i = t; i < r3; ++i)
      n += String.fromCharCode(e[i]);
    return n;
  }
  function oe2(e, t, r3) {
    let n = e.length;
    (!t || t < 0) && (t = 0), (!r3 || r3 < 0 || r3 > n) && (r3 = n);
    let i = "";
    for (let o = t; o < r3; ++o)
      i += pe2[e[o]];
    return i;
  }
  function se2(e, t, r3) {
    let n = e.slice(t, r3), i = "";
    for (let o = 0; o < n.length - 1; o += 2)
      i += String.fromCharCode(n[o] + n[o + 1] * 256);
    return i;
  }
  a.prototype.slice = function(t, r3) {
    let n = this.length;
    t = ~~t, r3 = r3 === void 0 ? n : ~~r3, t < 0 ? (t += n, t < 0 && (t = 0)) : t > n && (t = n), r3 < 0 ? (r3 += n, r3 < 0 && (r3 = 0)) : r3 > n && (r3 = n), r3 < t && (r3 = t);
    let i = this.subarray(t, r3);
    return Object.setPrototypeOf(i, a.prototype), i;
  };
  function y(e, t, r3) {
    if (e % 1 !== 0 || e < 0)
      throw new RangeError("offset is not uint");
    if (e + t > r3)
      throw new RangeError("Trying to access beyond buffer length");
  }
  a.prototype.readUintLE = a.prototype.readUIntLE = function(t, r3, n) {
    t = t >>> 0, r3 = r3 >>> 0, n || y(t, r3, this.length);
    let i = this[t], o = 1, s = 0;
    for (; ++s < r3 && (o *= 256); )
      i += this[t + s] * o;
    return i;
  };
  a.prototype.readUintBE = a.prototype.readUIntBE = function(t, r3, n) {
    t = t >>> 0, r3 = r3 >>> 0, n || y(t, r3, this.length);
    let i = this[t + --r3], o = 1;
    for (; r3 > 0 && (o *= 256); )
      i += this[t + --r3] * o;
    return i;
  };
  a.prototype.readUint8 = a.prototype.readUInt8 = function(t, r3) {
    return t = t >>> 0, r3 || y(t, 1, this.length), this[t];
  };
  a.prototype.readUint16LE = a.prototype.readUInt16LE = function(t, r3) {
    return t = t >>> 0, r3 || y(t, 2, this.length), this[t] | this[t + 1] << 8;
  };
  a.prototype.readUint16BE = a.prototype.readUInt16BE = function(t, r3) {
    return t = t >>> 0, r3 || y(t, 2, this.length), this[t] << 8 | this[t + 1];
  };
  a.prototype.readUint32LE = a.prototype.readUInt32LE = function(t, r3) {
    return t = t >>> 0, r3 || y(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + this[t + 3] * 16777216;
  };
  a.prototype.readUint32BE = a.prototype.readUInt32BE = function(t, r3) {
    return t = t >>> 0, r3 || y(t, 4, this.length), this[t] * 16777216 + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]);
  };
  a.prototype.readBigUInt64LE = L(function(t) {
    t = t >>> 0, j2(t, "offset");
    let r3 = this[t], n = this[t + 7];
    (r3 === void 0 || n === void 0) && W(t, this.length - 8);
    let i = r3 + this[++t] * 2 ** 8 + this[++t] * 2 ** 16 + this[++t] * 2 ** 24, o = this[++t] + this[++t] * 2 ** 8 + this[++t] * 2 ** 16 + n * 2 ** 24;
    return BigInt(i) + (BigInt(o) << BigInt(32));
  });
  a.prototype.readBigUInt64BE = L(function(t) {
    t = t >>> 0, j2(t, "offset");
    let r3 = this[t], n = this[t + 7];
    (r3 === void 0 || n === void 0) && W(t, this.length - 8);
    let i = r3 * 2 ** 24 + this[++t] * 2 ** 16 + this[++t] * 2 ** 8 + this[++t], o = this[++t] * 2 ** 24 + this[++t] * 2 ** 16 + this[++t] * 2 ** 8 + n;
    return (BigInt(i) << BigInt(32)) + BigInt(o);
  });
  a.prototype.readIntLE = function(t, r3, n) {
    t = t >>> 0, r3 = r3 >>> 0, n || y(t, r3, this.length);
    let i = this[t], o = 1, s = 0;
    for (; ++s < r3 && (o *= 256); )
      i += this[t + s] * o;
    return o *= 128, i >= o && (i -= Math.pow(2, 8 * r3)), i;
  };
  a.prototype.readIntBE = function(t, r3, n) {
    t = t >>> 0, r3 = r3 >>> 0, n || y(t, r3, this.length);
    let i = r3, o = 1, s = this[t + --i];
    for (; i > 0 && (o *= 256); )
      s += this[t + --i] * o;
    return o *= 128, s >= o && (s -= Math.pow(2, 8 * r3)), s;
  };
  a.prototype.readInt8 = function(t, r3) {
    return t = t >>> 0, r3 || y(t, 1, this.length), this[t] & 128 ? (255 - this[t] + 1) * -1 : this[t];
  };
  a.prototype.readInt16LE = function(t, r3) {
    t = t >>> 0, r3 || y(t, 2, this.length);
    let n = this[t] | this[t + 1] << 8;
    return n & 32768 ? n | 4294901760 : n;
  };
  a.prototype.readInt16BE = function(t, r3) {
    t = t >>> 0, r3 || y(t, 2, this.length);
    let n = this[t + 1] | this[t] << 8;
    return n & 32768 ? n | 4294901760 : n;
  };
  a.prototype.readInt32LE = function(t, r3) {
    return t = t >>> 0, r3 || y(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24;
  };
  a.prototype.readInt32BE = function(t, r3) {
    return t = t >>> 0, r3 || y(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3];
  };
  a.prototype.readBigInt64LE = L(function(t) {
    t = t >>> 0, j2(t, "offset");
    let r3 = this[t], n = this[t + 7];
    (r3 === void 0 || n === void 0) && W(t, this.length - 8);
    let i = this[t + 4] + this[t + 5] * 2 ** 8 + this[t + 6] * 2 ** 16 + (n << 24);
    return (BigInt(i) << BigInt(32)) + BigInt(r3 + this[++t] * 2 ** 8 + this[++t] * 2 ** 16 + this[++t] * 2 ** 24);
  });
  a.prototype.readBigInt64BE = L(function(t) {
    t = t >>> 0, j2(t, "offset");
    let r3 = this[t], n = this[t + 7];
    (r3 === void 0 || n === void 0) && W(t, this.length - 8);
    let i = (r3 << 24) + this[++t] * 2 ** 16 + this[++t] * 2 ** 8 + this[++t];
    return (BigInt(i) << BigInt(32)) + BigInt(this[++t] * 2 ** 24 + this[++t] * 2 ** 16 + this[++t] * 2 ** 8 + n);
  });
  a.prototype.readFloatLE = function(t, r3) {
    return t = t >>> 0, r3 || y(t, 4, this.length), H2.read(this, t, true, 23, 4);
  };
  a.prototype.readFloatBE = function(t, r3) {
    return t = t >>> 0, r3 || y(t, 4, this.length), H2.read(this, t, false, 23, 4);
  };
  a.prototype.readDoubleLE = function(t, r3) {
    return t = t >>> 0, r3 || y(t, 8, this.length), H2.read(this, t, true, 52, 8);
  };
  a.prototype.readDoubleBE = function(t, r3) {
    return t = t >>> 0, r3 || y(t, 8, this.length), H2.read(this, t, false, 52, 8);
  };
  function d(e, t, r3, n, i, o) {
    if (!a.isBuffer(e))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (t > i || t < o)
      throw new RangeError('"value" argument is out of bounds');
    if (r3 + n > e.length)
      throw new RangeError("Index out of range");
  }
  a.prototype.writeUintLE = a.prototype.writeUIntLE = function(t, r3, n, i) {
    if (t = +t, r3 = r3 >>> 0, n = n >>> 0, !i) {
      let u2 = Math.pow(2, 8 * n) - 1;
      d(this, t, r3, n, u2, 0);
    }
    let o = 1, s = 0;
    for (this[r3] = t & 255; ++s < n && (o *= 256); )
      this[r3 + s] = t / o & 255;
    return r3 + n;
  };
  a.prototype.writeUintBE = a.prototype.writeUIntBE = function(t, r3, n, i) {
    if (t = +t, r3 = r3 >>> 0, n = n >>> 0, !i) {
      let u2 = Math.pow(2, 8 * n) - 1;
      d(this, t, r3, n, u2, 0);
    }
    let o = n - 1, s = 1;
    for (this[r3 + o] = t & 255; --o >= 0 && (s *= 256); )
      this[r3 + o] = t / s & 255;
    return r3 + n;
  };
  a.prototype.writeUint8 = a.prototype.writeUInt8 = function(t, r3, n) {
    return t = +t, r3 = r3 >>> 0, n || d(this, t, r3, 1, 255, 0), this[r3] = t & 255, r3 + 1;
  };
  a.prototype.writeUint16LE = a.prototype.writeUInt16LE = function(t, r3, n) {
    return t = +t, r3 = r3 >>> 0, n || d(this, t, r3, 2, 65535, 0), this[r3] = t & 255, this[r3 + 1] = t >>> 8, r3 + 2;
  };
  a.prototype.writeUint16BE = a.prototype.writeUInt16BE = function(t, r3, n) {
    return t = +t, r3 = r3 >>> 0, n || d(this, t, r3, 2, 65535, 0), this[r3] = t >>> 8, this[r3 + 1] = t & 255, r3 + 2;
  };
  a.prototype.writeUint32LE = a.prototype.writeUInt32LE = function(t, r3, n) {
    return t = +t, r3 = r3 >>> 0, n || d(this, t, r3, 4, 4294967295, 0), this[r3 + 3] = t >>> 24, this[r3 + 2] = t >>> 16, this[r3 + 1] = t >>> 8, this[r3] = t & 255, r3 + 4;
  };
  a.prototype.writeUint32BE = a.prototype.writeUInt32BE = function(t, r3, n) {
    return t = +t, r3 = r3 >>> 0, n || d(this, t, r3, 4, 4294967295, 0), this[r3] = t >>> 24, this[r3 + 1] = t >>> 16, this[r3 + 2] = t >>> 8, this[r3 + 3] = t & 255, r3 + 4;
  };
  function or2(e, t, r3, n, i) {
    fr(t, n, i, e, r3, 7);
    let o = Number(t & BigInt(4294967295));
    e[r3++] = o, o = o >> 8, e[r3++] = o, o = o >> 8, e[r3++] = o, o = o >> 8, e[r3++] = o;
    let s = Number(t >> BigInt(32) & BigInt(4294967295));
    return e[r3++] = s, s = s >> 8, e[r3++] = s, s = s >> 8, e[r3++] = s, s = s >> 8, e[r3++] = s, r3;
  }
  function sr2(e, t, r3, n, i) {
    fr(t, n, i, e, r3, 7);
    let o = Number(t & BigInt(4294967295));
    e[r3 + 7] = o, o = o >> 8, e[r3 + 6] = o, o = o >> 8, e[r3 + 5] = o, o = o >> 8, e[r3 + 4] = o;
    let s = Number(t >> BigInt(32) & BigInt(4294967295));
    return e[r3 + 3] = s, s = s >> 8, e[r3 + 2] = s, s = s >> 8, e[r3 + 1] = s, s = s >> 8, e[r3] = s, r3 + 8;
  }
  a.prototype.writeBigUInt64LE = L(function(t, r3 = 0) {
    return or2(this, t, r3, BigInt(0), BigInt("0xffffffffffffffff"));
  });
  a.prototype.writeBigUInt64BE = L(function(t, r3 = 0) {
    return sr2(this, t, r3, BigInt(0), BigInt("0xffffffffffffffff"));
  });
  a.prototype.writeIntLE = function(t, r3, n, i) {
    if (t = +t, r3 = r3 >>> 0, !i) {
      let h2 = Math.pow(2, 8 * n - 1);
      d(this, t, r3, n, h2 - 1, -h2);
    }
    let o = 0, s = 1, u2 = 0;
    for (this[r3] = t & 255; ++o < n && (s *= 256); )
      t < 0 && u2 === 0 && this[r3 + o - 1] !== 0 && (u2 = 1), this[r3 + o] = (t / s >> 0) - u2 & 255;
    return r3 + n;
  };
  a.prototype.writeIntBE = function(t, r3, n, i) {
    if (t = +t, r3 = r3 >>> 0, !i) {
      let h2 = Math.pow(2, 8 * n - 1);
      d(this, t, r3, n, h2 - 1, -h2);
    }
    let o = n - 1, s = 1, u2 = 0;
    for (this[r3 + o] = t & 255; --o >= 0 && (s *= 256); )
      t < 0 && u2 === 0 && this[r3 + o + 1] !== 0 && (u2 = 1), this[r3 + o] = (t / s >> 0) - u2 & 255;
    return r3 + n;
  };
  a.prototype.writeInt8 = function(t, r3, n) {
    return t = +t, r3 = r3 >>> 0, n || d(this, t, r3, 1, 127, -128), t < 0 && (t = 255 + t + 1), this[r3] = t & 255, r3 + 1;
  };
  a.prototype.writeInt16LE = function(t, r3, n) {
    return t = +t, r3 = r3 >>> 0, n || d(this, t, r3, 2, 32767, -32768), this[r3] = t & 255, this[r3 + 1] = t >>> 8, r3 + 2;
  };
  a.prototype.writeInt16BE = function(t, r3, n) {
    return t = +t, r3 = r3 >>> 0, n || d(this, t, r3, 2, 32767, -32768), this[r3] = t >>> 8, this[r3 + 1] = t & 255, r3 + 2;
  };
  a.prototype.writeInt32LE = function(t, r3, n) {
    return t = +t, r3 = r3 >>> 0, n || d(this, t, r3, 4, 2147483647, -2147483648), this[r3] = t & 255, this[r3 + 1] = t >>> 8, this[r3 + 2] = t >>> 16, this[r3 + 3] = t >>> 24, r3 + 4;
  };
  a.prototype.writeInt32BE = function(t, r3, n) {
    return t = +t, r3 = r3 >>> 0, n || d(this, t, r3, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t + 1), this[r3] = t >>> 24, this[r3 + 1] = t >>> 16, this[r3 + 2] = t >>> 8, this[r3 + 3] = t & 255, r3 + 4;
  };
  a.prototype.writeBigInt64LE = L(function(t, r3 = 0) {
    return or2(this, t, r3, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  });
  a.prototype.writeBigInt64BE = L(function(t, r3 = 0) {
    return sr2(this, t, r3, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  });
  function ar(e, t, r3, n, i, o) {
    if (r3 + n > e.length)
      throw new RangeError("Index out of range");
    if (r3 < 0)
      throw new RangeError("Index out of range");
  }
  function ur(e, t, r3, n, i) {
    return t = +t, r3 = r3 >>> 0, i || ar(e, t, r3, 4, 34028234663852886e22, -34028234663852886e22), H2.write(e, t, r3, n, 23, 4), r3 + 4;
  }
  a.prototype.writeFloatLE = function(t, r3, n) {
    return ur(this, t, r3, true, n);
  };
  a.prototype.writeFloatBE = function(t, r3, n) {
    return ur(this, t, r3, false, n);
  };
  function hr2(e, t, r3, n, i) {
    return t = +t, r3 = r3 >>> 0, i || ar(e, t, r3, 8, 17976931348623157e292, -17976931348623157e292), H2.write(e, t, r3, n, 52, 8), r3 + 8;
  }
  a.prototype.writeDoubleLE = function(t, r3, n) {
    return hr2(this, t, r3, true, n);
  };
  a.prototype.writeDoubleBE = function(t, r3, n) {
    return hr2(this, t, r3, false, n);
  };
  a.prototype.copy = function(t, r3, n, i) {
    if (!a.isBuffer(t))
      throw new TypeError("argument should be a Buffer");
    if (n || (n = 0), !i && i !== 0 && (i = this.length), r3 >= t.length && (r3 = t.length), r3 || (r3 = 0), i > 0 && i < n && (i = n), i === n || t.length === 0 || this.length === 0)
      return 0;
    if (r3 < 0)
      throw new RangeError("targetStart out of bounds");
    if (n < 0 || n >= this.length)
      throw new RangeError("Index out of range");
    if (i < 0)
      throw new RangeError("sourceEnd out of bounds");
    i > this.length && (i = this.length), t.length - r3 < i - n && (i = t.length - r3 + n);
    let o = i - n;
    return this === t && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(r3, n, i) : Uint8Array.prototype.set.call(t, this.subarray(n, i), r3), o;
  };
  a.prototype.fill = function(t, r3, n, i) {
    if (typeof t == "string") {
      if (typeof r3 == "string" ? (i = r3, r3 = 0, n = this.length) : typeof n == "string" && (i = n, n = this.length), i !== void 0 && typeof i != "string")
        throw new TypeError("encoding must be a string");
      if (typeof i == "string" && !a.isEncoding(i))
        throw new TypeError("Unknown encoding: " + i);
      if (t.length === 1) {
        let s = t.charCodeAt(0);
        (i === "utf8" && s < 128 || i === "latin1") && (t = s);
      }
    } else
      typeof t == "number" ? t = t & 255 : typeof t == "boolean" && (t = Number(t));
    if (r3 < 0 || this.length < r3 || this.length < n)
      throw new RangeError("Out of range index");
    if (n <= r3)
      return this;
    r3 = r3 >>> 0, n = n === void 0 ? this.length : n >>> 0, t || (t = 0);
    let o;
    if (typeof t == "number")
      for (o = r3; o < n; ++o)
        this[o] = t;
    else {
      let s = a.isBuffer(t) ? t : a.from(t, i), u2 = s.length;
      if (u2 === 0)
        throw new TypeError('The value "' + t + '" is invalid for argument "value"');
      for (o = 0; o < n - r3; ++o)
        this[o + r3] = s[o % u2];
    }
    return this;
  };
  var K2 = {};
  function St2(e, t, r3) {
    K2[e] = class extends r3 {
      constructor() {
        super(), Object.defineProperty(this, "message", { value: t.apply(this, arguments), writable: true, configurable: true }), this.name = `${this.name} [${e}]`, this.stack, delete this.name;
      }
      get code() {
        return e;
      }
      set code(i) {
        Object.defineProperty(this, "code", { configurable: true, enumerable: true, value: i, writable: true });
      }
      toString() {
        return `${this.name} [${e}]: ${this.message}`;
      }
    };
  }
  St2("ERR_BUFFER_OUT_OF_BOUNDS", function(e) {
    return e ? `${e} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
  }, RangeError);
  St2("ERR_INVALID_ARG_TYPE", function(e, t) {
    return `The "${e}" argument must be of type number. Received type ${typeof t}`;
  }, TypeError);
  St2("ERR_OUT_OF_RANGE", function(e, t, r3) {
    let n = `The value of "${e}" is out of range.`, i = r3;
    return Number.isInteger(r3) && Math.abs(r3) > 2 ** 32 ? i = Qt2(String(r3)) : typeof r3 == "bigint" && (i = String(r3), (r3 > BigInt(2) ** BigInt(32) || r3 < -(BigInt(2) ** BigInt(32))) && (i = Qt2(i)), i += "n"), n += ` It must be ${t}. Received ${i}`, n;
  }, RangeError);
  function Qt2(e) {
    let t = "", r3 = e.length, n = e[0] === "-" ? 1 : 0;
    for (; r3 >= n + 4; r3 -= 3)
      t = `_${e.slice(r3 - 3, r3)}${t}`;
    return `${e.slice(0, r3)}${t}`;
  }
  function ae2(e, t, r3) {
    j2(t, "offset"), (e[t] === void 0 || e[t + r3] === void 0) && W(t, e.length - (r3 + 1));
  }
  function fr(e, t, r3, n, i, o) {
    if (e > r3 || e < t) {
      let s = typeof t == "bigint" ? "n" : "", u2;
      throw o > 3 ? t === 0 || t === BigInt(0) ? u2 = `>= 0${s} and < 2${s} ** ${(o + 1) * 8}${s}` : u2 = `>= -(2${s} ** ${(o + 1) * 8 - 1}${s}) and < 2 ** ${(o + 1) * 8 - 1}${s}` : u2 = `>= ${t}${s} and <= ${r3}${s}`, new K2.ERR_OUT_OF_RANGE("value", u2, e);
    }
    ae2(n, i, o);
  }
  function j2(e, t) {
    if (typeof e != "number")
      throw new K2.ERR_INVALID_ARG_TYPE(t, "number", e);
  }
  function W(e, t, r3) {
    throw Math.floor(e) !== e ? (j2(e, r3), new K2.ERR_OUT_OF_RANGE(r3 || "offset", "an integer", e)) : t < 0 ? new K2.ERR_BUFFER_OUT_OF_BOUNDS() : new K2.ERR_OUT_OF_RANGE(r3 || "offset", `>= ${r3 ? 1 : 0} and <= ${t}`, e);
  }
  var ue2 = /[^+/0-9A-Za-z-_]/g;
  function he2(e) {
    if (e = e.split("=")[0], e = e.trim().replace(ue2, ""), e.length < 2)
      return "";
    for (; e.length % 4 !== 0; )
      e = e + "=";
    return e;
  }
  function At2(e, t) {
    t = t || 1 / 0;
    let r3, n = e.length, i = null, o = [];
    for (let s = 0; s < n; ++s) {
      if (r3 = e.charCodeAt(s), r3 > 55295 && r3 < 57344) {
        if (!i) {
          if (r3 > 56319) {
            (t -= 3) > -1 && o.push(239, 191, 189);
            continue;
          } else if (s + 1 === n) {
            (t -= 3) > -1 && o.push(239, 191, 189);
            continue;
          }
          i = r3;
          continue;
        }
        if (r3 < 56320) {
          (t -= 3) > -1 && o.push(239, 191, 189), i = r3;
          continue;
        }
        r3 = (i - 55296 << 10 | r3 - 56320) + 65536;
      } else
        i && (t -= 3) > -1 && o.push(239, 191, 189);
      if (i = null, r3 < 128) {
        if ((t -= 1) < 0)
          break;
        o.push(r3);
      } else if (r3 < 2048) {
        if ((t -= 2) < 0)
          break;
        o.push(r3 >> 6 | 192, r3 & 63 | 128);
      } else if (r3 < 65536) {
        if ((t -= 3) < 0)
          break;
        o.push(r3 >> 12 | 224, r3 >> 6 & 63 | 128, r3 & 63 | 128);
      } else if (r3 < 1114112) {
        if ((t -= 4) < 0)
          break;
        o.push(r3 >> 18 | 240, r3 >> 12 & 63 | 128, r3 >> 6 & 63 | 128, r3 & 63 | 128);
      } else
        throw new Error("Invalid code point");
    }
    return o;
  }
  function fe2(e) {
    let t = [];
    for (let r3 = 0; r3 < e.length; ++r3)
      t.push(e.charCodeAt(r3) & 255);
    return t;
  }
  function ce2(e, t) {
    let r3, n, i, o = [];
    for (let s = 0; s < e.length && !((t -= 2) < 0); ++s)
      r3 = e.charCodeAt(s), n = r3 >> 8, i = r3 % 256, o.push(i), o.push(n);
    return o;
  }
  function cr2(e) {
    return Bt2.toByteArray(he2(e));
  }
  function et2(e, t, r3, n) {
    let i;
    for (i = 0; i < n && !(i + r3 >= t.length || i >= e.length); ++i)
      t[i + r3] = e[i];
    return i;
  }
  function A(e, t) {
    return e instanceof t || e != null && e.constructor != null && e.constructor.name != null && e.constructor.name === t.name;
  }
  function Ut2(e) {
    return e !== e;
  }
  var pe2 = function() {
    let e = "0123456789abcdef", t = new Array(256);
    for (let r3 = 0; r3 < 16; ++r3) {
      let n = r3 * 16;
      for (let i = 0; i < 16; ++i)
        t[n + i] = e[r3] + e[i];
    }
    return t;
  }();
  function L(e) {
    return typeof BigInt > "u" ? le2 : e;
  }
  function le2() {
    throw new Error("BigInt not supported");
  }
});
var pr2 = T3((Je2, Ft2) => {
  typeof window < "u" ? (window.global = window, global.fetch = window.fetch, Ft2.exports = { Buffer: nt2().Buffer, Crypto: window.crypto }) : Ft2.exports = { Buffer: nt2().Buffer, Crypto: crypto };
});
var Lt = {};
Ar(Lt, { AVSCTap: () => $2, ArweaveSigner: () => N2, DataItem: () => _, MAX_TAG_BYTES: () => tt2, MIN_BINARY_SIZE: () => gr, SIG_CONFIG: () => P2, SignatureConfig: () => B2, Signer: () => ot2, createData: () => ge2, deserializeTags: () => Q2, indexToType: () => wt2, serializeTags: () => dt2, tagsExceedLimit: () => jr });
var ot2 = class {
  signer;
  publicKey;
  signatureType;
  signatureLength;
  ownerLength;
  pem;
  static verify(t, r3, n, i) {
    throw new Error("You must implement verify method on child");
  }
};
var vt2 = C2(z2(), 1);
var w = C2(pt2(), 1);
async function X2(e) {
  if (Array.isArray(e)) {
    let i = (0, w.concatBuffers)([(0, w.stringToBuffer)("list"), (0, w.stringToBuffer)(e.length.toString())]);
    return await Gt2(e, await x().hash(i, "SHA-384"));
  }
  let t = e, r3 = (0, w.concatBuffers)([(0, w.stringToBuffer)("blob"), (0, w.stringToBuffer)(t.byteLength.toString())]), n = (0, w.concatBuffers)([await x().hash(r3, "SHA-384"), await x().hash(t, "SHA-384")]);
  return await x().hash(n, "SHA-384");
}
async function Gt2(e, t) {
  if (e.length < 1)
    return t;
  let r3 = (0, w.concatBuffers)([t, await X2(e[0])]), n = await x().hash(r3, "SHA-384");
  return await Gt2(e.slice(1), n);
}
var Z2 = C2(Yt2(), 1);
var $r = Z2.default.default ? Z2.default.default : Z2.default;
var yt2 = class extends $r {
  getPublicKey(t) {
    throw new Error("Unimplemented");
  }
};
var Kr;
function x() {
  return Kr ??= new yt2();
}
var B2;
(function(e) {
  e[e.ARWEAVE = 1] = "ARWEAVE", e[e.ED25519 = 2] = "ED25519", e[e.ETHEREUM = 3] = "ETHEREUM", e[e.SOLANA = 4] = "SOLANA", e[e.INJECTEDAPTOS = 5] = "INJECTEDAPTOS", e[e.MULTIAPTOS = 6] = "MULTIAPTOS", e[e.TYPEDETHEREUM = 7] = "TYPEDETHEREUM";
})(B2 || (B2 = {}));
var P2 = { [B2.ARWEAVE]: { sigLength: 512, pubLength: 512, sigName: "arweave" }, [B2.ED25519]: { sigLength: 64, pubLength: 32, sigName: "ed25519" }, [B2.ETHEREUM]: { sigLength: 65, pubLength: 65, sigName: "ethereum" }, [B2.SOLANA]: { sigLength: 64, pubLength: 32, sigName: "solana" }, [B2.INJECTEDAPTOS]: { sigLength: 64, pubLength: 32, sigName: "injectedAptos" }, [B2.MULTIAPTOS]: { sigLength: 64 * 32 + 4, pubLength: 32 * 32 + 1, sigName: "multiAptos" }, [B2.TYPEDETHEREUM]: { sigLength: 65, pubLength: 42, sigName: "typedEthereum" } };
var N2 = class {
  signatureType = 1;
  ownerLength = P2[1].pubLength;
  signatureLength = P2[1].sigLength;
  jwk;
  pk;
  constructor(t) {
    this.pk = t.n, this.jwk = t;
  }
  get publicKey() {
    return vt2.default.toBuffer(this.pk);
  }
  sign(t) {
    return x().sign(this.jwk, t);
  }
  static async verify(t, r3, n) {
    return await x().verify(t, r3, n);
  }
};
var wt2 = { 1: N2 };
var E2 = C2(z2(), 1);
async function v(e) {
  return X2([(0, w.stringToBuffer)("dataitem"), (0, w.stringToBuffer)("1"), (0, w.stringToBuffer)(e.signatureType.toString()), e.rawOwner, e.rawTarget, e.rawAnchor, e.rawTags, e.rawData]);
}
async function Hr(e, t) {
  let r3 = await v(e), n = await t.sign(r3), i = await x().hash(n);
  return { signature: Buffer.from(n), id: Buffer.from(i) };
}
async function Wt2(e, t) {
  let { signature: r3, id: n } = await Hr(e, t);
  return e.getRaw().set(r3, 2), n;
}
var $2 = class {
  buf;
  pos;
  constructor(t = Buffer.alloc(tt2), r3 = 0) {
    this.buf = t, this.pos = r3;
  }
  writeTags(t) {
    if (!Array.isArray(t))
      throw new Error("input must be array");
    let r3 = t.length, n;
    if (r3)
      for (this.writeLong(r3), n = 0; n < r3; n++) {
        let i = t[n];
        if (i?.name === void 0 || i?.value === void 0)
          throw new Error(`Invalid tag format for ${i}, expected {name:string, value: string}`);
        this.writeString(i.name), this.writeString(i.value);
      }
    this.writeLong(0);
  }
  toBuffer() {
    let t = Buffer.alloc(this.pos);
    if (this.pos > this.buf.length)
      throw new Error(`Too many tag bytes (${this.pos} > ${this.buf.length})`);
    return this.buf.copy(t, 0, 0, this.pos), t;
  }
  tagsExceedLimit() {
    return this.pos > this.buf.length;
  }
  writeLong(t) {
    let r3 = this.buf, n, i;
    if (t >= -1073741824 && t < 1073741824) {
      i = t >= 0 ? t << 1 : ~t << 1 | 1;
      do
        r3[this.pos] = i & 127, i >>= 7;
      while (i && (r3[this.pos++] |= 128));
    } else {
      n = t >= 0 ? t * 2 : -t * 2 - 1;
      do
        r3[this.pos] = n & 127, n /= 128;
      while (n >= 1 && (r3[this.pos++] |= 128));
    }
    this.pos++, this.buf = r3;
  }
  writeString(t) {
    let r3 = Buffer.byteLength(t), n = this.buf;
    this.writeLong(r3);
    let i = this.pos;
    if (this.pos += r3, !(this.pos > n.length)) {
      if (r3 > 64)
        this.buf.write(t, this.pos - r3, r3, "utf8");
      else {
        let o, s, u2, h2;
        for (o = 0, s = r3; o < s; o++)
          u2 = t.charCodeAt(o), u2 < 128 ? n[i++] = u2 : u2 < 2048 ? (n[i++] = u2 >> 6 | 192, n[i++] = u2 & 63 | 128) : (u2 & 64512) === 55296 && ((h2 = t.charCodeAt(o + 1)) & 64512) === 56320 ? (u2 = 65536 + ((u2 & 1023) << 10) + (h2 & 1023), o++, n[i++] = u2 >> 18 | 240, n[i++] = u2 >> 12 & 63 | 128, n[i++] = u2 >> 6 & 63 | 128, n[i++] = u2 & 63 | 128) : (n[i++] = u2 >> 12 | 224, n[i++] = u2 >> 6 & 63 | 128, n[i++] = u2 & 63 | 128);
      }
      this.buf = n;
    }
  }
  readLong() {
    let t = 0, r3 = 0, n = this.buf, i, o, s, u2;
    do
      i = n[this.pos++], o = i & 128, t |= (i & 127) << r3, r3 += 7;
    while (o && r3 < 28);
    if (o) {
      s = t, u2 = 268435456;
      do
        i = n[this.pos++], s += (i & 127) * u2, u2 *= 128;
      while (i & 128);
      return (s % 2 ? -(s + 1) : s) / 2;
    }
    return t >> 1 ^ -(t & 1);
  }
  skipLong() {
    let t = this.buf;
    for (; t[this.pos++] & 128; )
      ;
  }
  readTags() {
    let t = [], r3;
    for (; r3 = this.readLong(); )
      for (r3 < 0 && (r3 = -r3, this.skipLong()); r3--; ) {
        let n = this.readString(), i = this.readString();
        t.push({ name: n, value: i });
      }
    return t;
  }
  readString() {
    let t = this.readLong(), r3 = this.pos, n = this.buf;
    if (this.pos += t, !(this.pos > n.length))
      return this.buf.slice(r3, r3 + t).toString();
  }
};
function dt2(e) {
  let t = new $2();
  return t.writeTags(e), t.toBuffer();
}
function jr(e) {
  let t = new $2();
  return t.writeTags(e), t.tagsExceedLimit();
}
function Q2(e) {
  return new $2(e).readTags();
}
function I2(e) {
  let t = 0;
  for (let r3 = e.length - 1; r3 >= 0; r3--)
    t = t * 256 + e[r3];
  return t;
}
function Vt2(e) {
  if (e > (2 ^ 32 - 1))
    throw new Error("Short too long");
  let t = [0, 0];
  for (let r3 = 0; r3 < t.length; r3++) {
    let n = e & 255;
    t[r3] = n, e = (e - n) / 256;
  }
  return Uint8Array.from(t);
}
function xt2(e) {
  let t = [0, 0, 0, 0, 0, 0, 0, 0];
  for (let r3 = 0; r3 < t.length; r3++) {
    let n = e & 255;
    t[r3] = n, e = (e - n) / 256;
  }
  return Uint8Array.from(t);
}
var lr2 = C2(pr2(), 1);
var M2 = C2(nt2(), 1);
var tt2 = 4096;
var gr = 80;
var _ = class {
  binary;
  _id;
  constructor(t) {
    this.binary = t;
  }
  static isDataItem(t) {
    return t.binary !== void 0;
  }
  get signatureType() {
    let t = I2(this.binary.subarray(0, 2));
    if (B2?.[t] !== void 0)
      return t;
    throw new Error("Unknown signature type: " + t);
  }
  async isValid() {
    return _.verify(this.binary);
  }
  get id() {
    return (async () => E2.default.encode(await this.rawId))();
  }
  set id(t) {
    this._id = E2.default.toBuffer(t);
  }
  get rawId() {
    return (async () => M2.Buffer.from(await lr2.Crypto.subtle.digest("SHA-256", this.rawSignature)))();
  }
  set rawId(t) {
    this._id = t;
  }
  get rawSignature() {
    return this.binary.subarray(2, 2 + this.signatureLength);
  }
  get signature() {
    return E2.default.encode(this.rawSignature);
  }
  set rawOwner(t) {
    if (t.byteLength != this.ownerLength)
      throw new Error(`Expected raw owner (pubkey) to be ${this.ownerLength} bytes, got ${t.byteLength} bytes.`);
    this.binary.set(t, 2 + this.signatureLength);
  }
  get rawOwner() {
    return this.binary.subarray(2 + this.signatureLength, 2 + this.signatureLength + this.ownerLength);
  }
  get signatureLength() {
    return P2[this.signatureType].sigLength;
  }
  get owner() {
    return E2.default.encode(this.rawOwner);
  }
  get ownerLength() {
    return P2[this.signatureType].pubLength;
  }
  get rawTarget() {
    let t = this.getTargetStart();
    return this.binary[t] == 1 ? this.binary.subarray(t + 1, t + 33) : M2.Buffer.alloc(0);
  }
  get target() {
    return E2.default.encode(this.rawTarget);
  }
  get rawAnchor() {
    let t = this.getAnchorStart();
    return this.binary[t] == 1 ? this.binary.subarray(t + 1, t + 33) : M2.Buffer.alloc(0);
  }
  get anchor() {
    return this.rawAnchor.toString();
  }
  get rawTags() {
    let t = this.getTagsStart(), r3 = I2(this.binary.subarray(t + 8, t + 16));
    return this.binary.subarray(t + 16, t + 16 + r3);
  }
  get tags() {
    let t = this.getTagsStart();
    if (I2(this.binary.subarray(t, t + 8)) == 0)
      return [];
    let n = I2(this.binary.subarray(t + 8, t + 16));
    return Q2(M2.Buffer.from(this.binary.subarray(t + 16, t + 16 + n)));
  }
  get tagsB64Url() {
    return this.tags.map((r3) => ({ name: E2.default.encode(r3.name), value: E2.default.encode(r3.value) }));
  }
  getStartOfData() {
    let t = this.getTagsStart(), r3 = this.binary.subarray(t + 8, t + 16), n = I2(r3);
    return t + 16 + n;
  }
  get rawData() {
    let t = this.getTagsStart(), r3 = this.binary.subarray(t + 8, t + 16), n = I2(r3), i = t + 16 + n;
    return this.binary.subarray(i, this.binary.length);
  }
  get data() {
    return E2.default.encode(this.rawData);
  }
  getRaw() {
    return this.binary;
  }
  async sign(t) {
    return this._id = await Wt2(this, t), this.rawId;
  }
  async setSignature(t) {
    this.binary.set(t, 2), this._id = M2.Buffer.from(await x().hash(t));
  }
  isSigned() {
    return (this._id?.length ?? 0) > 0;
  }
  toJSON() {
    return { signature: this.signature, owner: this.owner, target: this.target, tags: this.tags.map((t) => ({ name: E2.default.encode(t.name), value: E2.default.encode(t.value) })), data: this.data };
  }
  static async verify(t) {
    if (t.byteLength < gr)
      return false;
    let r3 = new _(t), n = r3.signatureType, i = r3.getTagsStart(), o = I2(t.subarray(i, i + 8)), s = t.subarray(i + 8, i + 16), u2 = I2(s);
    if (u2 > tt2)
      return false;
    if (o > 0)
      try {
        if (Q2(M2.Buffer.from(t.subarray(i + 16, i + 16 + u2))).length !== o)
          return false;
      } catch {
        return false;
      }
    let h2 = wt2[n], p = await v(r3);
    return await h2.verify(r3.rawOwner, p, r3.rawSignature);
  }
  async getSignatureData() {
    return v(this);
  }
  getTagsStart() {
    let t = this.getTargetStart(), r3 = this.binary[t] == 1, n = t + (r3 ? 33 : 1), i = this.binary[n] == 1;
    return n += i ? 33 : 1, n;
  }
  getTargetStart() {
    return 2 + this.signatureLength + this.ownerLength;
  }
  getAnchorStart() {
    let t = this.getTargetStart() + 1, r3 = this.binary[this.getTargetStart()] == 1;
    return t += r3 ? 32 : 0, t;
  }
};
var yr = C2(z2(), 1);
function ge2(e, t, r3) {
  let n = t.publicKey, i = r3?.target ? yr.default.toBuffer(r3.target) : null, o = 1 + (i?.byteLength ?? 0), s = r3?.anchor ? Buffer.from(r3.anchor) : null, u2 = 1 + (s?.byteLength ?? 0), h2 = (r3?.tags?.length ?? 0) > 0 ? dt2(r3.tags) : null, p = 16 + (h2 ? h2.byteLength : 0), f = Buffer.from(e), c2 = f.byteLength, U2 = 2 + t.signatureLength + t.ownerLength + o + u2 + p + c2, l = Buffer.alloc(U2);
  if (l.set(Vt2(t.signatureType), 0), l.set(new Uint8Array(t.signatureLength).fill(0), 2), n.byteLength !== t.ownerLength)
    throw new Error(`Owner must be ${t.ownerLength} bytes, but was incorrectly ${n.byteLength}`);
  l.set(n, 2 + t.signatureLength);
  let R2 = 2 + t.signatureLength + t.ownerLength;
  if (l[R2] = i ? 1 : 0, i) {
    if (i.byteLength !== 32)
      throw new Error(`Target must be 32 bytes but was incorrectly ${i.byteLength}`);
    l.set(i, R2 + 1);
  }
  let G2 = R2 + o, Y2 = G2 + 1;
  if (l[G2] = s ? 1 : 0, s) {
    if (Y2 += s.byteLength, s.byteLength !== 32)
      throw new Error("Anchor must be 32 bytes");
    l.set(s, G2 + 1);
  }
  l.set(xt2(r3?.tags?.length ?? 0), Y2);
  let wr = xt2(h2?.byteLength ?? 0);
  l.set(wr, Y2 + 8), h2 && l.set(h2, Y2 + 16);
  let dr = Y2 + p;
  return l.set(f, dr), new _(l);
}
var _t2 = { ...Lt };
globalThis.arbundles ??= _t2;
var wn = _t2;
var dn = _t2;

// src/client/browser/wallet.js
var { DataItem } = bundle_exports;
if (!globalThis.Buffer)
  globalThis.Buffer = import_buffer.Buffer;
function createDataItemSigner(arweaveWallet) {
  const signer = async ({ data, tags, target, anchor, createDataItem = (buf) => new DataItem(buf) }) => {
    const view = await arweaveWallet.signDataItem({ data, tags, target, anchor });
    const dataItem = createDataItem(import_buffer.Buffer.from(view));
    return {
      id: await dataItem.id,
      raw: await dataItem.getRaw()
    };
  };
  return signer;
}

// src/index.browser.js
var GATEWAY_URL = globalThis.GATEWAY_URL || void 0;
var MU_URL = globalThis.MU_URL || void 0;
var CU_URL = globalThis.CU_URL || void 0;
var GRAPHQL_URL = globalThis.GRAPHQL_URL || void 0;
var { result, results, message, spawn, monitor, unmonitor, dryrun, assign } = connect({ GATEWAY_URL, MU_URL, CU_URL, GRAPHQL_URL });
var createDataItemSigner2 = wallet_exports.createDataItemSigner;
export {
  assign,
  connect,
  createDataItemSigner2 as createDataItemSigner,
  dryrun,
  message,
  monitor,
  result,
  results,
  spawn,
  unmonitor
};
/*! Bundled license information:

ieee754/index.js:
  (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)

buffer/index.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)

warp-arbundles/build/web/esm/bundle.js:
  (*! Bundled license information:
  
  ieee754/index.js:
    (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)
  
  buffer/index.js:
    (*!
     * The buffer module from node.js, for the browser.
     *
     * @author   Feross Aboukhadijeh <https://feross.org>
     * @license  MIT
     *)
  *)
*/
