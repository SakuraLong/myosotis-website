class Replaces {
  constructor(config, replaceDict) {
    this.config = config
    this.replaceDict = replaceDict
    this.parsers = []
  }
  init() {
    this.parsers.sort((a, b) => a.weight - b.weight)
  }
  replace(src) {
    this.parsers.forEach((Parser) => {
      src = new Parser(this.config, this.replaceDict).replace(src)
    })
    return src
  }
  restore(node) {
    this.parsers.forEach((Parser) => {
      new Parser(this.config, this.replaceDict).restore(node)
    })
  }
}

export default Replaces
