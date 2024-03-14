import MapBuilder from '../mapBuilder.mjs'
import Ignore from './ignore.mjs'
import Poem from './poem.mjs'
import Code from './code.mjs'

class Labels extends MapBuilder {
  constructor(config) {
    super(config, 'label')
    this.renderers = [
      Ignore,
      Poem,
      Code
    ]
  }
}

export default Labels
