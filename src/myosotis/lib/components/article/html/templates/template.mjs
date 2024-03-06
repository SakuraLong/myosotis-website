import Renderer from '../renderer.mjs'

class TemplateRenderer extends Renderer {
  static type = 'template'
  constructor(name, config, node, map, data) {
    super(config, node, map, data, 'template', name)
  }
}

export default TemplateRenderer
