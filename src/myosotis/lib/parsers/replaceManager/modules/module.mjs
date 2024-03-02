import Replace from '../replace.mjs'

class Module extends Replace {
  constructor(name, config, replaceDict) {
    super('module', name, replaceDict)
    this.config = config
    this.nameList = []
    this.contentList = []
    this.baseKey = [['id']]
    this.keyList = []
  }
  judge(contentList, content) {
    this.contentList = contentList
    this.content = content
    if (this.nameList.indexOf(contentList[0].trim()) !== -1) {
      this.contentList.forEach((c, i) => {
        this.contentList[i] = this.contentList[i].trim()
      })
      return true
    } else return false
  }
  replace() {
    // 返回的是key
    const key = this.getReplaceStr()
    this.replaceSelf()
    const value = this.get()
    const textNode = this.createTextNode(value.content)
    value.children.push(textNode)
    this.replaceDict[this.type].push({
      key: key,
      value: value
    })
    return key
  }
  replaceSelf() {
    this.keyList = this.keyList.concat(this.baseKey)
    const switchKeyValue = (key, value) => {
      const keyList = this.keyList.find((item) => item.indexOf(key) !== -1)
      if (keyList !== undefined) {
        Object.assign(this.config, {
          [keyList[0]]: value
        })
        return true
      } else { return false }
    }
    this.contentList.forEach((data, index) => {
      const key = data.split('=')[0]
      const left = data.indexOf('=')
      const value = data.slice(left + 1, data.length)
      const keyList = this.keyList[index]
      if (switchKeyValue(key, value)) {
        return
      } else {
        if (key !== value) return
        Object.assign(this.config, {
          [keyList[0]]: data
        })
      }
    })
  }
}

export default Module
