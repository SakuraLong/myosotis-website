const data = `= 忽略

通过使用忽略标签，可以禁止文本渲染器对包裹的内容渲染，同时也会禁止html对包裹的内容进行渲染，例如：<sr-i>{{heimu|不会被渲染}}<div>不会被渲染</div></sr-i>

<code>##<sr-ignore><sr-i>{{heimu|不会被渲染}}<div>不会被渲染</div></sr-i></sr-ignore></code>

= 标签

代码支持的标签有三种：

<sr-code>##<sr-ignore>1. <sr-ignore></sr-ignore>
2. <sr-i></sr-i>
3. <ignore></ignore>
</sr-ignore></sr-code>

标签检索顺序为：

<sr-code>##
<sr-ignore><sr-ignore></sr-ignore>→<sr-i></sr-i>→<ignore></ignore></sr-ignore>
</sr-code>

所以如果你希望在文章中打出忽略标签名称，你需要用<sr-code>###<sr-h><span><</span></sr-h>sr-ignore></sr-code>包裹，例如显示三种标签的源代码为：

<sr-code>##
<sr-code>##
<sr-ignore>1. <sr-ignore></sr-ignore>
2. <sr-i></sr-i>
3. <ignore></ignore>
</sr-ignore></sr-code>
</sr-code>

{|para|warning
|-
| 当写代码块时，尽量少写出**单独**的开头或结尾标签，可能会导致意想不到的渲染错误，如果必须要写出单独的忽略标签：<code>###<sr-ignore><sr-i>或<ignore></sr-ignore></code>，可以通过使用<code>###<sr-h><span><</span></sr-h>sr-ignore></code>包裹，如果需要显示<code>###<sr-h><span><</span></sr-h>sr-ignore></code>标签，则需要与<code>###<sr-i><sr-html></sr-i></code>标签联合使用，破坏<code>###<sr-h><span><</span></sr-h>sr-ignore></code>标签的结构，如：<code>###<sr-i><sr-h><span><</span></sr-h>sr-ignore></sr-i></code>
|}

= 贡献者

{|para
|-
|{{github|sakuraLong}}
|}`

export default {
  data
}
