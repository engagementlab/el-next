'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var blockRenderers_dist_elNextComponentsBlockRenderers = require('../blockRenderers/dist/el-next-components-blockRenderers.cjs.prod.js');
var button_dist_elNextComponentsButton = require('../button/dist/el-next-components-button.cjs.prod.js');
var dateFormat_dist_elNextComponentsDateFormat = require('../dateFormat/dist/el-next-components-dateFormat.cjs.prod.js');
var docRenderers_dist_elNextComponentsDocRenderers = require('../docRenderers/dist/el-next-components-docRenderers.cjs.prod.js');
var externalLink_dist_elNextComponentsExternalLink = require('../externalLink/dist/el-next-components-externalLink.cjs.prod.js');
var favicon_dist_elNextComponentsFavicon = require('../favicon/dist/el-next-components-favicon.cjs.prod.js');
var filtering_dist_elNextComponentsFiltering = require('../filtering/dist/el-next-components-filtering.cjs.prod.js');
var flexLayout_dist_elNextComponentsFlexLayout = require('../flexLayout/dist/el-next-components-flexLayout.cjs.prod.js');
var headingStyle_dist_elNextComponentsHeadingStyle = require('../headingStyle/dist/el-next-components-headingStyle.cjs.prod.js');
require('react');
var Head = require('next/head');
var framerMotion = require('framer-motion');
var image_dist_elNextComponentsImage = require('../image/dist/el-next-components-image.cjs.prod.js');
var video_dist_elNextComponentsVideo = require('../video/dist/el-next-components-video.cjs.prod.js');
require('cross-fetch/polyfill');
var client = require('@apollo/client');
var errors = require('@apollo/client/errors');
var changeCase = require('change-case');
var jsxRuntime = require('react/jsx-runtime');
require('next/link');
require('@el-next/components/flexLayout');
require('@el-next/components/headingStyle');
require('./unsupportedIterableToArray-42309462.cjs.prod.js');
require('zustand');
require('zustand/middleware');
require('lodash');
require('@cloudinary/url-gen');
require('@cloudinary/react');
require('next/image');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var Head__default = /*#__PURE__*/_interopDefault(Head);

var variants = {
  hidden: {
    opacity: 0
  },
  enter: {
    opacity: 1
  },
  exit: {
    opacity: 0
  }
};
var Layout = function Layout(_ref) {
  var children = _ref.children,
    title = _ref.title,
    description = _ref.description,
    error = _ref.error;
  var errorHelper = "Sorry, we're unable to retrieve content at this time due to a connection error. ";
  if (error) {
    console.log(error);
    if (error["class"] === ErrorClass.noconnection) errorHelper += '🔌 It is most likely that the CMS is currently unavailable. Please try again.';else if (error["class"] === ErrorClass.syntax) errorHelper = 'It looks like there is a syntax error in the query. 🐛 This is a bug in code.';else if (error["class"] === ErrorClass.empty) errorHelper = "One or more of the required content fields on this page is missing. \"(".concat(error.message, ")\"");else if (error["class"] === ErrorClass.client) errorHelper = "There is an error on the client query. \uD83D\uDC1B This is a bug in code. \n\n \uD83D\uDCAC The API says: ".concat(error.message, "\"");else errorHelper += '. Please try again.  🤨 ';
  }
  return /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
    children: [/*#__PURE__*/jsxRuntime.jsxs(Head__default["default"], {
      children: [/*#__PURE__*/jsxRuntime.jsx("title", {
        children: title
      }),         "production" !== 'production' , /*#__PURE__*/jsxRuntime.jsx("meta", {
        name: "viewport",
        content: "initial-scale=1.0, width=device-width"
      }), /*#__PURE__*/jsxRuntime.jsx("meta", {
        name: "description",
        content: description
      }), /*#__PURE__*/jsxRuntime.jsx(favicon_dist_elNextComponentsFavicon.Favicon, {})]
    }), error &&         "production" !== 'production' ? /*#__PURE__*/jsxRuntime.jsxs("div", {
      className: "m-40 p-10 border-4 border-[#00ab9e]",
      children: [/*#__PURE__*/jsxRuntime.jsxs("svg", {
        viewBox: "0 0 50 50",
        className: "max-w-[105px]",
        children: [/*#__PURE__*/jsxRuntime.jsx("circle", {
          style: {
            fill: '#D75A4A'
          },
          cx: "25",
          cy: "25",
          r: "25"
        }), /*#__PURE__*/jsxRuntime.jsx("polyline", {
          style: {
            fill: 'none',
            stroke: '#FFFFFF',
            strokeWidth: 2,
            strokeLinecap: 'round',
            strokeMiterlimit: 10
          },
          points: "16,34 25,25 34,16  "
        }), /*#__PURE__*/jsxRuntime.jsx("polyline", {
          style: {
            fill: 'none',
            stroke: '#FFFFFF',
            strokeWidth: 2,
            strokeLinecap: 'round',
            strokeMiterlimit: 10
          },
          points: "16,16 25,25 34,34  "
        })]
      }), /*#__PURE__*/jsxRuntime.jsx("h2", {
        className: "text-4xl font-bold",
        children: "Content Error"
      }), errorHelper, /*#__PURE__*/jsxRuntime.jsx("hr", {}), /*#__PURE__*/jsxRuntime.jsx("img", {
        src: "https://res.cloudinary.com/engagement-lab-home/image/upload/c_scale,f_auto,w_150/v1682526632/github/logo-api.png",
        className: "max-w-[150px]"
      })]
    }) : /*#__PURE__*/jsxRuntime.jsx(framerMotion.motion.main, {
      initial: "hidden",
      animate: "enter",
      exit: "exit",
      variants: variants,
      transition: {
        type: 'linear'
      },
      children: children
    })]
  });
};

function _regeneratorRuntime() {
  _regeneratorRuntime = function () {
    return exports;
  };
  var exports = {},
    Op = Object.prototype,
    hasOwn = Op.hasOwnProperty,
    defineProperty = Object.defineProperty || function (obj, key, desc) {
      obj[key] = desc.value;
    },
    $Symbol = "function" == typeof Symbol ? Symbol : {},
    iteratorSymbol = $Symbol.iterator || "@@iterator",
    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function (obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
      generator = Object.create(protoGenerator.prototype),
      context = new Context(tryLocsList || []);
    return defineProperty(generator, "_invoke", {
      value: makeInvokeMethod(innerFn, self, context)
    }), generator;
  }
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg,
          value = result.value;
        return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }
      reject(record.arg);
    }
    var previousPromise;
    defineProperty(this, "_invoke", {
      value: function (method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(innerFn, self, context) {
    var state = "suspendedStart";
    return function (method, arg) {
      if ("executing" === state) throw new Error("Generator is already running");
      if ("completed" === state) {
        if ("throw" === method) throw arg;
        return doneResult();
      }
      for (context.method = method, context.arg = arg;;) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }
        if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
          if ("suspendedStart" === state) throw state = "completed", context.arg;
          context.dispatchException(context.arg);
        } else "return" === context.method && context.abrupt("return", context.arg);
        state = "executing";
        var record = tryCatch(innerFn, self, context);
        if ("normal" === record.type) {
          if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
          return {
            value: record.arg,
            done: context.done
          };
        }
        "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
      }
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var methodName = context.method,
      method = delegate.iterator[methodName];
    if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }
  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
            return next.value = undefined, next.done = !0, next;
          };
        return next.next = next;
      }
    }
    return {
      next: doneResult
    };
  }
  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), defineProperty(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (val) {
    var object = Object(val),
      keys = [];
    for (var key in object) keys.push(key);
    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
    },
    stop: function () {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) throw exception;
      var context = this;
      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
          record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
            hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function (record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    catch: function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}

function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }
  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}

var _templateObject;
var apollo = new client.ApolloClient({
  uri: process.env.GRAPHQL_APP ? "https://cms.elab.emerson.edu/".concat(process.env.GRAPHQL_APP, "/api/graphql") : 'http://localhost:3000/api/graphql',
  cache: new client.InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore'
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all'
    }
  }
});
var Query = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(name, queryStr) {
    var result, isEmpty, error, _error, gqlErr;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return apollo.query({
            query: client.gql(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n            query \n            {\n                ", "\n            }\n      "])), queryStr)
          });
        case 3:
          result = _context.sent;
          // Is entire response empty?
          isEmpty = Object.values(result.data).every(function (x) {
            return null === x || x.length === 0;
          });
          console.log(result);
          if (!isEmpty) {
            _context.next = 9;
            break;
          }
          error = {
            "class": ErrorClass.empty,
            message: Object.keys(result.data).map(function (key) {
              return changeCase.capitalCase(key);
            }).join(', ')
          };
          return _context.abrupt("return", {
            error: error
          });
        case 9:
          return _context.abrupt("return", result.data[name]);
        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          if (_context.t0 instanceof errors.ApolloError) {
            // console.log('1', (err.networkError as ServerError).result['errors']);
            if (_context.t0.networkError && _context.t0.networkError.result !== undefined) {
              _error = {
                "class": ErrorClass.client,
                message: _context.t0.networkError.result['errors'].map(function (e) {
                  return e.message;
                })
              };
            } else _error = {
              "class": _context.t0.message.indexOf('ECONNREFUSED') > -1 ? ErrorClass.noconnection : ErrorClass.network,
              message: _context.t0.message
            };
          } else {
            gqlErr = _context.t0;
            _error = {
              "class": gqlErr.message.toLowerCase().indexOf('syntax') > -1 ? ErrorClass.syntax : ErrorClass.client,
              message: gqlErr.message
            };
          }
          // else if (err instanceof GraphQLError) {
          //   return {
          //     error: true,
          //     // type:
          //     message: err.message,
          //   };
          // }
          return _context.abrupt("return", {
            error: _error
          });
        case 16:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 12]]);
  }));
  return function Query(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var ErrorClass = /*#__PURE__*/function (ErrorClass) {
  ErrorClass[ErrorClass["client"] = 0] = "client";
  ErrorClass[ErrorClass["empty"] = 1] = "empty";
  ErrorClass[ErrorClass["network"] = 2] = "network";
  ErrorClass[ErrorClass["noconnection"] = 3] = "noconnection";
  ErrorClass[ErrorClass["query"] = 4] = "query";
  ErrorClass[ErrorClass["syntax"] = 5] = "syntax";
  return ErrorClass;
}({});

exports.BlockRenderers = blockRenderers_dist_elNextComponentsBlockRenderers.BlockRenderers;
exports.Button = button_dist_elNextComponentsButton.Button;
exports.DateFormat = dateFormat_dist_elNextComponentsDateFormat.DateFormat;
exports.DocRenderers = docRenderers_dist_elNextComponentsDocRenderers.DocRenderers;
exports.ExternalLink = externalLink_dist_elNextComponentsExternalLink.ExternalLink;
exports.Favicon = favicon_dist_elNextComponentsFavicon.Favicon;
exports.Filtering = filtering_dist_elNextComponentsFiltering["default"];
exports.FlexLayout = flexLayout_dist_elNextComponentsFlexLayout.FlexLayout;
exports.HeadingStyle = headingStyle_dist_elNextComponentsHeadingStyle.HeadingStyle;
exports.Image = image_dist_elNextComponentsImage["default"];
exports.ImageUrl = image_dist_elNextComponentsImage.ImageUrl;
exports.Video = video_dist_elNextComponentsVideo.Video;
exports.ErrorClass = ErrorClass;
exports.Layout = Layout;
exports.Query = Query;
