const data = `= 组件

文章总体通过组件构成，分别有标题组件、段落组件、列表组件、表格组件、相册图片显示器组件、走马灯图片显示器组件、全部图片显示器组件。每个组件之间需要以\\n\\n（两个换行符）分割{{heimu|（部分情况下也可以不写，但是还是建议写）|<html>{||}包裹的可以不写（理论上）</html>}}。

{|para|tip
|-
|大多数组件在文本语法里面必须要用<sr-i>{||}</sr-i>包裹（标题和段落不完全需要，之后会详细介绍）。
|}

= 设置方法

组件的设置语法为：

<code>##
{|组件名称|组件配置1=配置1|组件配置2=配置2
|组件配置3=配置3
|-
|组件的数据
|}
</code>

= 贡献者

{|para
|-
|{{github|sakuraLong}}
|}
`

export default {
  data
}
