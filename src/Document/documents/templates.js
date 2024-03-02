const data = `
= 模板

接下来开始介绍模板，模板之间是可以相互嵌套的，但是在书写过程中还是建议在保证美观的情况下嵌套。

一个模板主要由模板名字和各种参数组成，模板名字必须写在最前面，而参数可以选择按照参数顺序书写，也可以按照key-value形式书写。例如模板“heimu”，其包含两个参数，按照顺序为：<code>###content</code>和<code>###title</code>，则其书写方式可以是：<code>##
{{heimu|黑幕内容|黑幕标题}}
{{heimu|title=黑幕标题|content=黑幕内容}}
</code>

这两者书写方式得到的结果是一样的：{{heimu|黑幕内容|黑幕标题}}{{heimu|title=黑幕标题|content=黑幕内容}}

= 贡献者

{|para
|-
|{{github|sakuraLong}}
|}
`
export default {
  data
}
