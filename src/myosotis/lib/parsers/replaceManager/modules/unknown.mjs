import Module from './module.mjs'

class Unknown extends Module {
  constructor(config, replaceDict) {
    super('unknown', config, replaceDict)
    this._V_nameList = ['unknown']
    this._V_keyList = []
  }
  static weight = 100000
  judge(contentList, content) {
    this.contentList = contentList
    this.content = content
    this.contentList.forEach((c, i) => {
      this.contentList[i] = this.contentList[i].trim()
    })
    return true
  }
  replaceSelf() {
    return
  }
}

export default Unknown
