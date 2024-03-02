const data = `= 表格

同html一样，表格相对于其他组件来说更加的复杂，配置的数量也更加的多，语法也较其他组件的略有不同。

= 组件名称

标题的名称为**table**或**表格**：

**代码：**

<code>##
{|table
|-
| 表格
|}

{|表格
|-
| 表格
|}</code>

= 语法

以往的组件都是通过“|-”来划分配置项与数据区域，表格也类似，在表格语法中，第一个出现的“|-”作用是区分配置项与数据区域，之后的“|-”则作为表格行的区分。同时“|”在数据区域中作为单元格划分。例如如下表格代码

**代码：**

<code>##
{|table|
|-
| 1 | 2 | 3
|-
| 4 | 5 | 6 
|}
</code>

可以发现代码中通过“<sr-i>|</sr-i>-”划分，表格被划分为1、2、3和4、5、6两行，同时通过“<sr-i>|</sr-i>”的划分，表格被划分为三列，所以这是一个两行三列的表格，如下所示：

{|table|
|-
| 1 | 2 | 3 
|-
| 4 | 5 | 6 
|}

{|para|warning
|-
| 需要注意，由于表格通过“<sr-i>|</sr-i>”来区分单元格，所以当一行结束时，末尾不需要加“<sr-i>|</sr-i>”，如示例代码“3”、“6”后面不需要加“<sr-i>|</sr-i>”
|}

最基础的表格语法介绍完成

接下来需要说明的是，表格还可以针对单元格进行配置，每个单元格都可以有配置项。

= 样式

对于一些较大的表格，只需要对表格设置宽高，当表格大小大于其时，表格就会自动生成滚动条，例如设置h=100px和w=100px时

{|table|h=100px|w=100px|left
|-
| 1 | 1 | 1 
|-
| 2 | 2 | 2
|- 
| 3 | 3 | 3
|-
| 4 | 4 | 4
|-
| 5 | 5 | 5
|-
| 6 | 6 | 6
|-
| 7 | 7 | 7
|-
| 8 | 8 | 8
|}

{|para|clear=both
|-
| 表格会出现滚动条
|}

{|title|clear=both
|-
| 单元格配置项
|}

**单元格**配置项两两之间通过“/”区分

{|table|w=100%
|-
| + 配置项名称 | 配置项意义 | 配置项key值（key=value） | 示例 | 备注 
|-
| thead | 首行是否启用thead，并且给予不同的样式 | 在首行的第一个单元格内容前面填上“ + ”（有空格） | + | 只能给第一行设置，且在单元格内容前
|-
| row | 单元格占几行 | r | r=2 | 在单元格内容后隔一个空格设置
|-
| column | 单元格占几列 | c | c=2 | 在单元格内容后隔一个空格设置
|-
| title | 单元格是否是thead的样式 | 直接填t则为thead的样式 | t | 在单元格内容后隔一个空格设置
|-
| display | 单元格display是否为none | 直接填d则display为none | d | 在单元格内容后隔一个空格设置
|}

例如：

**代码:**

<code>##
{|table
|-
| + 星期一 | 星期二 | 星期三
|-
| 吃火锅 c=2/t | 睡觉 r=3
|-
| 看书 | coding 
|-
| coding | 跑步
|}
</code>

则显示结果如下：

{|table
|-
| + 星期一 | 星期二 | 星期三
|-
| 吃火锅 c=2/t | 睡觉 r=3
|-
| 看书 | coding 
|-
| codig | 跑步
|}

至于**d**，你可以合理使用它来画出不一样的表格：

**代码：**

<code>##
{|table|border=border|hover=node
|TW=70px|TH=70px|width=210px
|name=展示不一样的表格
|float=center
|-
| 123 d| 123 d| 123 d| 123 d
|-
| 123 d| 用一些技巧 c=2/r=1/t | 你还可以 c=1/r=2/t
|-
| 123 d| 这样 c=1/r=2/t | 不一样的表格 c=1/r=1/t
|-
| 123 d| 画出 c=2/r=1/t
|}
</code>

{|table|border=border|hover=node
|TW=70px|TH=70px|width=210px
|name=不一样的表格
|float=center
|-
| 123 d| 123 d| 123 d| 123 d
|-
| 123 d| 用一些技巧 c=2/r=1/t | 你还可以 c=1/r=2/t
|-
| 123 d| 这样 c=1/r=2/t | 不一样的表格 c=1/r=1/t
|-
| 123 d| 画出 c=2/r=1/t
|}

= 表格配置项

== hover 鼠标浮动样式

{|table|hover=row
|left
|-
| + hover=row c=3
|-
| 1 | 2 | 3 
|- 
| 12 c=2 | 33 r=2
|-
| 1 | 2 
|}

{|table|hover=node|style=margin-left:20px
|left
|-
| + hover=node c=3
|-
| 1 | 2 | 3 
|- 
| 12 c=2 | 33 r=2
|-
| 1 | 2 
|}

{|table|hover=none|style=margin-left:20px
|left
|-
| + hover=none c=3
|-
| 1 | 2 | 3 
|- 
| 12 c=2 | 33 r=2
|-
| 1 | 2 
|}

{|title|h2|clear=both
|-
| border 边框样式
|}

{|table|border=border
|left
|-
| + border=border c=3
|-
| 1 | 2 | 3 
|- 
| 12 c=2 | 33 r=2
|-
| 1 | 2 
|}

{|table|border=bottom|style=margin-left:20px
|left
|-
| + border=bottom c=3
|-
| 1 | 2 | 3 
|- 
| 12 c=2 | 33 r=2
|-
| 1 | 2 
|}

{|table|border=none|style=margin-left:20px
|left
|-
| + border=none c=3
|-
| 1 | 2 | 3 
|- 
| 12 c=2 | 33 r=2
|-
| 1 | 2 
|}

{|title|h2|clear=both
|-
| fold 是否折叠
|}

对于一些较大的表格，我们可以设置让其折叠，例如：

{|table|fold|name=大表格|left
|-
| 1 | 1 | 1 
|-
| 2 | 2 | 2
|- 
| 3 | 3 | 3
|-
| 4 | 4 | 4
|-
| 5 | 5 | 5
|-
| 6 | 6 | 6
|-
| 7 | 7 | 7
|-
| 8 | 8 | 8
|}

{|para|clear=both
|-
| 表格会折叠
|}

{|title|h2|clear=both
|-
| 详细说明
|}

{|table|w=100%|center
|-
| + 配置项名称 | 配置项意义 | 配置项key值（key=value） | 配置项可选值
| 配置项默认值 | 示例 | 备注 
|-
| name | 表格的名字 | name | 表格名字
| 空 | name=表格名字 |
|-
| fold | 是否折叠 | 直接填或key=fold | true<br>false
| false | fold=true/fold |
|-
| hover | 浮动样式情况 | 除none以外可以直接写或key=hover | row<br>node<br>none
| row | hover=row/row |
|-
| border | 边框样式情况 | 除none以外可以直接写或key=border | border<br>bottom<br>none
| border | border=border/border |
|-
| tdWidth | 表格全部单元格宽度 | tdWidth/TW | css支持的宽度设置
| auto | tdWidth=100px/TW=100px |
|-
| tdHeight | 表格全部单元格高度 | tdHeight/TH | css支持的高度设置
| auto | tdHeight=100px/TH=100px |
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
