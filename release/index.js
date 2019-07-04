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

console.log('test src');
var init = function init(id, props) {
	console.log('welcome to use form-check');
	var input = document.createElement('input');
	input.setAttribute("palceholder", props.placeholder);
	document.getElementById(id).appendChild(input);
};

exports.init = init;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.js.map
