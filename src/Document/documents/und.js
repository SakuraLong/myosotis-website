const data = `= 下划线

给文字一个下划线：{{und|这是一个下划线}}

= 模板名称

模糊的名称为**und**或**下划线**

**代码：**

<code>##
{{und|这是一个下划线1|size=2|color=red}}
{{下划线|这是一个下划线2|blue|2}}
</code>

{|para
|-
| {{und|这是一个下划线1|size=2|color=red}}
| {{下划线|这是一个下划线2|blue|2}}
|}

= 下划线设置

{|table|w=100%
|-
| + 配置项 | 含义 | key值（key=value） | 可选值 | 默认值
|-
| content | 下划线的文字内容 | index=1或key=内容/content | 需要显示的内容 | 空
|-
| color | 下划线颜色 | index=2或key=颜色/color | css允许的颜色 | #303133
|-
| size | 下划线粗细 | index=3或key=粗细/size | css允许的粗细（单位px） | 1
|}

= 贡献者

{|para
|-
|{{github|NKUmianman}}{{github|sakuraLong}}
|}`
export default {
  data
}
