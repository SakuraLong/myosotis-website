import Template from './template.mjs'

class Unknown extends Template {
  constructor(config, replaceDict) {
    super('unknown', config, replaceDict)
    this._V_nameList = ['unknown']
    this._V_keyList = []
  }
  /**
   * weight越大越靠后
   * Unknown需要在最后判别
   * Unknown会认为只要匹配到{{}}就是Unknown
   * Unknown后面的模板都不会进行匹配
   */
  static weight = 100000
  /**
   * 模板模块判别函数
   * @param {Array} contentList 数据列表
   * @param {String} content 去除{{}}的内容
   * @returns 判别结果
   */
  judge(contentList, content) {
    this.content = content
    contentList.forEach((c, i) => {
      if (i === 0) return
      this.contentList.push(c.trim())
    })
    return true
  }
  replaceSelf() {
    return
  }
}

export default Unknown
