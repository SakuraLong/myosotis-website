const data = `= 诗句

通过使用诗句标签，可以保留内部空格和换行符，例如：<sr-p>
第一行
第二行
第三行
</sr-p>

<code>##<sr-p>
第一行
第二行
第三行
</sr-p></code>

= 标签

代码支持的标签有三种：

<sr-code>##<sr-ignore>1. <sr-poem></sr-poem>
2. <sr-p></sr-p>
3. <poem></poem>
</sr-ignore></sr-code>

标签检索顺序为：

<sr-code>##
<sr-ignore><sr-poem></sr-poem>→<sr-p></sr-p>→<poem></poem></sr-ignore>
</sr-code>

{|para|warning
|-
| 当写文章时，尽量少写出**单独**的开头或结尾标签，可能会导致意想不到的渲染错误，如果必须要写出单独的渲染标签，可以通过使用渲染器忽略标签，例如<sr-c>###<sr-i><sr-poem></sr-i></sr-c>的代码为：
<sr-code>##<sr-i><sr-c>###<sr-i><sr-poem></sr-i></sr-c></sr-i>
</sr-code>
|}

= 贡献者

{|para
|-
|{{github|sakuraLong}}
|}`
export default {
  data
}
