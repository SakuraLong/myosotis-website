import MapBuilder from '../mapBuilder.mjs'
import Del from './del.mjs'

class Grammars extends MapBuilder {
  constructor(config) {
    super(config, 'grammar')
    this.renderers = [
      Del
    ]
  }
}

export default Grammars
