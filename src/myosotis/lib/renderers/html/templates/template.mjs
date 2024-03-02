import Renderer from '../renderer.mjs'

class Template extends Renderer {
  static type = 'template'
  constructor(config, node, map, data) {
    super(config, node, map, data)
  }
}

export default Template
