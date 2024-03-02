import Renderer from '../renderer.mjs'

class Html extends Renderer {
  static type = 'html'
  constructor(config, node, map, data) {
    super(config, node, map, data)
  }
  _V_renderSelf() {
    const config = this.config
    const ele = document.createElement(this.node.content)
    return {
      text: false,
      element: ele
    }
  }
}

export default Html
