// 模板控制替换器
//

import Replaces from '../replaces.mjs'
import utils from '../../../../common/utils.mjs'

import Unknown from './unknown.mjs'
import A from './a.mjs'

class Templates extends Replaces {
  constructor(config, replaceDict) {
    super(config, replaceDict)
    this.parsers = [
      Unknown,
      A
    ]
    this.init()
  }
  init() {
    this.config.setting.custom.templates.forEach((temp) => {
      this.parsers.push(temp.parser)
    })
    this.parsers.sort((a, b) => a.weight - b.weight)
  }
  /**
   * 对字符串进行替换
   * @param {String} src 待替换的字符串
   * @returns 替换好的字符串
   */
  replace(src) {
    let temp = ''
    while (temp !== src) {
      temp = src
      src = utils.replaceGreed(
        '{{', '}}',
        src,
        (data) => {
          const content = data.replace.slice(data.stringBegin.length, -data.stringEnd.length)
          const contentList = content.split('|')
          for (const Parser of this.parsers) {
            const p = new Parser(this.config, this.replaceDict)
            if (p.judge(contentList, content)) {
              return p.replace()
            }
          }
        }
      ).content
    }
    return src
  }
}

export default Templates
