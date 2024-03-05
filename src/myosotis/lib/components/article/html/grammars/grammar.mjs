import Renderer from '../renderer.mjs'

class GrammarRenderer extends Renderer {
  static type = 'grammar'
  constructor(config, node, map, data) {
    super(config, node, map, data)
  }
}

export default GrammarRenderer
