import Replaces from '../replaces.mjs'

import Del from './del.mjs'

class Grammars extends Replaces {
  constructor(config, replaceDict) {
    super(config, replaceDict)
    this.parsers = [
      Del
    ]
    this.init()
  }
}

export default Grammars

