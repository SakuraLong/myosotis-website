const data = `= 全部图片显示器

**代码：**

<code>##
{|allIS
|-
| https://www.nankai.edu.cn/_upload/tpl/02/58/600/template600/images/schoolpic1.jpg
|}
</code>

{|allIS
|-
| https://www.nankai.edu.cn/_upload/tpl/02/58/600/template600/images/schoolpic1.jpg
|}

= 组件名称

标题的名称为**allIS**或**图片展示框**：

**代码：**

<code>
{|allIS
|-
| https://www.nankai.edu.cn/_upload/tpl/02/58/600/template600/images/schoolpic1.jpg
|}

{|图片展示框
|-
| https://www.nankai.edu.cn/_upload/tpl/02/58/600/template600/images/schoolpic1.jpg
|}
</code>

= 语法

同其他图片显示器一致，更换组件名称即可。

= 全部图片显示器配置项

{|table|w=100%|center
|-
| + 配置项名称 | 配置项意义 | 配置项key值（key=value） | 配置项可选值
| 配置项默认值 | 示例 | 备注 
|-
| direction | 图片的排列方向 | 直接写或key=direction/d | row<br>column<br>auto
| auto | direction=auto/d=auto/auto |
|-
| rows | 行数 | rows | 数字
| 不设置RS的情况下rows为1 |rows=3|
|-
| RS | 行高（行高设置%在组件高度给定才有效果） | RS | 第一行高度+第二行高度+...+第n行高度
| null | RS=100px+200px+300px |
|-
| columns | 列数 | columns | 数字
| 不设置CS的情况下columns为1 | columns=3 |
|-
| CS | 列宽| CS | 第一列宽度+第二列宽度+...+第n列宽度
| null | CS=100px+200px+30% |
|-
| space | 图片之间的间距 | space | CSS支持的间距设置 | auto | space=1%/space=10px/space=1em |
|}

= 贡献者

{|para
|-
|{{github|nkuAlexLee}}{{github|sakuraLong}}
|}`
export default {
  data
}
