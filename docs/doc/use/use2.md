# 注意事项

to be continued...

## 在 Vue.js 中使用

`<form id='input'></form>`

```js
import { init } from 'form-check-input';

export default {
	// ...
	mounted() {
		init('input', { 
      type: 'phone', 
      showHint: true, 
      showClear: true, 
      showEye: true 
    });
	},
	// ...
};
```

## 在 React.js 中使用
