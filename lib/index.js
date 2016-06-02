'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.wrap = wrap;
exports.expose = expose;
exports.reduce = reduce;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function mapValues(obj, handler) {
  var result = {};
  Object.keys(obj).forEach(function (key) {
    result[key] = handler(obj[key], key);
  });
  return result;
}

function pick(obj, names) {
  var output = {};

  if (typeof names === 'function') {
    for (var _name in obj) {
      if (names(obj[_name], _name)) {
        output[_name] = obj[_name];
      }
    }
  } else {
    names.forEach(function (name) {
      output[name] = obj[name];
    });
  }

  return output;
}

function wrap(DeclarativeComponent) {
  var initialize = DeclarativeComponent.initialize;
  var _render = DeclarativeComponent.render;

  var reduceFunctions = pick(DeclarativeComponent, function (item, name) {
    return typeof item === 'function' && name !== 'render';
  });

  return _react2['default'].createClass({
    getInitialState: function getInitialState() {
      return initialize(this.props);
    },
    render: function render() {
      var _this = this;

      var reduceFunctionsAsProps = mapValues(reduceFunctions, function (fn, name) {
        return function () {
          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          var newState = fn.apply(undefined, [_this.props, _this.state].concat(args));
          _this.setState(newState);
          if (fn.expose === true && _this.props[name] !== undefined) {
            // TODO add picker
            var reduceFn = fn.reduce || function (x) {
              return x;
            };
            _this.props[name](reduceFn(newState));
          }
        };
      });

      var props = _extends({}, this.props, reduceFunctionsAsProps, {
        children: this.props.children
      });

      return _render(props, this.state);
    }
  });
}

function expose(fn) {
  fn.expose = true;
  return fn;
}

function reduce(fn, reduceFn) {
  fn.reduce = reduceFn;
  return fn;
}