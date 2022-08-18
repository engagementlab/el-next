'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var unsupportedIterableToArray = require('../../dist/unsupportedIterableToArray-7cc9ff15.cjs.dev.js');
require('react');
var create = require('zustand');
var middleware = require('zustand/middleware');
var _ = require('lodash');
var framerMotion = require('framer-motion');
var jsxRuntime = require('react/jsx-runtime');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var create__default = /*#__PURE__*/_interopDefault(create);
var ___default = /*#__PURE__*/_interopDefault(_);

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return unsupportedIterableToArray._arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || unsupportedIterableToArray._unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

var Filtering = /*#__PURE__*/function () {
  function Filtering(filtersGrouped, preSelectedFilters, items, ItemRenderer, mode) {
    var _this = this;

    _classCallCheck(this, Filtering);

    _defineProperty(this, "useStore", void 0);

    _defineProperty(this, "filtersGrouped", void 0);

    _defineProperty(this, "items", void 0);

    _defineProperty(this, "mode", void 0);

    _defineProperty(this, "ItemRenderer", void 0);

    _defineProperty(this, "FilteredItems", function () {
      var selectedFilters = _this.useStore(function (state) {
        return state.currentFilters;
      });

      var haveFilters = selectedFilters.length > 0;

      var reset = _this.useStore(function (state) {
        return state.reset;
      });

      var toggleFilter = _this.useStore(function (state) {
        return state.toggle;
      });

      var toggleFiltersOpen = _this.useStore(function (state) {
        return state.toggleFiltersOpen;
      });

      var filteredItems = _this.items.filter( // If selected filters empty, show all...
      function (item) {
        return selectedFilters.length === 0 || // ...otherwise, item's filters must match ALL selected filters
        ___default["default"].every(selectedFilters, function (r) {
          return ___default["default"].map(item.filters, 'key').indexOf(r) >= 0;
        });
      });

      var count = filteredItems.length; // Decide plural of item count

      var showing = "Showing ".concat(count, " ").concat(_this.mode === 'media' ? "Stor".concat(count === 1 ? 'y' : 'ies') : "Studio".concat(count === 1 ? '' : 's'));
      return /*#__PURE__*/jsxRuntime.jsxs("div", {
        className: "flex",
        children: [/*#__PURE__*/jsxRuntime.jsx("div", {
          className: "w-0 lg:w-1/5 flex-shrink-0 lg:border-r border-sorbet",
          children: _this.RenderFilters(_this.filtersGrouped)
        }), /*#__PURE__*/jsxRuntime.jsxs("div", {
          className: "w-full",
          children: [/*#__PURE__*/jsxRuntime.jsxs("div", {
            className: "lg:hidden inline-block w-full",
            children: [/*#__PURE__*/jsxRuntime.jsx("button", {
              className: "rounded-full my-4 px-8 py-5 w-full uppercase bg-purple text-white transition-all hover:opacity-75",
              onClick: function onClick(e) {
                toggleFiltersOpen(true);
                e.preventDefault();
              },
              children: "Open Filters"
            }), /*#__PURE__*/jsxRuntime.jsxs("a", {
              href: "#",
              className: "py-2 text-bluegreen mt-2 mb-4 text-right text-lg font-semibold",
              onClick: function onClick(e) {
                reset();
                e.preventDefault();
              },
              style: {
                display: !haveFilters ? 'none' : 'block'
              },
              children: [/*#__PURE__*/jsxRuntime.jsx("svg", {
                viewBox: "185.411 115.41 11 11",
                width: "11",
                height: "11",
                className: "my-1.5 mx-3 inline-block",
                children: /*#__PURE__*/jsxRuntime.jsx("path", {
                  d: "M 195.198 115.41 L 190.911 119.695 L 186.624 115.41 L 185.411 116.623 L 189.696 120.91 L 185.411 125.197 L 186.624 126.41 L 190.911 122.125 L 195.198 126.41 L 196.411 125.197 L 192.126 120.91 L 196.411 116.623 Z",
                  className: "fill-bluegreen"
                })
              }), "Clear Filters"]
            })]
          }), /*#__PURE__*/jsxRuntime.jsx("span", {
            className: "my-8 xl:my-4 uppercase w-full block text-right text-lg xl:text-sm font-semibold",
            children: showing
          }), /*#__PURE__*/jsxRuntime.jsx("div", {
            className: _this.mode === 'media' && count > 0 ? 'lg:ml-5 grid xl:grid-cols-3 xl:gap-3 lg:grid-cols-2 lg:gap-2' : '',
            children: count === 0 ? /*#__PURE__*/jsxRuntime.jsx("p", {
              className: "w-full text-xl my-20 text-center",
              children: "Sorry, no matches found. Please try other filters."
            }) : /*#__PURE__*/jsxRuntime.jsx(framerMotion.AnimatePresence, {
              children: filteredItems.map(function (item, i) {
                return /*#__PURE__*/jsxRuntime.jsx(_this.ItemRenderer, {
                  item: item,
                  toggleFilter: toggleFilter
                }, i);
              })
            })
          })]
        })]
      });
    });

    this.filtersGrouped = filtersGrouped;
    this.items = items;
    this.ItemRenderer = ItemRenderer;
    this.mode = mode; // Create store with Zustand

    this.useStore = create__default["default"](middleware.subscribeWithSelector(function (set) {
      return {
        // If defined, pre-populate filter store
        currentFilters: preSelectedFilters || [],
        filtersNavOpen: false,
        filterGroupsClosed: [],
        toggle: function toggle(filter) {
          return set(function (state) {
            return state.currentFilters.includes(filter) ? _objectSpread2(_objectSpread2({}, state), {}, {
              currentFilters: state.currentFilters.filter(function (e) {
                return e !== filter;
              })
            }) : _objectSpread2(_objectSpread2({}, state), {}, {
              currentFilters: [].concat(_toConsumableArray(state.currentFilters), [filter])
            });
          });
        },
        toggleFilterGroupClosed: function toggleFilterGroupClosed(filterGroupKey) {
          return set(function (state) {
            return state.filterGroupsClosed.includes(filterGroupKey) ? _objectSpread2(_objectSpread2({}, state), {}, {
              filterGroupsClosed: state.filterGroupsClosed.filter(function (e) {
                return e !== filterGroupKey;
              })
            }) : _objectSpread2(_objectSpread2({}, state), {}, {
              filterGroupsClosed: [].concat(_toConsumableArray(state.filterGroupsClosed), [filterGroupKey])
            });
          });
        },
        toggleFiltersOpen: function toggleFiltersOpen(open) {
          return set(function (state) {
            document.body.style.overflow = open ? 'hidden' : 'visible';
            if (open) window.scrollTo(0, 0);
            return _objectSpread2(_objectSpread2({}, state), {}, {
              filtersNavOpen: open
            });
          });
        },
        reset: function reset() {
          return set({
            currentFilters: []
          });
        }
      };
    }));
    this.useStore.subscribe(function (state) {
      return state.currentFilters;
    }, function (current) {
      history.replaceState({}, 'Filtered Data', "".concat(location.pathname, "?").concat(current.join('/')));
    });
  }

  _createClass(Filtering, [{
    key: "RenderFilters",
    value: function RenderFilters(filters) {
      // Store get/set
      var selectedFilters = this.useStore(function (state) {
        return state.currentFilters;
      });
      var filtersOpen = this.useStore(function (state) {
        return state.filtersNavOpen;
      });
      var filterGroupsClosed = this.useStore(function (state) {
        return state.filterGroupsClosed;
      });
      var haveFilters = selectedFilters.length > 0;

      var haveSpecificFilter = function haveSpecificFilter(key) {
        return ___default["default"].values(selectedFilters).includes(key);
      };

      var haveGroupClosed = function haveGroupClosed(key) {
        return filterGroupsClosed.includes(key);
      };

      var toggleFilter = this.useStore(function (state) {
        return state.toggle;
      });
      var toggleFilterGroupOpen = this.useStore(function (state) {
        return state.toggleFilterGroupClosed;
      });
      var toggleFiltersOpen = this.useStore(function (state) {
        return state.toggleFiltersOpen;
      });
      var reset = this.useStore(function (state) {
        return state.reset;
      });
      var linkClass = 'no-underline border-b-2 border-b-[rgba(2,102,112,0)] hover:border-b-[rgba(2,102,112,1)] transition-all';

      var menu = /*#__PURE__*/jsxRuntime.jsx("div", {
        children: Object.keys(filters).map(function (key) {
          return /*#__PURE__*/jsxRuntime.jsxs("div", {
            children: [/*#__PURE__*/jsxRuntime.jsx("a", {
              href: "#",
              className: "text-xl xl:text-base",
              onClick: function onClick(e) {
                toggleFilterGroupOpen(key);
                e.preventDefault();
              },
              children: /*#__PURE__*/jsxRuntime.jsxs("div", {
                className: "mt-4 flex items-center flex-shrink-0 flex-grow-0 uppercase",
                children: [/*#__PURE__*/jsxRuntime.jsx("svg", {
                  height: "10.0",
                  width: "14",
                  className: "inline transition-transform ".concat(haveGroupClosed(key) ? 'rotate-180' : ''),
                  children: /*#__PURE__*/jsxRuntime.jsx("polygon", {
                    points: "0,0 14,0 7.0,9.0",
                    style: {
                      'fill': '#8D33D2'
                    }
                  })
                }), /*#__PURE__*/jsxRuntime.jsx("span", {
                  className: "ml-2 text-coated text-lg xl:text-sm font-semibold",
                  children: key
                })]
              })
            }), /*#__PURE__*/jsxRuntime.jsx("ul", {
              className: "relative overflow-hidden transition-all ".concat(haveGroupClosed(key) ? 'max-h-0' : 'max-h-auto'),
              children: filters[key].map(function (filter) {
                return /*#__PURE__*/jsxRuntime.jsx("li", {
                  className: "text-lg xl:text-sm font-semibold my-8 xl:my-4\n                                                    ".concat(!haveSpecificFilter(filter.key) ? 'text-bluegreen' : 'text-purple'),
                  children: /*#__PURE__*/jsxRuntime.jsxs("a", {
                    href: "#",
                    onClick: function onClick(e) {
                      toggleFilter(filter.key);
                      e.preventDefault();
                    },
                    className: "w-full flex items-center justify-between",
                    children: [/*#__PURE__*/jsxRuntime.jsx("span", {
                      className: !haveSpecificFilter(filter.key) ? linkClass : '',
                      children: filter.name
                    }), /*#__PURE__*/jsxRuntime.jsx("svg", {
                      viewBox: "185.411 115.41 11 11",
                      width: "11",
                      height: "11",
                      className: "flex-shrink-0 mx-6",
                      style: {
                        visibility: !haveSpecificFilter(filter.key) ? 'hidden' : 'visible'
                      },
                      children: /*#__PURE__*/jsxRuntime.jsx("path", {
                        d: "M 195.198 115.41 L 190.911 119.695 L 186.624 115.41 L 185.411 116.623 L 189.696 120.91 L 185.411 125.197 L 186.624 126.41 L 190.911 122.125 L 195.198 126.41 L 196.411 125.197 L 192.126 120.91 L 196.411 116.623 Z",
                        className: "fill-purple"
                      })
                    })]
                  })
                }, filter.key);
              })
            })]
          }, key);
        })
      });

      return /*#__PURE__*/jsxRuntime.jsxs("div", {
        children: [/*#__PURE__*/jsxRuntime.jsxs("div", {
          className: "hidden lg:block",
          children: [/*#__PURE__*/jsxRuntime.jsxs("div", {
            className: "mr-4 flex justify-between",
            children: [/*#__PURE__*/jsxRuntime.jsx("span", {
              children: "Filters"
            }), /*#__PURE__*/jsxRuntime.jsx("a", {
              href: "#",
              className: "text-bluegreen",
              onClick: function onClick(e) {
                reset();
                e.preventDefault();
              },
              style: {
                visibility: !haveFilters ? 'hidden' : 'visible'
              },
              children: "Clear"
            })]
          }), menu]
        }), /*#__PURE__*/jsxRuntime.jsxs("div", {
          className: "lg:hidden block w-full absolute overflow-y-scroll top-0 left-0 h-full z-50 p-10 pt-20 bg-lynx\n                        transition-all ease-[cubic-bezier(0.075, 0.820, 0.165, 1.000)] duration-300 ".concat(filtersOpen ? '' : '-translate-y-full'),
          children: [/*#__PURE__*/jsxRuntime.jsxs("a", {
            className: "uppercase w-full flex justify-end cursor-pointer text-bluegreen",
            onClick: function onClick(e) {
              toggleFiltersOpen(false);
              e.preventDefault();
            },
            children: [/*#__PURE__*/jsxRuntime.jsx("svg", {
              viewBox: "185.411 115.41 11 11",
              width: "11",
              height: "11",
              className: "flex-shrink-0 my-1.5 mx-3",
              children: /*#__PURE__*/jsxRuntime.jsx("path", {
                d: "M 195.198 115.41 L 190.911 119.695 L 186.624 115.41 L 185.411 116.623 L 189.696 120.91 L 185.411 125.197 L 186.624 126.41 L 190.911 122.125 L 195.198 126.41 L 196.411 125.197 L 192.126 120.91 L 196.411 116.623 Z",
                className: "fill-bluegreen"
              })
            }), "Close Filters"]
          }), menu, /*#__PURE__*/jsxRuntime.jsx("button", {
            className: "my-4 w-full rounded-full px-8 py-5 uppercase bg-purple text-white transition-all hover:opacity-75",
            onClick: function onClick(e) {
              toggleFiltersOpen(false);
            },
            children: "Apply Filters"
          })]
        })]
      });
    }
  }]);

  return Filtering;
}();

exports["default"] = Filtering;
