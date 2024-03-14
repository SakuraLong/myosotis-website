import Label from './label.mjs'

class Code extends Label {
  constructor(config, replaceDict) {
    super('code', config, replaceDict)
    this._V_nameList = ['my-code', 'my-c', 'code']
  }
  static weight = -500

  _V_replaceSelf(content) {
    const i = content.indexOf('\n')
    if (i === -1) {
      this.updateConfig('inline', true)
      const lang = content.slice(0, content.indexOf(' '))
      this.updateConfig('lang', lang)
      this.content = content.slice(content.indexOf(' ') + 1).trim()
    } else {
      this.updateConfig('inline', false)
      const lang = content.slice(0, i).trim()
      this.updateConfig('lang', lang)
      this.content = content.slice(i + 1).trim()
    }
  }
}

export default Code
