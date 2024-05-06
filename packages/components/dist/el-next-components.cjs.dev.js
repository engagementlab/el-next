'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var blockRenderers_dist_elNextComponentsBlockRenderers = require('../blockRenderers/dist/el-next-components-blockRenderers.cjs.dev.js');
var button_dist_elNextComponentsButton = require('../button/dist/el-next-components-button.cjs.dev.js');
var dateFormat_dist_elNextComponentsDateFormat = require('../dateFormat/dist/el-next-components-dateFormat.cjs.dev.js');
var docRenderers_dist_elNextComponentsDocRenderers = require('../docRenderers/dist/el-next-components-docRenderers.cjs.dev.js');
var externalLink_dist_elNextComponentsExternalLink = require('../externalLink/dist/el-next-components-externalLink.cjs.dev.js');
var favicon_dist_elNextComponentsFavicon = require('../favicon/dist/el-next-components-favicon.cjs.dev.js');
var filtering_dist_elNextComponentsFiltering = require('../filtering/dist/el-next-components-filtering.cjs.dev.js');
var flexLayout_dist_elNextComponentsFlexLayout = require('../flexLayout/dist/el-next-components-flexLayout.cjs.dev.js');
var headingStyle_dist_elNextComponentsHeadingStyle = require('../headingStyle/dist/el-next-components-headingStyle.cjs.dev.js');
require('react');
var Head = require('next/head');
var framerMotion = require('framer-motion');
var image_dist_elNextComponentsImage = require('../image/dist/el-next-components-image.cjs.dev.js');
var video_v2_dist_elNextComponentsVideo_v2 = require('../video.v2/dist/el-next-components-video.v2.cjs.dev.js');
require('cross-fetch/polyfill');
var client = require('@apollo/client');
var errors = require('@apollo/client/errors');
var jsxRuntime = require('react/jsx-runtime');
require('next/link');
require('react-scroll');
require('@el-next/components/flexLayout');
require('@el-next/components/headingStyle');
require('./unsupportedIterableToArray-ac28611a.cjs.dev.js');
require('./objectSpread2-c088c990.cjs.dev.js');
require('zustand');
require('zustand/middleware');
require('lodash');
require('@cloudinary/url-gen');
require('@cloudinary/react');
require('./slicedToArray-11a666de.cjs.dev.js');
require('next/image');
require('react-dom');
require('react-player/lazy');
require('screenfull');
require('@mui/material/Box');
require('@mui/material/Slider');
require('@mui/material');
require('@mui/icons-material/ClosedCaption');
require('@mui/icons-material/ClosedCaptionDisabled');
require('@mui/icons-material/Fullscreen');
require('@mui/icons-material/PlayCircleFilled');
require('@mui/icons-material/PauseCircleFilled');
require('@mui/icons-material/VolumeUp');
require('@mui/icons-material/VolumeMute');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var Head__default = /*#__PURE__*/_interopDefault(Head);

var defaultPgTransitions = {
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
    error = _ref.error,
    transitions = _ref.transitions,
    ogDescription = _ref.ogDescription,
    ogTitle = _ref.ogTitle,
    ogImage = _ref.ogImage,
    ogUrl = _ref.ogUrl;
  var variants = transitions && transitions.variants ? transitions.variants : defaultPgTransitions;
  var transition = transitions && transitions.transition ? transitions.transition : {
    type: 'linear'
  };
  var errorHelper = "Sorry, we're unable to retrieve content at this time due to a connection error. ";
  if (error) {
    if (error["class"] === ErrorClass.noconnection) errorHelper += '🔌 It is most likely that the CMS is currently unavailable. Please try again.';else if (error["class"] === ErrorClass.syntax) errorHelper = 'It looks like there is a syntax error in the query. 🐛 This is a bug in code.';else if (error["class"] === ErrorClass.empty) errorHelper = "One or more of the required content fields on this page is missing. \"(".concat(error.message, ")\"");else if (error["class"] === ErrorClass.client) errorHelper = "There is an error on the client query. \uD83D\uDC1B This is a bug in code. \n\n \uD83D\uDCAC The API says: ".concat(error.message, "\"");else errorHelper += '. Please try again.  🤨 ';
  }
  return /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
    children: [/*#__PURE__*/jsxRuntime.jsxs(Head__default["default"], {
      children: [/*#__PURE__*/jsxRuntime.jsx("title", {
        children: title
      }), process.env.NODE_ENV !== 'production' || process.env.NEXT_PUBLIC_STAGING === 'true' && /*#__PURE__*/jsxRuntime.jsx("meta", {
        name: "robots",
        content: "noindex"
      }), /*#__PURE__*/jsxRuntime.jsx("meta", {
        name: "viewport",
        content: "initial-scale=1.0, width=device-width"
      }), /*#__PURE__*/jsxRuntime.jsx("meta", {
        name: "description",
        content: description
      }), /*#__PURE__*/jsxRuntime.jsx("meta", {
        property: "og:title",
        content: ogTitle || title
      }), /*#__PURE__*/jsxRuntime.jsx("meta", {
        property: "og:description",
        content: ogDescription || description
      }), /*#__PURE__*/jsxRuntime.jsx("meta", {
        property: "og:url",
        content: ogUrl
      }), /*#__PURE__*/jsxRuntime.jsx("meta", {
        property: "og:type",
        content: "website"
      }), ogImage && /*#__PURE__*/jsxRuntime.jsx("meta", {
        property: "og:image",
        content: ogImage
      }), /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
        children: [/*#__PURE__*/jsxRuntime.jsx("link", {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/favicon/apple-touch-icon.png"
        }), /*#__PURE__*/jsxRuntime.jsx("link", {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon/favicon-32x32.png"
        }), /*#__PURE__*/jsxRuntime.jsx("link", {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon/favicon-16x16.png"
        }), /*#__PURE__*/jsxRuntime.jsx("link", {
          rel: "manifest",
          href: "/favicon/site.webmanifest"
        }), /*#__PURE__*/jsxRuntime.jsx("link", {
          rel: "mask-icon",
          href: "/favicon/safari-pinned-tab.svg",
          color: "#5bbad5"
        }), /*#__PURE__*/jsxRuntime.jsx("meta", {
          name: "apple-mobile-web-app-title",
          content: title
        }), /*#__PURE__*/jsxRuntime.jsx("meta", {
          name: "application-name",
          content: title
        }), /*#__PURE__*/jsxRuntime.jsx("meta", {
          name: "msapplication-TileColor",
          content: "#ffc40d"
        }), /*#__PURE__*/jsxRuntime.jsx("meta", {
          name: "theme-color",
          content: "#ffffff"
        })]
      })]
    }), error && process.env.NODE_ENV !== 'production' ? /*#__PURE__*/jsxRuntime.jsxs("div", {
      className: "m-40 p-10 border-4 border-[#00ab9e] bg-[#00ab9e80] text-white",
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
        src: "https://res.cloudinary.com/engagement-lab-home/image/upload/c_scale,f_auto,w_200/v1699550434/github/logo-api.png",
        className: "max-w-[200px] mt-5"
      })]
    }) : /*#__PURE__*/jsxRuntime.jsx(framerMotion.motion.main, {
      initial: "hidden",
      animate: "enter",
      exit: "exit",
      variants: variants,
      transition: transition,
      children: children
    })]
  });
};

function _regeneratorRuntime() {
  _regeneratorRuntime = function () {
    return e;
  };
  var t,
    e = {},
    r = Object.prototype,
    n = r.hasOwnProperty,
    o = Object.defineProperty || function (t, e, r) {
      t[e] = r.value;
    },
    i = "function" == typeof Symbol ? Symbol : {},
    a = i.iterator || "@@iterator",
    c = i.asyncIterator || "@@asyncIterator",
    u = i.toStringTag || "@@toStringTag";
  function define(t, e, r) {
    return Object.defineProperty(t, e, {
      value: r,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), t[e];
  }
  try {
    define({}, "");
  } catch (t) {
    define = function (t, e, r) {
      return t[e] = r;
    };
  }
  function wrap(t, e, r, n) {
    var i = e && e.prototype instanceof Generator ? e : Generator,
      a = Object.create(i.prototype),
      c = new Context(n || []);
    return o(a, "_invoke", {
      value: makeInvokeMethod(t, r, c)
    }), a;
  }
  function tryCatch(t, e, r) {
    try {
      return {
        type: "normal",
        arg: t.call(e, r)
      };
    } catch (t) {
      return {
        type: "throw",
        arg: t
      };
    }
  }
  e.wrap = wrap;
  var h = "suspendedStart",
    l = "suspendedYield",
    f = "executing",
    s = "completed",
    y = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var p = {};
  define(p, a, function () {
    return this;
  });
  var d = Object.getPrototypeOf,
    v = d && d(d(values([])));
  v && v !== r && n.call(v, a) && (p = v);
  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
  function defineIteratorMethods(t) {
    ["next", "throw", "return"].forEach(function (e) {
      define(t, e, function (t) {
        return this._invoke(e, t);
      });
    });
  }
  function AsyncIterator(t, e) {
    function invoke(r, o, i, a) {
      var c = tryCatch(t[r], t, o);
      if ("throw" !== c.type) {
        var u = c.arg,
          h = u.value;
        return h && "object" == typeof h && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
          invoke("next", t, i, a);
        }, function (t) {
          invoke("throw", t, i, a);
        }) : e.resolve(h).then(function (t) {
          u.value = t, i(u);
        }, function (t) {
          return invoke("throw", t, i, a);
        });
      }
      a(c.arg);
    }
    var r;
    o(this, "_invoke", {
      value: function (t, n) {
        function callInvokeWithMethodAndArg() {
          return new e(function (e, r) {
            invoke(t, n, e, r);
          });
        }
        return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(e, r, n) {
    var o = h;
    return function (i, a) {
      if (o === f) throw Error("Generator is already running");
      if (o === s) {
        if ("throw" === i) throw a;
        return {
          value: t,
          done: !0
        };
      }
      for (n.method = i, n.arg = a;;) {
        var c = n.delegate;
        if (c) {
          var u = maybeInvokeDelegate(c, n);
          if (u) {
            if (u === y) continue;
            return u;
          }
        }
        if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
          if (o === h) throw o = s, n.arg;
          n.dispatchException(n.arg);
        } else "return" === n.method && n.abrupt("return", n.arg);
        o = f;
        var p = tryCatch(e, r, n);
        if ("normal" === p.type) {
          if (o = n.done ? s : l, p.arg === y) continue;
          return {
            value: p.arg,
            done: n.done
          };
        }
        "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
      }
    };
  }
  function maybeInvokeDelegate(e, r) {
    var n = r.method,
      o = e.iterator[n];
    if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
    var i = tryCatch(o, e.iterator, r.arg);
    if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
    var a = i.arg;
    return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
  }
  function pushTryEntry(t) {
    var e = {
      tryLoc: t[0]
    };
    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
  }
  function resetTryEntry(t) {
    var e = t.completion || {};
    e.type = "normal", delete e.arg, t.completion = e;
  }
  function Context(t) {
    this.tryEntries = [{
      tryLoc: "root"
    }], t.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(e) {
    if (e || "" === e) {
      var r = e[a];
      if (r) return r.call(e);
      if ("function" == typeof e.next) return e;
      if (!isNaN(e.length)) {
        var o = -1,
          i = function next() {
            for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
            return next.value = t, next.done = !0, next;
          };
        return i.next = i;
      }
    }
    throw new TypeError(typeof e + " is not iterable");
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), o(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
    var e = "function" == typeof t && t.constructor;
    return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
  }, e.mark = function (t) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
  }, e.awrap = function (t) {
    return {
      __await: t
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
    return this;
  }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
    void 0 === i && (i = Promise);
    var a = new AsyncIterator(wrap(t, r, n, o), i);
    return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
      return t.done ? t.value : a.next();
    });
  }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
    return this;
  }), define(g, "toString", function () {
    return "[object Generator]";
  }), e.keys = function (t) {
    var e = Object(t),
      r = [];
    for (var n in e) r.push(n);
    return r.reverse(), function next() {
      for (; r.length;) {
        var t = r.pop();
        if (t in e) return next.value = t, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, e.values = values, Context.prototype = {
    constructor: Context,
    reset: function (e) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
    },
    stop: function () {
      this.done = !0;
      var t = this.tryEntries[0].completion;
      if ("throw" === t.type) throw t.arg;
      return this.rval;
    },
    dispatchException: function (e) {
      if (this.done) throw e;
      var r = this;
      function handle(n, o) {
        return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
      }
      for (var o = this.tryEntries.length - 1; o >= 0; --o) {
        var i = this.tryEntries[o],
          a = i.completion;
        if ("root" === i.tryLoc) return handle("end");
        if (i.tryLoc <= this.prev) {
          var c = n.call(i, "catchLoc"),
            u = n.call(i, "finallyLoc");
          if (c && u) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          } else if (c) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
          } else {
            if (!u) throw Error("try statement without catch or finally");
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          }
        }
      }
    },
    abrupt: function (t, e) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var o = this.tryEntries[r];
        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
          var i = o;
          break;
        }
      }
      i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
      var a = i ? i.completion : {};
      return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
    },
    complete: function (t, e) {
      if ("throw" === t.type) throw t.arg;
      return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
    },
    finish: function (t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
      }
    },
    catch: function (t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.tryLoc === t) {
          var n = r.completion;
          if ("throw" === n.type) {
            var o = n.arg;
            resetTryEntry(r);
          }
          return o;
        }
      }
      throw Error("illegal catch attempt");
    },
    delegateYield: function (e, r, n) {
      return this.delegate = {
        iterator: values(e),
        resultName: r,
        nextLoc: n
      }, "next" === this.method && (this.arg = t), y;
    }
  }, e;
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
// import { capitalCase } from 'change-case';

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
          if (!isEmpty) {
            _context.next = 8;
            break;
          }
          // Capitalize keys in query string that errored, if any
          error = {
            "class": ErrorClass.empty,
            message: Object.keys(result.data).map(function (key) {
              return key;
            }).join(', ')
          };
          return _context.abrupt("return", {
            error: error
          });
        case 8:
          return _context.abrupt("return", result.data[name]);
        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          if (_context.t0 instanceof errors.ApolloError) {
            if (_context.t0.networkError && _context.t0.networkError.result !== undefined && _context.t0.networkError.result['errors']) {
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

          // If not dev, we need to throw error so build would fail
          if (!(process.env.NODE_ENV !== 'development')) {
            _context.next = 16;
            break;
          }
          throw new Error(_error.message);
        case 16:
          return _context.abrupt("return", {
            error: _error
          });
        case 17:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 11]]);
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
exports.Video = video_v2_dist_elNextComponentsVideo_v2.Video;
exports.ErrorClass = ErrorClass;
exports.Layout = Layout;
exports.Query = Query;
