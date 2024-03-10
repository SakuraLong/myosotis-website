import Renderer from '../renderer.mjs'

class Html extends Renderer {
  static type = 'html'
  static name = 'html'
  constructor(config, node, map, data) {
    super(config, node, map, data, 'html', 'html')
  }
  _V_renderSelf() {
    const config = this.config
    const ele = document.createElement(this.node.content)
    this.renderChildren(ele, this.node.children)
    this.setStyle(ele, config)
    return {
      text: false,
      element: ele
    }
  }
}

export default Html
