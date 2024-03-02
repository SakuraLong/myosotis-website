const data = `= 引用

给文字一个引用：{{quote|SakuraRenderer感觉不错|开发人员}}

= 模板名称

模糊的名称为**quote**或**引用**

**代码：**

<code>##
{{quote|SakuraRenderer感觉不错1|开发人员1}}
{{引用|SakuraRenderer感觉不错2|开发人员2}}
</code>

{|para
|-
| {{quote|SakuraRenderer感觉不错1|开发人员1}}
| {{引用|SakuraRenderer感觉不错2|开发人员2}}
|}

= 引用设置

{|table|w=100%
|-
| + 配置项 | 含义 | key值（key=value） | 可选值 | 默认值
|-
| content | 文字内容 | index=1或key=内容/content | 需要显示的内容 | 空
|-
| from | 引用来源 | index=2或key=来源/from | 引用来源 | 空
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
