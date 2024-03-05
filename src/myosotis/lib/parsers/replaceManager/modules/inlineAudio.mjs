import Module from './module.mjs'

class InlineAudio extends Module {
  constructor(config, replaceDict) {
    super('audio', config, replaceDict)
    this._V_nameList = ['audio', '音频']
    this._V_keyList = [
      ['src',      '链接',    null,     ''],
      ['content',  '内容',    null,     ''],
      ['type',     '类型',    null,     '']
    ]
  }
}

export default InlineAudio
