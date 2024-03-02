import Template from './template.mjs'

class A extends Template {
  static name = 'a'
  constructor(config, node, map, data) {
    super(config, node, map, data)
  }
  _V_renderSelf() {
    const config = this.config
    /* ----- 组件标签定义 ----- */
    const a = document.createElement('a')
    /* ----- 标签类设置 ----- */
    a.classList.add('sa-sr-ahref-item')
    /* ----- 组件子元素加入 ----- */
    this.renderChildren(a, this.node)
    /* ----- 组件信息计算 ----- */
    /* ----- 标签attr设置 ----- */
    if (config.title !== '') a.setAttribute('title', config.title)
    if (config.href !== '') a.setAttribute('href', config.href)
    if (config.id !== '') a.setAttribute('id', config.id)
    a.setAttribute('target', '_blank')
    a.setAttribute('rel', 'nofollow noopener noreferrer')
    /* ----- 标签style设置 ----- */
    /* ----- 标签结构构建 ----- */
    /* ----- 返回组件信息 ----- */
    return {
      text: false,
      element: a
    }
  }
}

export default A