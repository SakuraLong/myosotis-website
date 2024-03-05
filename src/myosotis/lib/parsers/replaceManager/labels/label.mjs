import Replace from '../replace.mjs'
import utils from '../../../../common/utils.mjs'

class Label extends Replace {
  constructor(name, config, replaceDict) {
    super('label', name, replaceDict)
    this.config = config
  }
  replace(src) {
    this._V_nameList.forEach((label) => {
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
    this._V_replaceSelf(content)
    /**
     * 深拷贝节点信息
     */
    const value = utils.deepClone(this.get())
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
