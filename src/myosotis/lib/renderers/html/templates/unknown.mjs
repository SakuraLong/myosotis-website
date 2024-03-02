import Template from './template.mjs'

class Unknown extends Template {
  static name = 'unknown'
  constructor(config, node, map, data) {
    super(config, node, map, data)
  }
  _V_renderSelf() {
    const config = this.config
    /* ----- 组件标签定义 ----- */
    const span = document.createElement('span')
    /* ----- 标签类设置 ----- */
    /* ----- 组件子元素加入 ----- */
    this.renderChildren(span, this.node)
    /* ----- 组件信息计算 ----- */
    /* ----- 标签attr设置 ----- */
    /* ----- 标签style设置 ----- */
    /* ----- 标签结构构建 ----- */
    /* ----- 返回组件信息 ----- */
    return {
      text: false,
      element: span
    }
  }
}

export default Unknown
