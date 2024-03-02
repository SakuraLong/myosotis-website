const data = `= 内置标签

内置标签在文本中书写即可，和html标签的结构相似，都是通过<code>###<></code>开始，<code>###</></code>结束。

= 处理顺序

内置标签有四个，分别是忽ignore标签，html标签，code标签，poem标签，其对文章进行检查的顺序为：<code>##
ignore标签→html标签→code标签→poem标签
</code>

= 贡献者

{|para
|-
|{{github|sakuraLong}}
|}`
export default {
  data
}
