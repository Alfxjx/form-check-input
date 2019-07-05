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

var regEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
var regPhone = /^[1][3,4,5,7,8][0-9]{9}$/;
var regWeb = /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/;
var deaultPassword = /^[a-zA-Z0-9]\w{5,17}$/;

var deaultStyle = {
	display: 'block',
	width: '100%',
	padding: '0.375rem 0.75rem',
	lineHeight: '1.5',
	backgroundColor: '#fff',
	backgroundClip: 'padding-box',
	border: '1px solid #ced4da',
	borderRadius: '0.25rem',
	transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out'
};

var setCss = function setCss(obj, style) {
	for (var attr in style) {
		obj.style[attr] = style[attr];
	}
};

var $ = function $(id) {
	return document.getElementById(id);
};

var setProps = function setProps(_ref) {
	var _ref$lang = _ref.lang,
	    lang = _ref$lang === undefined ? 'en' : _ref$lang,
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
	    placeholder = _ref$placeholder === undefined ? 'please input' : _ref$placeholder,
	    _ref$isMust = _ref.isMust,
	    isMust = _ref$isMust === undefined ? false : _ref$isMust,
	    _ref$isPhone = _ref.isPhone,
	    isPhone = _ref$isPhone === undefined ? false : _ref$isPhone,
	    _ref$isWeb = _ref.isWeb,
	    isWeb = _ref$isWeb === undefined ? false : _ref$isWeb,
	    _ref$isEmail = _ref.isEmail,
	    isEmail = _ref$isEmail === undefined ? false : _ref$isEmail,
	    _ref$isPassword = _ref.isPassword,
	    isPassword = _ref$isPassword === undefined ? false : _ref$isPassword;
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
		isEmail: isEmail,
		isPassword: isPassword
	};
};

var init = function init(id, properties) {
	var input = document.createElement('input');
	var prop = setProps(properties || {});
	$(id).appendChild(input);
	$(id).childNodes[0].className = 'form-check-input';
	setCss(input, deaultStyle);
	input.placeholder = prop.placeholder;
	var inputText = watchTyping(id, prop);
	console.log('\u76EE\u524D\u7684\u503C\u662F' + inputText);
	// formatTest(inputText, prop);
};

var watchTyping = function watchTyping(id, prop) {
	var inputNode = $(id).childNodes[0];
	var proxyInput = new Proxy(inputNode, {
		get: function get(target, key, receiver) {
			return Reflect.get(target, key, receiver);
		},
		set: function set(target, key, value, receiver) {
			if (key === 'text') {
				target[key] = value;
			}
			return Reflect.set(target, key, value, receiver);
		}
	});
	inputNode.addEventListener('keyup', function (e) {
		proxyInput.text = e.target.value;
		console.log('input:' + proxyInput.text);
		var formatRes = formatTest(proxyInput.text, prop);
		console.log(formatRes);
		return proxyInput.text;
	});
};

var formatTest = function formatTest(val, prop) {
	var res = {};
	if (prop.isPhone) {
		var phone = regPhone.test(val);
		console.log(phone);
		res['phone'] = phone;
	}
	if (prop.isEmail) {
		var email = regEmail.test(val);
		console.log(email);
		res['email'] = email;
	}
	if (prop.isWeb) {
		var web = regWeb.test(val);
		console.log(web);
		res['web'] = web;
	}
	if (prop.isPassword) {
		var password = deaultPassword.test(val);
		console.log(password);
		res['password'] = password;
	}
	return res;
};

exports.init = init;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.js.map
