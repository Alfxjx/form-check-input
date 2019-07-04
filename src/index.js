console.log('test src');
const init = (id, props) => {
	console.log('welcome to use form-check');
	let input = document.createElement('input');
	input.setAttribute("palceholder",props.placeholder);
	document.getElementById(id).appendChild(input);
};

export { init };
