/**
    * @name form-check-input
    * @description
    * @author Alfxjx
    * @email xjxtju@163.com
    */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.formCheck = {})));
}(this, (function (exports) { 'use strict';

console.log('welcome to use formCheck!');

var $ = function $(id) {
  return document.getElementById(id);
};

var setProps = function setProps(_ref) {
  var _ref$lang = _ref.lang,
      lang = _ref$lang === undefined ? "en" : _ref$lang,
      _ref$showClear = _ref.showClear,
      showClear = _ref$showClear === undefined ? false : _ref$showClear,
      _ref$showEye = _ref.showEye,
      showEye = _ref$showEye === undefined ? false : _ref$showEye,
      _ref$showHint = _ref.showHint,
      showHint = _ref$showHint === undefined ? true : _ref$showHint,
      _ref$showHelp = _ref.showHelp,
      showHelp = _ref$showHelp === undefined ? false : _ref$showHelp,
      _ref$showAutofix = _ref.showAutofix,
      showAutofix = _ref$showAutofix === undefined ? false : _ref$showAutofix,
      _ref$placeholder = _ref.placeholder,
      placeholder = _ref$placeholder === undefined ? "please input" : _ref$placeholder,
      _ref$isMust = _ref.isMust,
      isMust = _ref$isMust === undefined ? false : _ref$isMust,
      _ref$isPhone = _ref.isPhone,
      isPhone = _ref$isPhone === undefined ? false : _ref$isPhone,
      _ref$isWeb = _ref.isWeb,
      isWeb = _ref$isWeb === undefined ? false : _ref$isWeb,
      _ref$isEmail = _ref.isEmail,
      isEmail = _ref$isEmail === undefined ? false : _ref$isEmail;
  return {
    lang: lang,
    showClear: showClear,
    showEye: showEye,
    showHint: showHint,
    showHelp: showHelp,
    showAutofix: showAutofix,
    placeholder: placeholder,
    isMust: isMust,
    isPhone: isPhone,
    isWeb: isWeb,
    isEmail: isEmail
  };
};

var init = function init(id, properties) {
  // console.log('welcome to use form-check');
  var input = document.createElement('input');
  var prop = setProps(properties || {});
  $(id).appendChild(input);
  input.placeholder = prop.placeholder;
};

exports.init = init;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.js.map
