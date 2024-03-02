const data = `= github

在页面里面加入一个github用户信息，其会显示用户头像，如果用户设置名字，则会优先显示名字，否则显示登录名：{{github|sakuraLong}}

{|para|tip
|-
| 由于本模板涉及调用GitHub API，所以**建议申请Github个人令牌**，然后在<code>###userData</code>中进行设置
|}

{|para|tip
|-
| 本模板会将获取到的个人信息**存在本地数据库中**，当存储时间超过一天之后会再次请求。当数据库存储用户信息时，会优先从数据库中读取，以此减少模板对Github API的请求次数
|}

= 模板名称

github的名称为**github**

**代码：**

<code>##
{{github|sakuraLong}}
</code>

{{github|sakuraLong}}

= 参考设置

{|table|w=100%
|-
| + 配置项 | 含义 | key值（key=value） | 可选值 | 默认值
|-
| login | 登录名 | index=1或key=login | 登录名 | 空
|}

= 贡献者

{|para
|-
|{{github|sakuraLong}}{{github|NKUmianman}}
|}`

export default {
  data
}
