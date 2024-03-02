const data = `
= 代码

代码块通过使用highlight.js实现渲染。

渲染器中可以通过代码标签包裹代码，进行代码渲染，例如：

<code>#javascript#
const hello = "Welcome to this website!"
console.log(hello)
</code>

<code>##
<sr-i><code>#javascript#
const hello = "Welcome to this website!"
console.log(hello)
</code></sr-i>
</code>

= 标签

代码支持的标签有三种：

<sr-code>##
1. <sr-code></sr-code>
2. <sr-c></sr-c>
3. <code></code>
</sr-code>

标签检索顺序为：

<sr-code>##
<sr-code></sr-code>→<sr-c></sr-c>→<code></code>
</sr-code>

所以如果你希望在代码中打出代码块标签名称，你需要用<sr-code>###<sr-code></sr-code></sr-code>包裹，例如显示三种标签的源代码为：

<sr-code>##
<sr-code>##
1. <sr-code></sr-code>
2. <sr-c></sr-c>
3. <code></code>
</sr-code>
</sr-code>

{|para|warning
|-
| 当写代码块时，尽量少写出**单独**的开头或结尾标签，可能会导致意想不到的渲染错误，如果必须要写出单独的渲染标签，可以通过使用渲染器忽略标签，例如上面的单独的代码标签在源代码里面为：
<sr-code>##<sr-i><sr-c>###<sr-i><sr-code></sr-i></sr-c></sr-i>
</sr-code>
|}

= 语法

== 设置语言

在代码开始标签（<sr-c>###<sr-i><sr-code></sr-i></sr-c>）之后通过以“#”开始，后跟代码块支持的语言名称，后跟“#”结束，来指定语言（允许的语言在之后会介绍）。如果不指定语言，将会由<code>###highlight.js</code>自动匹配语言。如果写成<code>#####</code>，将会直接打出文字。例如：渲染cpp

<code>#cpp#
#include <iostream>
using namespace std;
int main() {
	cout << "欢迎来到本网站!" << endl;
	cout << "Welcome to this website!" << endl;
	return 0;
}
</code>

代码：

<sr-code>##
<code>#cpp#
#include <iostream>
using namespace std;
int main() {
	cout << "欢迎来到本网站!" << endl;
	cout << "Welcome to this website!" << endl;
	return 0;
}
</code>
</sr-code>

== 代码块设置

如果希望显示为代码块，则在设置完语言之后直接编写代码即可，默认情况下就是代码块。

如果希望设置为行内代码，则在设置完语言之后再加上应该“#”，代表是行内代码，例如：<code>###这是行内代码</code>

代码：

<sr-code>##
<code>###这是行内代码</code>
</sr-code>

= 支持语言

{|table|w=100%
|-
| + 支持语言| 设置方法
|-
| Bash | #bash#
|-
| C | #c# 
|-
| CMake | #cmake#
|-
| C++ | #cpp#
|-
| C# | #csharp#
|-
| CSS | #css#
|-
| GO | #go#
|-
| Java | #java#
|-
| JavaScript | #javascript#
|-
| Json | #json#
|-
| Less | #less#
|-
| MakeFile | #makefile#
|-
| MarkDown | #markdown#
|-
| PHP | #php#
|-
| PlainText | #plaintext#
|-
| Python | #python#
|-
| SCSS | #scss#
|-
| SQL | #sql#
|-
| Stylus | #stylus#
|-
| TypeScript | #typescript#
|-
| VBScript-HTML | #vbscript-html#
|-
| XML | #xml#
|-
| YAML | #yaml#
|}

= 贡献者

{|para
|-
|{{github|sakuraLong}}
|}`
export default {
  data
}
