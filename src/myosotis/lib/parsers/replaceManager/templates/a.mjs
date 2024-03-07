import Template from './template.mjs'

class A extends Template {
  constructor(config, replaceDict) {
    super('a', config, replaceDict)
    this._V_nameList = ['a', '超链接']
    this._V_keyList = [
      ['href',      '链接',       null,     ''],
      ['content',   '内容',       null,     ''],
      ['title',     '提示',       null,     '']
    ]
  }
  _V_afterReplace() {
    this.content = this.nodeConfig.content === '' ? this.nodeConfig.href : this.nodeConfig.content
    return true
  }
}

export default A
