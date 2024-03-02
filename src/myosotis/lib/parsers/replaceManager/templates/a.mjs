import Template from './template.mjs'

class A extends Template {
  constructor(config, replaceDict) {
    super('a', config, replaceDict)
    this.nameList = ['a', '超链接']
    this.keyList = [
      // key[0] config的key值
      // key[0 ~ key.length - 2] 允许的key
      ['href',      '链接',       ''],
      ['content',   '内容',       ''],
      ['title',     '提示',       '']
    ]
  }
  afterReplace() {
    this.content = this.nodeConfig.content === '' ? this.nodeConfig.href : this.nodeConfig.content
  }
}

export default A
