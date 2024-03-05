import Renderer from '../renderer.mjs'

class Structure extends Renderer {
  static type = 'structure'
  static name = 'structure'
  constructor(config, node, map, data) {
    super(config, node, map, data)
  }
  _V_renderSelf() {
    const config = this.config
    const div = document.createElement('div')

    config.classList.forEach((className) => {
      div.classList.add(className)
    })

    this.renderChildren(div, this.node)
    return {
      text: false,
      element: div
    }
  }
}

export default Structure
