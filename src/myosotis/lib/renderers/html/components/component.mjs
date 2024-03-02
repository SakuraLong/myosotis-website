import Renderer from '../renderer.mjs'

class Component extends Renderer {
  static type = 'component'
  constructor(config, node, map, data) {
    super(config, node, map, data)
  }
}

export default Component
