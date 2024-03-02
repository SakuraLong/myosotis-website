import Components from './html/components/components.mjs'
import Structures from './html/structures/structures.mjs'
import Labels from './html/labels/labels.mjs'
import Texts from './html/text/texts.mjs'
import Templates from './html/templates/templates.mjs'
import Htmls from './html/htmls/htmls.mjs'

import Structure from './html/structures/structure.mjs'

class Article {
  constructor(config, tree, parent, catalogue = null) {
    this.config = config
    this.tree = tree
    this.parent = parent
    this.catalogue = catalogue
    this.map = new Map()
    this.eventManager = null // 事件管理器
    this.renderersList = [
      Components,
      Structures,
      Texts,
      Templates,
      Labels,
      Htmls
    ]
    this.data = {
      title: []
    }
    this.init()
  }
  init() {
    this.renderersList.forEach((Renderers) => {
      new Renderers(this.config).buildRenderersMap(this.map)
    })
  }
  render() {
    const structure = new Structure(this.tree.config, this.tree, this.map, this.data)
    const article = structure._V_renderSelf().element
    this.parent.innerHTML = ''
    this.parent.appendChild(article)
    console.log(article)
  }
}

export default Article
