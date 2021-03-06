# form-check-input

这是一个可以自定义检查格式，显示清除按钮，显示密码的输入框。

![demo](src/assets/demo.png)

> 都说表单是前端的CRUD

[DEMO](https://alfxjx.github.io/form-check-input/example.html)

## 引入项目

1. 通过`<script>`标签引入

```
download from https://github.com/Alfxjx/form-check-input/releases

<script src="index.min.js"></script>
// or
<script src="index.js"></script>
```

2. 通过`npm install`引入

```
npm install form-check-input

import { init } from 'form-check-input'
```

3. 通过`CDN`引入

```
<script src="https://unpkg.com/form-check-input/release/index.min.js"></script>
// or
<script src="https://unpkg.com/form-check-input/release/index.js"></script>
```

## 快速上手

> 本项目选择 **formCheck** 作为对象

``` javascript
formCheck.init(id,{
  showClear: true,
  type: 'Email'
});
```
需要挂在一个id为`${id}`的form节点上：

```html
<form id="{{id}}"></form>
```

## 官方文档

[Gitbook](https://alfxjx.github.io/form-check-input/docs/) 主要包括使用说明以及二次开发的一些帮助

[NPM](https://www.npmjs.com/package/form-check-input) npmjs上面的信息。

## API

| name 名称      | type 类型 | default 默认值 | describe 描述                          |
| ------------ | :-----: | :---------: | ------------------------------------------- |
| lang         | String  |    cn       | 语言，目前支持中文                           |
| showClear        | Boolean  |   false          | 全部清除按钮       |
| showEye        | Boolean  |     false        | 显示密码按钮           |
| showHint        | Boolean  |      false       | 显示输入结果的提示行        |
| showHelp        | Boolean  |        false     | 显示输入内容提示        |
| showAutofix        | Boolean  |       false      | 自动补全          |
| placeholder        | String  |     please input        | 占位文字           |
| isMust        | Boolean  |        false     | 是否是必填项（*）           |
| mustPosition        | String  |        left     | left/right，设置星号位置。           |
| type        | String  |       /      | 需要检查的格式类型           |
|userPassword | Regex  | /   |  自定义密码的匹配格式                    |
| withdefaultCSS        | Boolean  |      true       | 是否添加默认样式（Bootstrap）  |

## Issues

请在本项目的[issues](https://github.com/Alfxjx/form-check-input/issues)里面提问。

提问时建议加上TAG

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

## 测试功能

首先需要安装`http-server`

```
npm install http-server -g
npm run example
```
打开 [此链接](http://localhost:6324/index.html)，查看实例功能。

## TODO

- ~~showClear~~
- ~~isMust & mustPosition~~
- ~~showEye~~
- change svg when password is unshown.
- ~~showHint~~ & showHelp & showAutofix
- userPassword


## About/关于

- [Alfxjx](https://www.github.com/Alfxjx)
- 24岁，是学生。
- 待业，想找一个实习