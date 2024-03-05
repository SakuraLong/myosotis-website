import GrammarRenderer from './grammar.mjs'

class Del extends GrammarRenderer {
  static name = 'del'
  constructor(config, node, map, data) {
    super(config, node, map, data)
  }
  _V_renderSelf() {
    const config = this.config
    /* ----- 组件标签定义 ----- */
    const del = document.createElement('del')
    /* ----- 标签类设置 ----- */
    /* ----- 组件子元素加入 ----- */
    del.textContent = this.node.content
    /* ----- 组件信息计算 ----- */
    /* ----- 标签attr设置 ----- */
    /* ----- 标签style设置 ----- */
    /* ----- 标签结构构建 ----- */
    /* ----- 返回组件信息 ----- */
    return {
      text: false,
      element: del
    }
  }
}

export default Del
