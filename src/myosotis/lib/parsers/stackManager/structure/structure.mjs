import Node from '../node.mjs'

class Structure extends Node {
  constructor(config, src, replaceManager) {
    super('structure', 'structure', src)
    this.config = config
    this.nodeConfig = {
      maxWidth:   '100%',       // 最大宽度
      maxHeight:  'none',       // 最大高度
      minWidth:   'none',       // 最小宽度
      minHeight:  'none',       // 最小高度
      width:      'auto',       // 宽度
      height:     'auto',       // 高度
      color:      'DEFAULT',    // 文字颜色
      fontSize:   'DEFAULT',    // 文字大小 同上
      fontFamily: 'DEFAULT',    // 字体 同上
      type:       'structure',  // 类型
      pos:        'begin',      // 结构开始还是结构结束
      classList:  [],           // 类名列表
      style:      ''            // 样式
    }
    this.replaceManager = replaceManager
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
        content: body.slice(data.startBegin + 2, i + 1 - 2)
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
      this.updateConfig('type', 'article')
      return this.get()
    } else {
      this.analyse()
      nodeStack[nodeStack.length - 1].children.push(this.get())
    }
  }
  analyse() {
    this.data.forEach((d) => {
      const key = d.split('=')[0]
      const left = d.indexOf('=')
      const value = d.slice(left + 1, d.length)
      switch (key) {
        case 'begin':
        case 'end':
        case '开始':
        case '结束':
          this.updateConfig('pos', {
            'begin': 'begin',
            '开始': 'begin',
            'end': 'end',
            '结束': 'end'
          }[key])
          break
        case 'class':
          if (value) {
            this.nodeConfig.classList = this.nodeConfig.classList.concat(
              value.split(',').filter((value) => { return value !== '' })
            )
          }
          break
        case 'style':
          this.updateConfig('style', value)
          break
        case 'width':
        case 'w':
          this.updateConfig('width', value)
          break
        case 'height':
        case 'h':
          this.updateConfig('height', value)
          break
        case 'maxWidth':
        case 'maxW':
          this.updateConfig('maxWidth', value)
          break
        case 'maxHeight':
        case 'maxH':
          this.updateConfig('maxHeight', value)
          break
        case 'minWidth':
        case 'minW':
          this.updateConfig('minWidth', value)
          break
        case 'minHeight':
        case 'minH':
          this.updateConfig('minHeight', value)
          break
        case 'fontSize':
        case 'FS':
          this.updateConfig('fontSize', value)
          break
        case 'fontFamily':
        case 'FF':
          this.updateConfig('fontFamily', value)
          break
        default:
          break
      }
    })
  }
}

export default Structure
