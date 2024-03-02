import MapBuilder from '../mapBuilder.mjs'
import Structure from './structure.mjs'

class Structures extends MapBuilder {
  constructor(config) {
    super(config, 'structure')
    this.renderers = [
      Structure
    ]
    this.init()
  }
}

export default Structures
