import Grammar from './grammar.mjs'

class Divide extends Grammar {
  constructor(config, replaceDict) {
    super('divide', config, replaceDict)
    this.regex = /----/g
  }
  static weight = 1
}

export default Divide
