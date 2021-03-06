console.log('welcome to use formCheck!');

const regEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
const regPhone = /^[1][3,4,5,7,8][0-9]{9}$/;
const regWeb = /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/;
const deaultPassword = /^[a-zA-Z0-9]\w{5,17}$/;

const deaultStyle = {
	display: 'inline-block',
	width: 'calc(100% - 60px)',
	padding: '0.375rem 0.75rem',
	lineHeight: '1.5',
	backgroundColor: '#fff',
	backgroundClip: 'padding-box',
	border: '1px solid #ced4da',
	borderRadius: '0.25rem',
	transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out',
};

let svgEyeInput = [];

const svgEyeClosed = [
	'M512 800c-66.112 0-128.32-24.896-182.656-60.096l94.976-94.976A156.256 156.256 0 0 0 512 672c88.224 0 160-71.776 160-160a156.256 156.256 0 0 0-27.072-87.68l101.536-101.536C837.28 398.624 896 493.344 896 512c0 32-171.936 288-384 288m96-288a96 96 0 0 1-96 96c-14.784 0-28.64-3.616-41.088-9.664l127.424-127.424c6.048 12.448 9.664 26.304 9.664 41.088M128 512c0-32 171.936-288 384-288 66.112 0 128.32 24.896 182.656 60.096L277.536 701.216C186.72 625.376 128 530.656 128 512m664.064-234.816l91.328-91.328-45.248-45.248-97.632 97.632C673.472 192.704 595.456 160 512 160 265.248 160 64 443.008 64 512c0 39.392 65.728 148.416 167.936 234.816l-91.328 91.328 45.248 45.248 97.632-97.632C350.528 831.296 428.544 864 512 864c246.752 0 448-283.008 448-352 0-39.392-65.728-148.416-167.936-234.816',
	'M512 352c-88.224 0-160 71.776-160 160 0 15.328 2.848 29.856 6.88 43.872l58.592-58.592a95.616 95.616 0 0 1 79.808-79.808l58.592-58.592A157.76 157.76 0 0 0 512 352',
];

const svgEyeOpen = [
	'M512 608a96 96 0 1 1 0-192 96 96 0 0 1 0 192m0-256c-88.224 0-160 71.776-160 160s71.776 160 160 160 160-71.776 160-160-71.776-160-160-160',
	'M512 800c-212.064 0-384-256-384-288s171.936-288 384-288 384 256 384 288-171.936 288-384 288m0-640C265.248 160 64 443.008 64 512c0 68.992 201.248 352 448 352s448-283.008 448-352c0-68.992-201.248-352-448-352',
];

const svgClear = [
	'M512 896C299.936 896 128 724.064 128 512S299.936 128 512 128s384 171.936 384 384-171.936 384-384 384m0-832C264.96 64 64 264.96 64 512s200.96 448 448 448 448-200.96 448-448S759.04 64 512 64',
	'M665.376 313.376L512 466.752l-153.376-153.376-45.248 45.248L466.752 512l-153.376 153.376 45.248 45.248L512 557.248l153.376 153.376 45.248-45.248L557.248 512l153.376-153.376z',
];

const $ = id => {
	return document.getElementById(id);
};

const setProps = ({
	lang = 'cn',
	showClear = false,
	showEye = false,
	showHint = false,
	showHelp = false,
	showAutofix = false,
	placeholder = 'please input',
	isMust = false,
	mustPosition = 'left',
	type,
	userPassword,
	withdefaultCSS = true,
}) => ({
	lang,
	showClear,
	showEye,
	showHint,
	showHelp,
	showAutofix,
	placeholder,
	isMust,
	mustPosition,
	type,
	userPassword,
	withdefaultCSS,
});

const init = (id, properties) => {
	let prop = setProps(properties || {});

	let input = document.createElement('input');
	$(id).appendChild(input);

	// drawHint(id, prop);

	// 绑定一个class
	$(id).childNodes[0].className = 'form-check-input';

	// 设置css
	setCss(input, deaultStyle, prop.withdefaultCSS);
	$(id).style.fontSize = '16px';
	// 设置placeholder
	input.placeholder = prop.placeholder;

	// 绑定监听输入
	let inputText = watchTyping(id, prop);
	console.log(`目前的值是${inputText}`);

	// 展示eye
	let eyeRes = isShowEye(id, prop);

	// 切换Eye
	switchEye(id, eyeRes);

	// 展示clear
	drawClear(id, prop);

	// 是否必填
	drawMust(id, prop);
};

const setCss = (obj, style, shouldGetCSS) => {
	if (shouldGetCSS) {
		for (let attr in style) {
			obj.style[attr] = style[attr];
		}
	}
};

const watchTyping = (id, prop) => {
	let inputNode = $(id).childNodes[0];
	let oVal;
	let obj = {};

	let proxyInput = new Proxy(inputNode, {
		get: (target, key, receiver) => {
			return Reflect.get(target, key, receiver);
		},
		set: (target, key, value, receiver) => {
			if (key === 'text') {
				target[key] = value;
			}
			return Reflect.set(target, key, value, receiver);
		},
	});

	inputNode.addEventListener('keyup', e => {
		proxyInput.text = e.target.value;
		console.log(`input:${proxyInput.text}`);

		// 检查格式
		let formatRes = formatTest(proxyInput.text, prop);
		console.log(`${prop.type}+${formatRes}`);
    // 显示提示的内容
    if(prop.showHint) {
      drawHint(id, prop);
      let hintRes = $(id).querySelector('p');
      // formatRes? hintRes.innerHTML = "ok" : hintRes.innerHTML = 'error'
      if(formatRes) {
        hintRes.innerHTML = "ok";
        hintRes.style.color = 'green';
      } else {
        hintRes.innerHTML = "error";
        hintRes.style.color = 'red';
      }
    }
		return proxyInput.text;
	});
};

const formatTest = (val, prop) => {
	let res;
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

const isShowEye = (id, prop) => {
	// 需要是密码才显示。
	let defaultType = $(id).childNodes[0].type;
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

const switchEye = (id, showEyeRes) => {
	let svgList = $(id).querySelectorAll('svg');
	console.log(svgList);
	if (svgList.length > 0) {
		svgList[0].addEventListener('click', () => {
			if (showEyeRes) {
				svgEyeInput = svgEyeClosed;
				showEyeRes = !showEyeRes;
				$(id).querySelector('input').type = 'text';
			} else {
				svgEyeInput = svgEyeOpen;
				showEyeRes = !showEyeRes;
				$(id).querySelector('input').type = 'password';
			}
		});
	} else {
		console.log('no svg');
	}
};

// TODO
const drawHint = (id, prop) => {
	if (prop.showHint) {
		let hintDOM = document.createElement('p');
		hintDOM.style.margin = '0 0';
		hintDOM.style.fontSize = '14px';
		hintDOM.style.padding = '0 12px';
		hintDOM.innerHTML = '';
		$(id).appendChild(hintDOM);
	}
};

const drawEye = (id, prop) => {
	let svgEyeInput = svgEyeOpen;
	if (prop.showEye) {
		if (prop.showClear) {
			if (prop.isMust) {
				if (prop.mustPosition === 'right') {
					drawSVG(id, svgEyeInput, '60px');
				} else if (prop.mustPosition === 'left') {
					drawSVG(id, svgEyeInput, '40px');
				}
			} else {
				drawSVG(id, svgEyeInput, '60px');
			}
		} else {
			if (prop.isMust) {
				if (prop.mustPosition === 'right') {
					drawSVG(id, svgEyeInput, '40px');
				} else if (prop.mustPosition === 'left') {
					drawSVG(id, svgEyeInput, '20px');
				}
			} else {
				drawSVG(id, svgEyeInput, '40px');
			}
		}
	}
};

const drawClear = (id, prop) => {
	if (prop.showClear) {
		if (prop.isMust && prop.mustPosition === 'right') {
			drawSVG(id, svgClear, '40px');
		} else if (prop.isMust && prop.mustPosition === 'left') {
			drawSVG(id, svgClear, '20px');
		} else if (!prop.isMust) {
			drawSVG(id, svgClear, '40px');
		}
		let svgList = $(id).querySelectorAll('svg');
		svgList[svgList.length - 1].addEventListener('click', () => {
      $(id).querySelector('input').value = '';
      if(prop.showHint){
        $(id).querySelector('p').innerHTML = 'please input:';
        $(id).querySelector('p').style.color = 'grey';
      }
		});
	}
};

const drawMust = (id, prop) => {
	if (prop.isMust) {
		console.log('draw must');
		let must = document.createElement('span');
		must.innerHTML = '*';
		must.style.color = 'red';
		must.style.margin = '0 5px';
		must.style.fontSize = '16px';
		switch (prop.mustPosition) {
			case 'left':
				let inputNode = $(id).childNodes[0];
				$(id).insertBefore(must, inputNode);
				break;
			case 'right':
				$(id).appendChild(must);
				break;
		}
	}
};

const drawSVG = (id, svgProp, distanceToRight) => {
	let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	svg.setAttribute('width', '18');
	svg.setAttribute('height', '18');
	svg.setAttribute('viewBox', '0 0 1024 1024');
	svg.setAttribute('version', '1.1');
	svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

	let path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	path1.setAttribute('d', svgProp[0]);
	path1.setAttribute('fill', '#000');

	let path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
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

export { init };
