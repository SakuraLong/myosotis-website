import Renderer from '../renderer.mjs'

class TemplateRenderer extends Renderer {
  static type = 'template'
  constructor(config, node, map, data) {
    super(config, node, map, data)
  }
}

export default TemplateRenderer
