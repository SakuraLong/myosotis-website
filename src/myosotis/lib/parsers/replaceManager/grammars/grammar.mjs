import Replace from '../replace.mjs'
import utils from '../../../../common/utils.mjs'

class Grammar extends Replace {
  constructor(name, config, replaceDict) {
    super('grammar', name, replaceDict)
    this.config = config
    this.regex = null
  }
  _V_replaceSelf(content, i) {
    this.content = this.regex.exec(content)[1] || ''
  }
  replace(src) {
    let h = 0
    while (this.regex.test(src) && ++h < 5) {
      const list = src.match(this.regex)
      list.forEach((l, i) => {
        this.regex.lastIndex = 0
        this._V_replaceSelf(l, i)
        /**
         * 深拷贝节点信息
         */
        const value = utils.deepClone(this.get())
        if (value.content) {
          const textNode = this.createTextNode(value.content)
          value.children.push(textNode)
        }
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
