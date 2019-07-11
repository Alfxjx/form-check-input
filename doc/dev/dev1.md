# 各函数功能

to be continued...

## `init(id, properties)`

选择对应的`id`进行挂载，并且应用配置的`properties`。
暴露出来的函数，使用时**一定**会调用的函数。

## `setProps()`

将用户的设置应用到方法中，默认提供了一下default配置。

## `setCss(obj, style, shouldGetCSS)`

给`input`设置样式的函数。默认的一套样式来自于[Bootstrap](https://v3.bootcss.com/css/#forms)

可以配置API里面的 `withdefaultCSS` 来开启或者关闭。

**PS** 插件暴露了一个类 `form-check-input`,可以自行设置样式。

## `watchTyping(id,prop)`

本函数实现了对输入数据的 **双向绑定**，使用的是ES6的`Proxy`和`Reflect`语法，对输入的数据进行代理，实现了类似MVVM的效果。

在本函数中对输入(`keyup`)进行监听，显示不同的`hint`。

```javascript
const watchTyping = (id, prop) => {
  // ...
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
  // ...
}
```

## `formatTest(val,prop)`

实现的是对输入数据格式的检查。默认的检查正则表达式为：

```javascript
const regEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
const regPhone = /^[1][3,4,5,7,8][0-9]{9}$/;
const regWeb = /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/;
const deaultPassword = /^[a-zA-Z0-9]\w{5,17}$/;
```

> 未来会引入更多的自定义检索功能。
> 预留一个userPassword接口，可以输入自定义正则。

## `isShowEye(id,prop)`
判断是否是密码，需要是密码才显示。
三个判断条件：
- `prop.type === 'password' `
- `prop.userPassword`
- `defaultType === 'password'`

## `switchEye(id,showEyeRes)`
用来切换密码和明文。
BUG: 切换logo暂时没修好，功能已经完成。

## `drawHint(id,prop)`
显示输入提示。
TODO: 样式美化。

## `drawEye(id,prop)`
绘制眼睛svg。

## `drawClear(id,prop)`
绘制清除的svg,绑定清除功能以及将hint改为灰色。

## `drawMust(id,prop)`
若是选择显示必填，则在input之后（或之前）添加一个红色的*号。

## `drawSVG(id,svgProp,distanceToRight)`
绘制svg通用函数。