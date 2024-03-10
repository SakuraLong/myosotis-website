import Replaces from '../replaces.mjs'

import Del from './del.mjs'
import Divide from './divide.mjs'

class Grammars extends Replaces {
  constructor(config, replaceDict) {
    super(config, replaceDict)
    this.parsers = [
      Del,
      Divide
    ]
    this.init()
  }
}

export default Grammars

