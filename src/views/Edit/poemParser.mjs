import Myosotis from '@/myosotis'

class PoemParser extends Myosotis.Template {
  constructor(config, replaceDict) {
    super('poem', config, replaceDict)
    this._V_nameList = ['poem', '诗歌']
    this._V_keyList = []
    this.replaceLineBreak = false
    this.amount = 0
  }

  _V_defaultIndexConfigAnalyse(key, value, data) {
    const textNode = this.createTextNode(data)
    if (this.children.length > 0 && data !== '') this.children.push(this.createHtmlNode('br'))
    if (this.amount === 0 && data !== '') {
      const titleNode = this.create(data, 'poem', 'title')
      titleNode.children.push(textNode)
      this.children.push(titleNode)
    } else if (this.amount === 1 && data !== '') {
      const authorNode = this.create(data, 'poem', 'author')
      authorNode.children.push(textNode)
      this.children.push(authorNode)
    } else if (data !== '') this.children.push(textNode)
    this.amount++
    return {
      res: this.NOT_CHANGE_VALUE
    }
  }

  _V_afterReplace() {
    return false
  }
}

export default PoemParser
