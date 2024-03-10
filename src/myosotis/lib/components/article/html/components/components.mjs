import MapBuilder from '../mapBuilder.mjs'
import Title from './title.mjs'
import Paragraph from './para.mjs'
import List from './list.mjs'
import Table from './table.mjs'

class Components extends MapBuilder {
  constructor(config) {
    super(config, 'component')
    this.renderers = [
      Title,
      Paragraph,
      List,
      Table
    ]
    this.init()
  }
  init() {
    this.config.setting.custom.components.forEach((comp) => {
      this.renderers.push(comp.renderer)
    })
  }
}

export default Components
