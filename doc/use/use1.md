# API

| name 名称      | type 类型 | default 默认值 | describe 描述                          |
| ------------ | :-----: | :---------: | ------------------------------------------- |
| lang         | String  |    cn       | 语言，目前支持中文                           |
| showClear        | Boolean  |   false          | 全部清除按钮       |
| showEye        | Boolean  |     false        | 显示密码按钮           |
| showHint        | Boolean  |      true       | 显示输入结果的提示行        |
| showHelp        | Boolean  |        false     | 显示输入内容提示        |
| showAutofix        | Boolean  |       false      | 自动补全          |
| placeholder        | String  |     please input        | 占位文字           |
| isMust        | Boolean  |        false     | 是否是必填项（*）           |
| mustPosition        | String  |        left     | left/right，设置星号位置。           |
| type        | String  |       /      | 需要检查的格式类型           |
| withdefaultCSS        | Boolean  |      true       | 是否添加默认样式（Bootstrap）  |


## 须知

- `mustPosition` 需要在 `isMust===true`时使用