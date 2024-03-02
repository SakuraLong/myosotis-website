const data = `= 相册图片显示器

**代码：**

<code>##
{|albumIS
|-
| https://www.nankai.edu.cn/_upload/tpl/02/58/600/template600/images/schoolpic1.jpg
| https://www.nankai.edu.cn/_upload/article/images/4e/63/79dc74604b17b67b2d8128f898dd/3a140736-6902-421a-975e-d07f0b01a408.jpg
|}
</code>

{|albumIS|center|name=南开大学|baseUrl=https://www.nankai.edu.cn/_upload/|maxW=300px|i=2
|-
| tpl/02/58/600/template600/images/schoolpic1.jpg
| article/images/4e/63/79dc74604b17b67b2d8128f898dd/3a140736-6902-421a-975e-d07f0b01a408.jpg
|}

= 组件名称

标题的名称为**albumIS**或**相册**：

**代码：**

<code>
{|albumIS
|-
| https://www.nankai.edu.cn/_upload/tpl/02/58/600/template600/images/schoolpic1.jpg
|}

{|相册
|-
| https://www.nankai.edu.cn/_upload/tpl/02/58/600/template600/images/schoolpic1.jpg
|}
</code>

= 语法

同其他图片显示器一致，更换组件名称即可。

= 相册配置项

{|table|w=100%|center
|-
| + 配置项名称 | 配置项意义 | 配置项key值（key=value） | 配置项可选值
| 配置项默认值 | 示例 | 备注 
|-
| index | 相册显示第几张图片 | index/i | 数字（1~相册图片数）
| 1 | index=1/i=2 |
|-
| name | 相册名称 | name | 相册名称
| 空 | name=相册名称 |
|}

= 贡献者

{|para
|-
|{{github|ShmilyYuQAQ}}{{github|sakuraLong}}
|}`
export default {
  data
}
