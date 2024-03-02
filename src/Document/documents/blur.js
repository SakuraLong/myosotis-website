const data = `
= 模糊

给文字一个高斯模糊，鼠标移上去会逐渐显示出文字：{{blur|这是一个模糊|这是模糊标题}}

= 模板名称

模糊的名称为**blur**或**模糊**

**代码：**
<code>##
{{blur|这是一个模糊1|这是模糊标题1}}
{{模糊|这是一个模糊2|这是模糊标题2}}
</code>

{|para
|-
| {{blur|这是一个模糊1|这是模糊标题1}}
| {{模糊|这是一个模糊2|这是模糊标题2}}
|}

= 模糊设置

{|table|w=100%
|-
| + 配置项 | 含义 | key值（key=value） | 可选值 | 默认值
|-
| content | 模糊的文字内容 | index=1或key=内容/content | 需要显示的内容 | 空
|-
| title | 模糊的title | index=2或key=注释/title | title内容 | 空
|}

= 贡献者

{|para
|-
|{{github|NKUmianman}}{{github|sakuraLong}}
|}
`
export default {
  data
}
