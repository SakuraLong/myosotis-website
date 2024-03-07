import MapBuilder from '../mapBuilder.mjs'
import Unknown from './unknown.mjs'
import A from './a.mjs'

class Templates extends MapBuilder {
  constructor(config) {
    super(config, 'template')
    this.renderers = [
      Unknown,
      A
    ]
    this.init()
  }
  init() {
    this.config.setting.custom.templates.forEach((temp) => {
      this.renderers.push(temp.renderer)
    })
  }
}

export default Templates
