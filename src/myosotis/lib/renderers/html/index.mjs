import Components from './components/components.mjs'
import Structures from './structures/structures.mjs'
import Structure from './structures/structure.mjs'
import Texts from './text/texts.mjs'
import Templates from './templates/templates.mjs'

class HTMLRenderer {
  constructor(config, tree, parent) {
    this.config = config
    this.tree = tree
    this.parent = parent
    this.map = new Map()
    this.renderersList = [
      Components,
      Structures,
      Texts,
      Templates
    ]
    this.data = {
      title: []
    }
    this.init()
    console.log(this.map)
  }
  init() {
    this.renderersList.forEach((Renderers) => {
      new Renderers(this.config).buildRenderersMap(this.map)
    })
  }
  render() {
    console.log(this.tree)
    const structure = new Structure(this.tree.config, this.tree, this.map, this.data)
    const article = structure._V_renderSelf().element
    this.parent.innerHTML = ''
    this.parent.appendChild(article)
    console.log(article)
  }
}

export default HTMLRenderer
