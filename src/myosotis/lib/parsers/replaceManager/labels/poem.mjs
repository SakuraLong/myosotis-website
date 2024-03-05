import Label from './label.mjs'

class Poem extends Label {
  constructor(config, replaceDict) {
    super('poem', config, replaceDict)
    this._V_nameList = ['my-poem', 'my-p', 'poem']
  }
  static weight = 500
}

export default Poem
