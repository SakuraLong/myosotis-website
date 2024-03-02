import Label from './label.mjs'

class Ignore extends Label {
  constructor(config, replaceDict) {
    super('ignore', config, replaceDict)
    this.labelList = ['my-ignore', 'my-i', 'ignore']
  }
  static weight = -1000
}

export default Ignore
