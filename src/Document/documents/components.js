const data = `= 组件

{|para|warning
|-
|组件之间不可以相互嵌套
|}

== 组件公共配置项

{|table|center|width=100%
|-
| + 配置项/组件 | title | para | table | list | allIS | albumIs | carouselIS
|-
| width | × | × | ✓ | ✓ | ✓ | ✓ | ✓
|-
| height | × | × | ✓ | ✓ | ✓ | ✓ | ✓
|-
| float | × | × | ✓ | ✓ | ✓ | ✓ | ✓
|-
| clear | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓
|-
| fontSize | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓
|-
| fontFamily | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓
|-
| class | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓
|-
| style | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓
|-
| id | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓
|}

== 公共配置项设置方法

{|table|center|width=100%
|-
| + 配置项 | 含义 | key值(key=value) | 可选值 | 默认值（不同组件、不同情况默认值都不一定一样，这里写的是类里面的默认值） | 示例 | 备注
|-
| width | 组件宽度 | width/w 
| css允许的宽度设置
| auto
| width=200px/w=200px | float是center时，width设置的是显示宽，因为center组件宽是100%
|-
| height | 组件高度 | height/h 
| css允许的高度设置
| auto
| height=200px/h=200px |
|-
| float | 浮动情况 | 组件中可以直接写，通用：key=float/f 
| none/center/left/right
| none
| float=none/f=none/none |
|-
| clear | 清除浮动情况 | key=clear/c 
| none/both/left/right
| none
| clear=none/c=none |
|-
| color | 文字颜色 | color/c 
| css允许的颜色设置/DEFAULT
| DEFAULT
| color=black/c=black |
|-
| fontSize | 文字大小 | fontSize/FS 
| css允许的文字大小设置/DEFAULT
| DEFAULT
| fontSize=24px/FS=24px |
|-
| fontFamily | 字体 | fontFamily/FF 
| css允许的字体设置/DEFAULT
| DEFAULT
| fontFamily=宋体/FF=宋体 |
|-
| class | 组件自定义css类名 | class 
| 自定义类名，两个类之间通过;区分
| 空数组
| class=class1;class2 |
|-
| style | 组件自定义style样式 | style 
| 自定义css样式，两个样式之间通过;区分
| 空数组
| style=style1;style2|
|}

= 贡献者

{|para
|-
|{{github|sakuraLong}}
|}
`
export default {
  data
}
