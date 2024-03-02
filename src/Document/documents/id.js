const data = `= id

给文字一个id：{{id|这是一段文字|sakura_id_0}}

= 模板名称

id的名称为**id**

**代码：**

<code>##
{{id|这是一段文字|sakura_id_1}}
</code>

{|para
|-
| {{id|这是一段文字|sakura_id_1}}
|}

= 模糊设置

{|table|w=100%
|-
| + 配置项 | 含义 | key值（key=value） | 可选值 | 默认值
|-
| content | 文字内容 | index=1或key=内容/content | 需要显示的内容 | 空
|-
| ID | id | index=2或key=ID | id | 空
|}

= 贡献者

{|para
|-
|{{github|ShmilyYuQAQ}}{{github|sakuraLong}}
|}`
export default {
  data
}
