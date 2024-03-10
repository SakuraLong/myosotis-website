import MapBuilder from '../mapBuilder.mjs'
import Del from './del.mjs'
import Divide from './divide.mjs'

class Grammars extends MapBuilder {
  constructor(config) {
    super(config, 'grammar')
    this.renderers = [
      Del,
      Divide
    ]
  }
}

export default Grammars
