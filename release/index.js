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
	width: '80%',
	padding: '0.375rem 0.75rem',
	lineHeight: '1.5',
	backgroundColor: '#fff',
	backgroundClip: 'padding-box',
	border: '1px solid #ced4da',
	borderRadius: '0.25rem',
	transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out'
};

var svgEyeOpen = ['M512 608a96 96 0 1 1 0-192 96 96 0 0 1 0 192m0-256c-88.224 0-160 71.776-160 160s71.776 160 160 160 160-71.776 160-160-71.776-160-160-160', 'M512 800c-212.064 0-384-256-384-288s171.936-288 384-288 384 256 384 288-171.936 288-384 288m0-640C265.248 160 64 443.008 64 512c0 68.992 201.248 352 448 352s448-283.008 448-352c0-68.992-201.248-352-448-352'];

var svgClear = ['M512 896C299.936 896 128 724.064 128 512S299.936 128 512 128s384 171.936 384 384-171.936 384-384 384m0-832C264.96 64 64 264.96 64 512s200.96 448 448 448 448-200.96 448-448S759.04 64 512 64', 'M665.376 313.376L512 466.752l-153.376-153.376-45.248 45.248L466.752 512l-153.376 153.376 45.248 45.248L512 557.248l153.376 153.376 45.248-45.248L557.248 512l153.376-153.376z'];

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
	    _ref$mustPosition = _ref.mustPosition,
	    mustPosition = _ref$mustPosition === undefined ? 'left' : _ref$mustPosition,
	    type = _ref.type,
	    userPassword = _ref.userPassword,
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
		mustPosition: mustPosition,
		type: type,
		userPassword: userPassword,
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
	var eyeRes = isShowEye(id, prop);

	// 切换Eye
	switchEye(id, prop, eyeRes);

	// 展示clear
	drawClear(id, prop);

	// 是否必填
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

		// TODO: 渲染hint
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

var isShowEye = function isShowEye(id, prop) {
	// 需要是密码才显示。
	var defaultType = $(id).childNodes[0].type;
	if (prop.type === 'password' || prop.userPassword || defaultType === 'password') {
		$(id).querySelector('input').type = 'password';
		$(id).querySelector('input').autocomplete = 'on';
		if (prop.showEye) {
			drawEye(id, prop);
			return true;
		}
	} else {
		return false;
	}
};

var switchEye = function switchEye(id, prop, showEyeRes) {
	var svgList = $(id).querySelectorAll('svg');
	console.log(svgList);
	if (svgList.length > 0) {
		svgList[0].addEventListener('click', function () {
			if (showEyeRes) {
				showEyeRes = !showEyeRes;
				$(id).querySelector('input').type = 'text';
			} else {
				showEyeRes = !showEyeRes;
				$(id).querySelector('input').type = 'password';
			}
		});
	} else {
		console.log('no svg');
	}
};

var drawEye = function drawEye(id, prop) {
	var svgEyeInput = svgEyeOpen;
	if (prop.showEye) {
		if (prop.showClear) {
			if (prop.isMust) {
				if (prop.mustPosition === 'right') {
					drawSVG(id, svgEyeInput, '80px');
				} else if (prop.mustPosition === 'left') {
					drawSVG(id, svgEyeInput, '60px');
				}
			} else {
				drawSVG(id, svgEyeInput, '80px');
			}
		} else {
			if (prop.isMust) {
				if (prop.mustPosition === 'right') {
					drawSVG(id, svgEyeInput, '65px');
				} else if (prop.mustPosition === 'left') {
					drawSVG(id, svgEyeInput, '40px');
				}
			} else {
				drawSVG(id, svgEyeInput, '60px');
			}
		}
	}
};

var drawClear = function drawClear(id, prop) {
	if (prop.showClear) {
		if (prop.isMust && prop.mustPosition === 'right') {
			drawSVG(id, svgClear, '60px');
		} else if (prop.isMust && prop.mustPosition === 'left') {
			drawSVG(id, svgClear, '45px');
		} else if (!prop.isMust) {
			drawSVG(id, svgClear, '60px');
		}
		var svgList = $(id).querySelectorAll('svg');
		svgList[svgList.length - 1].addEventListener('click', function () {
			$(id).querySelector('input').value = '';
		});
	}
};

var drawMust = function drawMust(id, prop) {
	if (prop.isMust) {
		console.log('draw must');
		var must = document.createElement('span');
		must.innerHTML = '*';
		must.style.color = 'red';
		must.style.margin = '0 5px';
		switch (prop.mustPosition) {
			case 'left':
				var inputNode = $(id).childNodes[0];
				$(id).insertBefore(must, inputNode);
				break;
			case 'right':
				$(id).appendChild(must);
				break;
		}
	}
};

var drawSVG = function drawSVG(id, svgProp, distanceToRight) {
	var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	svg.setAttribute('width', '18');
	svg.setAttribute('height', '18');
	svg.setAttribute('viewBox', '0 0 1024 1024');
	svg.setAttribute('version', '1.1');
	svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

	var path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	path1.setAttribute('d', svgProp[0]);
	path1.setAttribute('fill', '#000');

	var path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	path2.setAttribute('d', svgProp[1]);
	path2.setAttribute('fill', '#000');

	svg.appendChild(path1);
	svg.appendChild(path2);
	$(id).appendChild(svg);

	$(id).style.position = 'relative';
	svg.style.position = 'absolute';
	svg.style.top = '8px';
	svg.style.right = distanceToRight;
};

exports.init = init;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.js.map
