const data = `= 图片显示器

图片显示器是三个子显示器的总称，图片显示器会有一些公共配置项，于此处进行介绍

**代码：**

<code>##
{|图片显示器名称|配置项1=配置1|配置项2=配置2
|-
| 图片地址1 图片1名字
| 图片地址2 图片2名字
|}
</code>

= 配置项

{|table|w=100%|center
|-
| + 配置项 | 含义 | key值（key=value） | 可选值 | 默认值 | 示例 | 备注
|-
| baseUrl | 图片路径地址前缀 | baseUrl/BU | 正确的地址前缀 | 空 | baseUrl=地址前缀 |
|-
| imgWidth | 图片宽度 | imgWidth/IW | css支持的宽度设置 | auto | imgWidth=100px<br>IW=100px | album只能设置显示的；all无法通过图片撑开组件大小，设置图片大小只会影响图片显示情况；carousel组件是被图片撑开的，设置图片大小会影响组件大小（组件没设置大小的话）
|-
| imgHeight | 图片高度 | imgHeight/IH | css支持的高度设置 | auto | imgHeight=100px<br>IH=100px | 同上
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
