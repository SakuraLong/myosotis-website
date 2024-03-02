import Replace from '../replace.mjs'

class Template extends Replace {
  constructor(name, config, replaceDict) {
    super('template', name, replaceDict)
    this.config = config
    this.nameList = []
    this.contentList = []
    this.baseKey = [['id',      '']]
    this.keyList = []
    this.sourceContent = ''
  }
  judge(contentList, content) {
    this.contentList = contentList
    this.sourceContent = content
    if (this.nameList.indexOf(contentList[0].trim()) !== -1) {
      this.contentList.forEach((c, i) => {
        this.contentList[i] = this.contentList[i].trim()
      })
      return true
    } else return false
  }
  replace() {
    const key = this.getReplaceStr()
    this.configInit()
    this.replaceSelf()
    this.afterReplace()
    const value = this.get()
    const textNode = this.createTextNode(value.content)
    value.children.push(textNode)
    this.replaceDict[this.type].push({
      key: key,
      value: value
    })
    return key
  }
  configInit() {
    this.keyList = this.keyList.concat(this.baseKey)
    this.keyList.forEach((key) => {
      this.updateConfig(key[0], key[key.length - 1])
    })
  }
  replaceSelf() {
    const switchKeyValue = (key, value) => {
      const keyList = this.keyList.find((item) => item.indexOf(key) !== -1)
      if (keyList !== undefined) {
        this.updateConfig(keyList[0], value)
        return true
      } else { return false }
    }
    this.contentList.forEach((data, index) => {
      if (index === 0) return
      const key = data.split('=')[0]
      const left = data.indexOf('=')
      const value = data.slice(left + 1, data.length)
      const keyList = this.keyList[index - 1]
      if (switchKeyValue(key, value)) {
        return
      } else {
        if (key !== value) return
        this.updateConfig(keyList[0], value)
      }
    })
  }
  afterReplace() {
    // 后处理确定content
    return
  }
}

export default Template
