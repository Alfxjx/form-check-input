console.log('welcome to use formCheck!');

const $ = id => {
	return document.getElementById(id);
};

const setProps = ({
  lang = "en",
  showClear = false,
  showEye = false,
  showHint = true,
  showHelp = false,
  showAutofix = false,
  placeholder = "please input",
  isMust = false,
  isPhone = false,
  isWeb = false,
  isEmail = false
})=>({
  lang,
  showClear,
  showEye,
  showHint,
  showHelp,
  showAutofix,
  placeholder,
  isMust,
  isPhone,
  isWeb,
  isEmail
})

const init = (id, properties) => {
	// console.log('welcome to use form-check');
  let input = document.createElement('input');
  let prop = setProps(properties || {});
  $(id).appendChild(input);
  input.placeholder = prop.placeholder;
};

export { init };
