const data = `= 黑幕

给文字一个遮罩，鼠标移上去会逐渐显示出文字：{{heimu|这是一个黑幕|这是黑幕标题}}

= 模板名称

黑幕的名称为**heimu**或**hide**或**黑幕**：

**代码：**

<code>##
{{heimu|这是一个黑幕1|这是黑幕标题1}}
{{hide|这是一个黑幕2|这是黑幕标题2}}
{{黑幕|这是一个黑幕3|这是黑幕标题3}}
</code>

{|para
|-
|{{heimu|这是一个黑幕1|这是黑幕标题1}}
|{{hide|这是一个黑幕2|这是黑幕标题2}}
|{{黑幕|这是一个黑幕3|这是黑幕标题3}}
|}

= 黑幕设置

{|table|w=100%
|-
| + 配置项 | 含义 | key值（key=value） | 可选值 | 默认值
|-
| content | 黑幕的文字内容 | index=1或key=内容/content | 需要显示的内容 | 空
|-
| title | 黑幕的title | index=1或key=注释/title | title内容 | 空
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
