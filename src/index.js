console.log('welcome to use formCheck!');

const regEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
const regPhone = /^[1][3,4,5,7,8][0-9]{9}$/;
const regWeb = /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/;
const deaultPassword = /^[a-zA-Z0-9]\w{5,17}$/;

const deaultStyle = {
	display: 'inline-block',
	width: '90%',
	padding: '0.375rem 0.75rem',
	lineHeight: '1.5',
	backgroundColor: '#fff',
	backgroundClip: 'padding-box',
	border: '1px solid #ced4da',
	borderRadius: '0.25rem',
	transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out',
};

const $ = id => {
	return document.getElementById(id);
};

const setProps = ({
	lang = 'cn',
	showClear = false,
	showEye = false,
	showHint = true,
	showHelp = false,
	showAutofix = false,
	placeholder = 'please input',
	isMust = false,
	type,
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
	type,
	withdefaultCSS,
});

const init = (id, properties) => {
	let input = document.createElement('input');
	let prop = setProps(properties || {});
	$(id).appendChild(input);

	// 绑定一个class
	$(id).childNodes[0].className = 'form-check-input';

	// 设置css
	setCss(input, deaultStyle, prop.withdefaultCSS);

	// 设置placeholder
	input.placeholder = prop.placeholder;

	// 绑定监听输入
	let inputText = watchTyping(id, prop);
	console.log(`目前的值是${inputText}`);

	// 展示eye
	drawEye(prop);
	// 展示clear
	drawClear(prop);
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

		// 渲染hint
		drawHint(prop);
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

const drawHint = prop => {};
const drawEye = prop => {};
const drawClear = prop => {};
const drawMust = (id, prop) => {
	if (prop.isMust) {
    console.log('draw must');
    let must = document.createElement('span');
    must.innerHTML = "*";
    must.style.color = "red";
    must.style.margin = "0 0 0 5px";
    $(id).appendChild(must);
	}
};
export { init };
