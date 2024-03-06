import Node from '../node.mjs'

class Structure extends Node {
  constructor(config, src, replaceManager) {
    super('structure', 'structure', src)
    this.config = config
    this.nodeConfig = {
      type:       'structure'
    }
    this.baseKey = this.baseKey.concat(
      [
        ['float',       'f',        'left', 'right', 'both', 'none', 'center', ['none', 'center', 'left', 'right'],    'none'],
        ['clear',       'c',        ['none', 'center', 'left', 'right'],    'none'],
        ['maxWidth',    'maxW',     null,     '100%'],
        ['maxHeight',   'maxH',     null,     'none'],
        ['minWidth',    'minW',     null,     'none'],
        ['minHeight',   'minH',     null,     'none'],
        ['width',       'w',        null,     'auto'],
        ['height',      'h',        null,     'auto'],
        ['color',       null,       'DEFAULT'],
        ['fontSize',    'FS',       null,     'DEFAULT'],
        ['fontFamily',  'FF',       null,     'DEFAULT'],
        ['classList',   'class',    null,     [],     (key, value, configValue) => configValue.concat(value.split(';').filter((value) => { return value !== '' }))],
        ['styleList',   'style',    null,     [],     (key, value, configValue) => configValue.concat(value.split(';').filter((value) => { return value !== '' }))],
        ['pos',         'begin',    'end',    '开始', '结束',     null,   'begin',    this.analysePos]
      ]
    )
    this.replaceManager = replaceManager
  }
  analysePos(key, value, configValue) {
    return {
      'begin': 'begin',
      '开始': 'begin',
      'end': 'end',
      '结束': 'end'
    }[key]
  }
  static begin(i, body, data, index) {
    if (body[i] === '{' && i < body.length - 1 && body[i + 1] === '(' && (i === 0 || (i > 0 && body[i - 1] === '\n'))) {
      data.startBegin = i
      data.status = index
      return {
        match: true,
        list: Node.paraAnalyse(i, body, data)
      }
    } else {
      return {
        match: false
      }
    }
  }
  static end(i, body, data) {
    if (body[i] === '}' && i > 0 && body[i - 1] === ')') {
      data.startEnd = i
      data.status = -1
      return {
        match: true,
        content: body.slice(data.startBegin, i + 1)
      }
    } else {
      return {
        match: false
      }
    }
  }
  build(nodeStack = null) {
    if (nodeStack === null) {
      // 初始化
      this.configAnalyse([], true)
      this.updateConfig('type', 'article')
      return this.get()
    } else {
      /**
     * config设置
     */
      this.configAnalyse(this.contentList, true)
      nodeStack[nodeStack.length - 1].children.push(this.get())
    }
  }
}

export default Structure
