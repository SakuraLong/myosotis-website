import Grammar from './grammar.mjs'

class Del extends Grammar {
  constructor(config, replaceDict) {
    super('del', config, replaceDict)
    this.regex = /~~(.*?)~~/g
  }
  static weight = 1
}

export default Del
