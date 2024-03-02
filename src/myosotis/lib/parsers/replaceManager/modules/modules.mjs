import Replaces from '../replaces.mjs'
import utils from '../../../../common/utils.mjs'

import Unknown from './unknown.mjs'
import InlineAudio from './inlineAudio.mjs'

class Modules extends Replaces {
  constructor(config, replaceDict) {
    super(config, replaceDict)
    this.parsers = [
      Unknown,
      InlineAudio
    ]
    this.init()
  }
  replace(src) {
    let temp = ''
    while (temp !== src) {
      temp = src
      src = utils.replaceGreed(
        '[[', ']]',
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

export default Modules
