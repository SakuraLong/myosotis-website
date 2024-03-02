const data = `
= 删除线

给文字一个删除线：{{del|这是一个删除线}}

= 模板名称

模糊的名称为**del**或**删除线**

**代码：**

<code>##
{{del|这是一个删除线1|size=2|color=red}}
{{删除线|这是一个删除线2|blue|2}}
</code>

{|para
|-
| {{del|这是一个删除线1|size=2|color=red}}
| {{删除线|这是一个删除线2|blue|2}}
|}

= 删除线设置

{|table|w=100%
|-
| + 配置项 | 含义 | key值（key=value） | 可选值 | 默认值
|-
| content | 删除线的文字内容 | index=1或key=内容/content | 需要显示的内容 | 空
|-
| color | 删除线颜色 | index=2或key=颜色/color | css允许的颜色 | #303133
|-
| size | 删除线粗细 | index=3或key=粗细/size | css允许的粗细（单位px） | 1
|}

= 贡献者

{|para
|-
|{{github|NKUmianman}}{{github|sakuraLong}}
|}`
export default {
  data
}
