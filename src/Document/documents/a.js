const data = `= 超链接

在页面里面加入一个超链接，点击后打开新的页面：{{a|http://123.249.110.185:8000|SakuraRenderer网站主页}}

= 模板名称

超链接的名称为**a**或**超链接**

**代码：**

<code>##
{{a|http://123.249.110.185:8000|SakuraRenderer网站主页|点击点击}}
{{超链接|http://123.249.110.185:8000|SakuraRenderer网站主页}}
{{a|http://123.249.110.185:8000}}
</code>

{|para
|-
| {{a|http://123.249.110.185:8000|SakuraRenderer网站主页|点击点击}}
| {{超链接|http://123.249.110.185:8000|SakuraRenderer网站主页}}
| {{a|http://123.249.110.185:8000}}
|}

= 超链接设置

{|table|w=100%
|-
| + 配置项 | 含义 | key值（key=value） | 可选值 | 默认值
|-
| href | 访问地址 | index=1或key=链接/href | 访问地址 | 空
|-
| content | 超链接的文字内容 | index=2或key=内容/content | 需要显示的内容或空 | 空
|-
| title | 超链接的title | index=3或key=提示/title | title内容 | 空
|}

= 贡献者

{|para
|-
|{{github|nkuAlexLee}}{{github|sakuraLong}}
|}`
export default {
  data
}
