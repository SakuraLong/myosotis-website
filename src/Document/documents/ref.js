const data = `
= 参考

在页面里面加入一个参考，同时自动生成参考目录和编号，点击后跳转到底部：SakuraRenderer文本渲染器官网{{ref|http://123.249.110.185:8000}}

{|para|warning|title=BUG
|-
| 绝大多数情况下**无法**滚动到参考区域，可能是文章滚动与目录scrollTo函数造成了相互的影响
|}

= 模板名称

超链接的名称为**ref**或**参考**

**代码：**

<code>##
{{ref|http://123.249.110.185:8000}}
{{参考|refText=SakuraRenderer文本渲染器官网}}
</code>

{{ref|http://123.249.110.185:8000}}
{{参考|refText=SakuraRenderer文本渲染器官网}}

= 参考设置

{|table|w=100%
|-
| + 配置项 | 含义 | key值（key=value） | 可选值 | 默认值
|-
| href | 参考地址 | index=1或key=地址/href | 参考地址 | 空
|-
| refText | 参考的文字内容 | index=2或key=参考内容/refText | 需要参考的内容或空 | 空
|}

{|para|tip
|-
| 参考设置二者之一即可，如果同时设置href和refText，则只会显示refText
|}

= 贡献者

{|para
|-
|{{github|sakuraLong}}
|}`
export default {
  data
}
