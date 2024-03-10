import GrammarRenderer from './grammar.mjs'

class Divide extends GrammarRenderer {
  static name = 'divide'
  constructor(config, node, map, data) {
    super('divide', config, node, map, data)
  }
  _V_renderSelf() {
    const config = this.config
    /* ----- 组件标签定义 ----- */
    const hr = document.createElement('hr')
    /* ----- 标签类设置 ----- */
    /* ----- 组件子元素加入 ----- */
    /* ----- 组件信息计算 ----- */
    /* ----- 标签attr设置 ----- */
    /* ----- 标签style设置 ----- */
    /* ----- 标签结构构建 ----- */
    /* ----- 返回组件信息 ----- */
    return {
      text: false,
      element: hr
    }
  }
}

export default Divide
