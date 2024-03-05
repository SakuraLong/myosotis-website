import Renderer from '../renderer.mjs'

class ComponentRenderer extends Renderer {
  static type = 'component'
  constructor(config, node, map, data) {
    super(config, node, map, data)
  }
}

export default ComponentRenderer
