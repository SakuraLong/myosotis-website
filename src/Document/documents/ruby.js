const data = `= 注解

给文本一个注解：{{ruby|这是一个文本|这是注解内容}}

= 模板名称

注解的名称为**ruby**或**注解**

**代码：**

<code>##
{{ruby|这是一个文本1|这是注解内容1}}
{{注解|这是一个文本2|这是注解内容2}}
</code>

{|para
|-
| {{ruby|这是一个文本1|这是注解内容1}}
| {{注解|这是一个文本2|这是注解内容2}}
|}

= 模糊设置

{|table|w=100%
|-
| + 配置项 | 含义 | key值（key=value） | 可选值 | 默认值
|-
| content | 注解的文字内容 | index=1或key=内容/content | 需要显示的内容 | 空
|-
| explain | 注解内容 | index=2或key=注释/explain | 注解内容 | 空
|}

= 贡献者

{|para
|-
|{{github|nkuAlexLee}}{{github|sakuraLong}}
|}`
export default {
  data
}
