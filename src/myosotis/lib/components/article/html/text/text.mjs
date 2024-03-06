import Renderer from '../renderer.mjs'

class Text extends Renderer {
  static type = 'text'
  static name = 'text'
  constructor(config, node, map, data) {
    super(config, node, map, data, 'text', 'text')
  }
  _V_renderSelf() {
    return {
      text: true,
      element: this.node.content
    }
  }
}

export default Text

