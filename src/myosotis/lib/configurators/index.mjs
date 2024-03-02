import Config from '../../common/config.mjs'
import utils from '../../common/utils.mjs'

class Configurator {
  constructor() {
    this.config = utils.deepClone(Config)
    this.defaultStatus = 'ART'
    this.parsers = []
  }
  add(configurator, config) {
    //
  }
  get() {
    return this.config
  }
  addOption(option) {
    utils.mergeObjects(this.config, option)
  }
  addArticleOption(option) {
    if (this.config.setting.article.limitsOfAuthority === 'none') return
    this.analyseArticleOption(option)
  }
  analyseArticleOption(option) {
    const articleOption = option.trim() + '\n' // 为for循环结束判定
    const articleOptionList = []
    let dataBegin = 0
    let hasNote = false
    for (let i = 0; i < articleOption.length; i++) {
      if (articleOption[i] === '\n') {
        if (hasNote) {
          hasNote = false
          dataBegin = i + 1
        } else {
          const t = articleOption.slice(dataBegin, i)
          if (t.length > 0) articleOptionList.push(t)
          dataBegin = i + 1
        }
      } else if (articleOption[i] === ';') {
        if (!hasNote) {
          const t = articleOption.slice(dataBegin, i)
          if (t.length > 0) articleOptionList.push(t)
          dataBegin = i + 1
        }
      } else if (articleOption[i] === '#') {
        if (!hasNote) {
          const t = articleOption.slice(dataBegin, i)
          if (t.length > 0) articleOptionList.push(t)
          hasNote = true
        }
      }
    }
    articleOptionList.forEach((o, i) => {
      articleOptionList[i] = articleOptionList[i].trim()
      const t = articleOptionList[i].split('=')
      t.forEach((t_, i) => {
        t[i] = t[i].trim()
      })
      if (t.length === 1) articleOptionList[i] = t
      else {
        let tValue = ''
        t.forEach((t_, i) => {
          if (i > 0) { tValue += t_ + '=' }
        })
        const key = t[0].split('_')
        const value = tValue.slice(0, -1)
        key.push(value)
        articleOptionList[i] = key
      }
    })
    let status = this.defaultStatus // 默认区域状态
    articleOptionList.forEach((option) => {
      for (let i = 0; i < this.parsers.length; i++) {
        const parser = new this.parsers[i](
          status,
          this.config,
          true,
          option
        )
        if (parser.judge()) {
          const res = parser.analyse()
          status = res === false ? status : res
          break
        }
      }
    })
  }
}

export default Configurator
