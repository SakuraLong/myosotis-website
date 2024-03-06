import Renderer from '../renderer.mjs'

class GrammarRenderer extends Renderer {
  static type = 'grammar'
  constructor(name, config, node, map, data) {
    super(config, node, map, data, 'grammar', name)
  }
}

export default GrammarRenderer
