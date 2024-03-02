import HTMLRenderer from './html/index.mjs'

class Renderer {
  constructor(config, tree) {
    this.config = config
    this.tree = tree
  }
  renderHTML(parent) {
    const renderer = new HTMLRenderer(this.config, this.tree, parent)
    renderer.render()
  }
}

export default Renderer
