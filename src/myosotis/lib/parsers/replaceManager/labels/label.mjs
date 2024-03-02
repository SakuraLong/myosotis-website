import Replace from '../replace.mjs'
import utils from '../../../../common/utils.mjs'

class Label extends Replace {
  constructor(name, config, replaceDict) {
    super('label', name, replaceDict)
    this.config = config
    this.labelList = []
  }
  replace(src) {
    this.labelList.forEach((label) => {
      let temp = ''
      while (temp !== src) {
        temp = src
        src = utils.replaceNonGreed(
          '<' + label + '>',
          '</' + label + '>',
          src,
          (data) => {
            return this.replaceLabel(data)
          }
        ).content
      }
    })
    return src
  }
  replaceLabel(data) {
    const content = data.replace.slice(data.stringBegin.length, -data.stringEnd.length)
    this.replaceSelf(content)
    const value = this.get()
    const textNode = this.createTextNode(value.content)
    value.children.push(textNode)
    const key = this.getReplaceStr()
    this.replaceDict[this.type].push({
      key: key,
      value: value
    })
    return key
  }
}

export default Label
