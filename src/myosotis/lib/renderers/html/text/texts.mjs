import MapBuilder from '../mapBuilder.mjs'
import Text from './text.mjs'

class Texts extends MapBuilder {
  constructor(config) {
    super(config, 'text')
    this.renderers = [
      Text
    ]
    this.init()
  }
}

export default Texts
