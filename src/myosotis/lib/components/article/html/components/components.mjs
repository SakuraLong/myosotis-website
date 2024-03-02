import MapBuilder from '../mapBuilder.mjs'
import Title from './title.mjs'
import Paragraph from './para.mjs'

class Components extends MapBuilder {
  constructor(config) {
    super(config, 'component')
    this.renderers = [
      Title,
      Paragraph
    ]
  }
}

export default Components
