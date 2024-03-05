import Label from './label.mjs'

class Ignore extends Label {
  constructor(config, replaceDict) {
    super('ignore', config, replaceDict)
    this._V_nameList = ['my-ignore', 'my-i', 'ignore']
  }
  static weight = -1000
}

export default Ignore
