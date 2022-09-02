'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function DateFormat(_ref) {
  var date = _ref.date;
  return {
    weekday: new Date(date).toLocaleDateString('en-US', {
      weekday: 'long'
    })
  };
}

exports["default"] = DateFormat;
