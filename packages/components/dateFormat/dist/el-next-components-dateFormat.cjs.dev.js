'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Date formatter
 * @alpha
 *
 */
var DateFormat = function DateFormat(_ref) {
  var date = _ref.date;
  return {
    weekday: new Date(date).toLocaleDateString('en-US', {
      weekday: 'long'
    })
  };
};

exports.DateFormat = DateFormat;
