import MapBuilder from '../mapBuilder.mjs'
import Title from './title.mjs'
import Paragraph from './para.mjs'

class Components extends MapBuilder {
  constructor(config) {
    super(config, 'component')
    this.renderers = [
      Title,
      Paragraph
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
