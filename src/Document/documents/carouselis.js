const data = `= 走马灯图片显示器

**代码：**

<code>##
{|carouselIS|center|baseUrl=https://www.nankai.edu.cn/_upload/|i=5000
|-
| tpl/02/58/600/template600/images/schoolpic1.jpg
| article/images/4e/63/79dc74604b17b67b2d8128f898dd/3a140736-6902-421a-975e-d07f0b01a408.jpg
|}
</code>

{|carouselIS|center|baseUrl=https://www.nankai.edu.cn/_upload/|i=5000
|-
| tpl/02/58/600/template600/images/schoolpic1.jpg
| article/images/4e/63/79dc74604b17b67b2d8128f898dd/3a140736-6902-421a-975e-d07f0b01a408.jpg
|}

= 组件名称

标题的名称为**carouselIS**或**走马灯**：

**代码：**

<code>
{|carouselIS
|-
| https://www.nankai.edu.cn/_upload/tpl/02/58/600/template600/images/schoolpic1.jpg
|}

{|走马灯
|-
| https://www.nankai.edu.cn/_upload/tpl/02/58/600/template600/images/schoolpic1.jpg
|}
</code>

= 语法

同其他图片显示器一致，更换组件名称即可。

= 走马灯配置项

{|table|w=100%|center
|-
| + 配置项名称 | 配置项意义 | 配置项key值（key=value） | 配置项可选值
| 配置项默认值 | 示例 | 备注 
|-
| loop | 是否循环 | 直接写代表循环或者key=loop | true<br>false
| true | loop=true/loop |
|-
| interval | 切换的时间 | key=interval/i;直接写代表有切换动画、图片切换时长默认2000ms，设置切换时长需要写interval=2000，不需要写单位，不需要动画写interval=false | 切换时长（ms）<br>false
| false | interval/interval=2000/i=false |
|}

= 贡献者

{|para
|-
|{{github|NKUmianman}}{{github|sakuraLong}}
|}`
export default {
  data
}
