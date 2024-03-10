import LabelRenderer from './label.mjs'

class Poem extends LabelRenderer {
  static name = 'poem'
  constructor(config, node, map, data) {
    super('poem', config, node, map, data)
  }
  _V_renderSelf() {
    const config = this.config
    /* ----- 组件标签定义 ----- */
    const pre = document.createElement('pre')
    /* ----- 标签类设置 ----- */
    /* ----- 组件子元素加入 ----- */
    this.renderChildren(pre, this.node.children)
    /* ----- 组件信息计算 ----- */
    /* ----- 标签attr设置 ----- */
    /* ----- 标签style设置 ----- */
    /* ----- 标签结构构建 ----- */
    /* ----- 返回组件信息 ----- */
    return {
      text: false,
      element: pre
    }
  }
}

export default Poem
