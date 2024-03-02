const data = `= 渲染器

我们暂且把组件<code>#vbscript-html##<sr-article-container ref='render'></sr-article-container></code>叫做渲染器。

= 渲染器方法

渲染器可供用户使用的方法有三个：

{|table|w=100%|center
|-
| + 方法名称 | 方法意义 | 参数 | 参数含义
|-
| <code>###setArticle</code> | 设置待渲染的文章 | <code>###setArticle(article)</code> | 待渲染的文章(string)
|-
| <code>###updateUserData</code> | 更新用户数据 | <code>###updateUserData(userData)</code> | 用户数据(object)
|-
| <code>###render</code> | 渲染 | <code>###render()</code> | 无
|}

其中<code>###userData</code>格式为：

<code>#javascript#
{
	githubToken: "", // 用户的Github令牌
}
</code>

要先设置文章和用户数据才能渲染，用户数据可以不进行设置。

= 渲染器设置

渲染器有如下两种模式

== 渲染器将撑开渲染器父元素

这种是默认情况，不需要对渲染器做额外处理

== 渲染器父div设置高，希望渲染器只在规定区域显示

这种需要对渲染器做如下处理：

<code>#vbscript-html#
<div id="render-container"><!-- 渲染器父div 需要设置id -->
        <sr-article-container ref="render" height="100%" parentId="render-container"></sr-article-container>
	<!-- 渲染器的height属性设置为100% parentId属性设置为渲染器父id -->
</div>
</code>

同时设置一下CSS

<code>#css#
#render-container {
	height: 100%; /* 需要设置一个高度 */
	overflow: auto; /* 需要显示滚动条 */
}
</code>

= 渲染器处理流程（不影响编辑，可跳过）

文章读入之后会将文章拆分成配置项{{heimu|（时间不够所以没有写）|QAQ}}区域和文章主体区域。

对文章主体区域进行内置标签、模板的替换，顺序是<code>##ignore→html→code→template→poem</code>将选中的区域替换为<code>###时间戳+对应的名字+随机数</code>，检查之后保证不重复。其中<code>###ignore、html、code、poem</code>用的是非贪婪匹配，其余用的是贪婪匹配。

{|para|tip
|-
| 在进行模板替换时可能遇到**匹配**到了**模板语法**，但是**没有模板**能够**匹配**的问题，例如：<code>###{{heimuheimu}}</code>，此时如果不进行处理，则可能导致之后以及包裹的模板无法进行匹配，所以此处需要引入符号替换，将模板匹配的符号替换掉，（如模板需要替换掉<code>###{{</code>和<code>###}}</code>），之后再替换回来，我们将其称为symbol替换。
|}

之后将文章主体根据规则划分成组件列表

对每个组件进行处理，处理完结构和样式之后，进行内置标签、模板、符号替换和语法处理，顺序是<code>##poem→template→symbol→grammar→code→html→ignore</code>将<code>###时间戳+对应的名字+随机数</code>替换为对应的html代码。

此时组件处理完成，加入组件列表

处理完所有组件之后，检查是否存在标题，没有则补上默认标题；检查是否有参考，有则加上参考标题和参考内容。

完成之后根据组件列表创建目录列表，之后返回给vue组件进行页面渲染。

得到文章页面。

= 贡献者

{|para
|-
|{{github|sakuraLong}}
|}`
export default {
  data
}
