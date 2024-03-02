import Replace from '../replace.mjs'

class Grammar extends Replace {
  constructor(name, config, replaceDict) {
    super('grammar', name, replaceDict)
    this.config = config
    this.regex = null
  }
  replaceSelf(content, i) {
    this.content = this.regex.exec(content)[1]
  }
  replace(src) {
    let h = 0
    while (this.regex.test(src) && ++h < 5) {
      const list = src.match(this.regex)
      list.forEach((l, i) => {
        this.replaceSelf(l, i)
        const value = this.get()
        const textNode = this.createTextNode(value.content)
        value.children.push(textNode)
        const key = this.getReplaceStr()
        src = src.replace(l, key)
        this.replaceDict[this.type].push({
          key: key,
          value: value
        })
      })
    }
    return src
  }
}

export default Grammar
