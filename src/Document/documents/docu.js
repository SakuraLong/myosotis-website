const data = `= 简介

这是一个简单的文本渲染器，可以实现标题、段落、列表、表格、图片显示、目录生成，以及其他对于段落文字的配置。

= 安装

npm安装

<code>#bash#
npm install sakura-renderer
</code>

文件引入

github仓库:{{a|https://github.com/SakuraLong/sakuraRenderer|sakuraRender仓库}}

= 使用

注册:在vue项目下的<code>###main.js</code>中加入

<code>#javascript#
import SakuraRenderer from 'sakura-renderer'
app.use(SakuraRenderer)
</code>

此时会全局注册相关的组件，在任意地方即可使用<code>#vbscript-html##<sr-article-container ref='render'></sr-article-container></code>组件

使用：

在vue项目中的vue文件的template中加入:

<code>#vbscript-html#<sr-article-container ref='render'></sr-article-container>
</code>

在文件中调用：

<code>#javascript#this.#refs.render.setArticle('= Hello world!') // 设置文章内容
this.$refs.render.updateUserData({
  githubToken:'YOUR TOKEN'
}) // 设置用户数据（可选）
this.#refs.render.render() // 渲染</code>

渲染之后应该看到如下标题

= Hello world!

{|para|tip
|-
| 我们在网站的编辑中提供了在线编辑渲染，可供学习或使用
|}

= 开始使用

现在你可以开始使用了，对于更加详细的语法，请参考对应文档

= 贡献者

{|para
|-
|{{github|sakuraLong}}{{github|NKUmianman}}{{github|nkuAlexLee}}{{github|ShmilyYuQAQ}}
|}
`

export default {
  data
}
