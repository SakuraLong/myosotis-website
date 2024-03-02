const data = `= 文本

给文字加CSS样式

= 模板名称

模糊的名称为**text**或**文本**

**代码：**
<code>##
{{text|修改的内容|red|20px|1.5|900|purple|true|宋体}}
{{文本|修改的内容|#FF94D8|30px|2|900|#FFF|false}}
</code>

{{text|修改的内容|red|20px|1.5|900|purple|true|宋体}}
{{文本|修改的内容|#FF94D8|30px|2|900|#FFF|false}}

= 文本设置

{|table|w=100%
|-
| + 配置项 | 含义 | key值（key=value） | 可选值 | 默认值
|-
| content | 文字内容 | index=1或key=内容/content | 需要显示的内容 | 空
|-
| color | 文字颜色 | index=2或key=颜色/color | css允许设置的字体颜色 | #303133
|-
| size | 文本大小 | index=3/key=大小/size | css允许设置的字体大小（没有单位，直接赋值） | 16px
|-
| height | 文本行高 | index=4/key=行高/height | css允许设置的行高（没有单位，直接赋值） | 1
|-
| weight | 文本粗细 | index=5/key=粗细/weight | css允许设置的粗细（没有单位，直接赋值） | normal
|-
| bgcolor | 文本背景颜色 | index=6/key=背景色/bgcolor | css允许设置的颜色 | #00000000
|-
| italic | 文本是否是斜体 | index=7/key=斜体#italic | true<br>false | false
|-
| font | 字体 | index=8/key=字体/font | css允许设置的字体 | inherit
|}

= 贡献者

{|para
|-
|{{github|NKUmianman}}{{github|sakuraLong}}
|}`
export default {
  data
}
