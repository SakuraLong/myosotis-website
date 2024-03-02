const data = `= 标题

每个文章必须要有至少一个标题，如果没有渲染器会强制补上，标题和目录挂钩，没有标题目录无法正常生成。
标题等级和html等级相同，为1至6级。标题的设置方法有两种。

== 组件名称

标题的名称为**title**或**标题**：

**代码：**

<code>##
{|title
|-
| 标题
|}

{|标题
|-
| 标题
|}
</code>

== 使用“=”设置标题

在行首通过“=”开头，等于号数量代表标题等级，后跟空格接标题内容，例如：

<code>##
= 一级标题
== 二级标题
=== 三级标题
==== 四级标题
===== 五级标题
====== 六级标题
======= 还是六级标题
</code>

会有如下结果

= 一级标题

== 二级标题

=== 三级标题

==== 四级标题

===== 五级标题

====== 六级标题

======= 还是六级标题

同时标题在“=”标题下可以设置部分样式，样式设置方法为：<code>###= 一级标题 ?style 样式名称1=样式1|样式名称2=样式2</code>，例如：
<code>##
= 居中，没有点击页面内跳转，标题边框在底部，有hover动画 ?style TA=c|HL=false|BP=b|HA=true
</code>
会有如下效果：

= 居中，没有点击页面内跳转，标题边框在底部，有hover动画 ?style TA=c|HL=false|BP=b|HA=true

{|para|warning
|-
| 此模式不支持组件公共配置项设置
|}

== 通过“<sr-i>{||}</sr-i>”设置标题

其实配置项和“=”基本上没有区别，多加了一个type来确定是几级标题，不填则默认为一级标题，例如：

<code>##
{|title|type=h1
|-
| 一级标题
|}
</code>

会有如下效果：

{|title|type=h1
|-
| 一级标题
|}

在此模式下，支持组件的公共配置项设置

{|para|tip
|-
| 由于标题的特殊性，标题不建议使用模板和语法
|}

== 标题配置项

{|table|w=100%|center
|-
| + 配置项名称 | 配置项意义 | 配置项key值（key=value） | 配置项可选值
| 配置项默认值 | 示例 | 备注 
|-
| textAlign | 标题文字显示位置 | textAlign/TA | left/l<br>center/c
| left | textAlign=left/TA=c | 支持style
|-
| borderPosition | 边框的位置 | borderPosition/BP | left/l<br>bottom/b<br>none/n
| left | borderPosition=left/BP=c | 支持style
|-
| hoverAnimation | 是否有浮动动画 | hoverAnimation/HA | true<br>false
| false | hoverAnimation=true<br>HA=true | 支持style
|-
| hasLink | 是否存在页面内跳转链接按钮 | hasLink/HL | true<br>false
| true | hasLink=true<br>HL=true | 支持style
|-
| type | 组件是h几标题 | 可以直接写或key=type | h1~h6
| h1 | type=h1<br>h1 | 不支持style
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
