import Module from './module.mjs'

class InlineAudio extends Module {
  constructor(config, replaceDict) {
    super('audio', config, replaceDict)
    this.nameList = ['audio', '音频']
    this.keyList = [
      ['src',      '链接'],
      ['content',   '内容'],
      ['type',     '类型']
    ]
  }
}

export default InlineAudio
