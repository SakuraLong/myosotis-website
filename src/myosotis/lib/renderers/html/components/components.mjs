import MapBuilder from '../mapBuilder.mjs'
import Title from './title.mjs'

class Components extends MapBuilder {
  constructor(config) {
    super(config, 'component')
    this.renderers = [
      Title
    ]
  }
}

export default Components
