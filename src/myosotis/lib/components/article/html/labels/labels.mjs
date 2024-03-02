import MapBuilder from '../mapBuilder.mjs'
import Ignore from './ignore.mjs'

class Labels extends MapBuilder {
  constructor(config) {
    super(config, 'label')
    this.renderers = [
      Ignore
    ]
  }
}

export default Labels
