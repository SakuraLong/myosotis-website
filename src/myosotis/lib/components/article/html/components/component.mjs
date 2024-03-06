import Renderer from '../renderer.mjs'

class ComponentRenderer extends Renderer {
  static type = 'component'
  constructor(name, config, node, map, data) {
    super(config, node, map, data, 'component', name)
  }
}

export default ComponentRenderer
