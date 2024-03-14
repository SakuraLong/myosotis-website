import Replaces from '../replaces.mjs'

import Ignore from './ignore.mjs'
import Poem from './poem.mjs'
import Code from './code.mjs'

class Labels extends Replaces {
  constructor(config, replaceDict) {
    super(config, replaceDict)
    this.parsers = [
      Ignore,
      Poem,
      Code
    ]
    this.before = []
    this.after = []
    this.init()
    this.replaceBefore = this.replace(this.before)
    this.replaceAfter = this.replace(this.after)
    this.restoreBefore = this.restore(this.before)
    this.restoreAfter = this.restore(this.after)
  }
  init() {
    this.parsers.forEach((parser) => {
      if (parser.weight < 0) this.before.push(parser)
      else this.after.push(parser)
    })
    this.before.sort((a, b) => a.weight - b.weight)
    this.after.sort((a, b) => a.weight - b.weight)
  }
  replace(parsers) {
    return function(src) {
      parsers.forEach((Parser) => {
        src = new Parser(this.config, this.replaceDict).replace(src)
      })
      return src
    }
  }
  restore(parsers) {
    return function(node) {
      parsers.forEach((Parser) => {
        new Parser(this.config, this.replaceDict).restore(node)
      })
    }
  }
}

export default Labels

