import Replace from '../replace.mjs'

class Module extends Replace {
  constructor(name, config, replaceDict) {
    super('module', name, replaceDict)
    this.config = config
  }
}

export default Module
