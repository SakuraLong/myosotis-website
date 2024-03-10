import Renderer from '../renderer.mjs'

class Structure extends Renderer {
  static type = 'structure'
  static name = 'structure'
  constructor(config, node, map, data) {
    super(config, node, map, data, 'structure', 'structure')
  }
  _V_renderSelf() {
    const config = this.config
    /* ----- 组件标签定义 ----- */
    const div = document.createElement('div')
    /* ----- 标签类设置 ----- */
    if (config.type === 'article') {
      div.classList.add('my-structure--article')
    } else {
      if (config.container) {
        div.classList.add('my-structure--container')
      }
      if (config.card) {
        div.classList.add('my-structure--card')
      }
    }
    config.classList.forEach((className) => {
      div.classList.add(className)
    })
    /* ----- 组件子元素加入 ----- */
    this.renderChildren(div, this.node.children)
    /* ----- 组件信息计算 ----- */
    /* ----- 标签attr设置 ----- */
    /* ----- 标签style设置 ----- */
    this.setStyle(div, config)
    /* ----- 标签结构构建 ----- */
    /* ----- 返回组件信息 ----- */
    return {
      text: false,
      element: div
    }
  }
}

export default Structure
