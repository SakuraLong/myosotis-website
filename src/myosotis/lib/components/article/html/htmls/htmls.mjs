import MapBuilder from '../mapBuilder.mjs'
import Html from './html.mjs'

class Htmls extends MapBuilder {
  constructor(config) {
    super(config, 'label')
    this.renderers = [
      Html
    ]
  }
}

export default Htmls
