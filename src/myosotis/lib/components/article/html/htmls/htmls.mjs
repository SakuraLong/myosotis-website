import MapBuilder from '../mapBuilder.mjs'
import Html from './html.mjs'

class Htmls extends MapBuilder {
  constructor(config) {
    super(config, 'html')
    this.renderers = [
      Html
    ]
  }
}

export default Htmls
