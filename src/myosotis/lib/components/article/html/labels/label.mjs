import Renderer from '../renderer.mjs'

class LabelRenderer extends Renderer {
  static type = 'label'
  constructor(name, config, node, map, data) {
    super(config, node, map, data, 'label', name)
  }
}

export default LabelRenderer
