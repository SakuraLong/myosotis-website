import Renderer from '../renderer.mjs'

class LabelRenderer extends Renderer {
  static type = 'label'
  constructor(config, node, map, data) {
    super(config, node, map, data)
  }
}

export default LabelRenderer
