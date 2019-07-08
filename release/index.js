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
	display: 'inline-block',
	width: '90%',
	padding: '0.375rem 0.75rem',
	lineHeight: '1.5',
	backgroundColor: '#fff',
	backgroundClip: 'padding-box',
	border: '1px solid #ced4da',
	borderRadius: '0.25rem',
	transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out'
};

var $ = function $(id) {
	return document.getElementById(id);
};

var setProps = function setProps(_ref) {
	var _ref$lang = _ref.lang,
	    lang = _ref$lang === undefined ? 'cn' : _ref$lang,
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
	    type = _ref.type,
	    _ref$withdefaultCSS = _ref.withdefaultCSS,
	    withdefaultCSS = _ref$withdefaultCSS === undefined ? true : _ref$withdefaultCSS;
	return {
		lang: lang,
		showClear: showClear,
		showEye: showEye,
		showHint: showHint,
		showHelp: showHelp,
		showAutofix: showAutofix,
		placeholder: placeholder,
		isMust: isMust,
		type: type,
		withdefaultCSS: withdefaultCSS
	};
};

var init = function init(id, properties) {
	var input = document.createElement('input');
	var prop = setProps(properties || {});
	$(id).appendChild(input);

	// 绑定一个class
	$(id).childNodes[0].className = 'form-check-input';

	// 设置css
	setCss(input, deaultStyle, prop.withdefaultCSS);

	// 设置placeholder
	input.placeholder = prop.placeholder;

	// 绑定监听输入
	var inputText = watchTyping(id, prop);
	console.log('\u76EE\u524D\u7684\u503C\u662F' + inputText);

	// 展示eye
	drawMust(id, prop);
};

var setCss = function setCss(obj, style, shouldGetCSS) {
	if (shouldGetCSS) {
		for (var attr in style) {
			obj.style[attr] = style[attr];
		}
	}
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

		// 检查格式
		var formatRes = formatTest(proxyInput.text, prop);
		console.log(prop.type + '+' + formatRes);

		// 渲染hint
		return proxyInput.text;
	});
};

var formatTest = function formatTest(val, prop) {
	var res = void 0;
	switch (prop.type) {
		case 'email':
			res = regEmail.test(val);
			break;
		case 'phone':
			res = regPhone.test(val);
			break;
		case 'web':
			res = regWeb.test(val);
			break;
		case 'password':
			res = deaultPassword.test(val);
			break;
		default:
			res = true;
			break;
	}
	return res;
};

var drawMust = function drawMust(id, prop) {
	if (prop.isMust) {
		console.log('draw must');
		var must = document.createElement('span');
		must.innerHTML = "*";
		must.style.color = "red";
		must.style.margin = "0 0 0 5px";
		$(id).appendChild(must);
	}
};

exports.init = init;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.js.map
