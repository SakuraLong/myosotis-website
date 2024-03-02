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
  }
}

export default Templates
