const data = `= html

通过使用html标签，可以进行html的渲染（主要是针对code标签内部元素无法被html渲染），例如：<code>###code<html><span style='color:red'>html</span></html>code</code>

<code>##<sr-i><code>###code<html><span style='color:red'>html</span></html>code</code></sr-i></code>

如果不加此标签会变成：<code>###code<span style='color:red'>html</span>code</code>

<code>##<sr-i><code>###code<span style='color:red'>html</span>code</code></sr-i></code>

= 标签

代码支持的标签有三种：

<sr-code>##<sr-ignore>1. <sr-html></sr-html>
2. <sr-h></sr-h>
3. <html></html>
</sr-ignore></sr-code>

标签检索顺序为：

<sr-code>##
<sr-ignore><sr-html></sr-html>→<sr-h></sr-h>→<html></html></sr-ignore>
</sr-code>

{|para|warning
|-
| 当写文章时，尽量少写出**单独**的开头或结尾标签，可能会导致意想不到的渲染错误，如果必须要写出单独的渲染标签，可以通过使用渲染器忽略标签，例如<sr-c>###<sr-i><sr-html></sr-i></sr-c>的代码为：
<sr-code>##<sr-i><sr-c>###<sr-i><sr-html></sr-i></sr-c></sr-i>
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
