import Node from '../node.mjs'

class Component extends Node {
  constructor(name, config, src, replaceManager) {
    super('component', name, src)
    this.config = config
    this.replaceManager = replaceManager
    this.nameList = []
    this.compConfig = [] // 组件设置
    this.nodeConfig = {
      key:        parseInt(Math.random() * 1000000),
      float:      'none',       // 浮动情况
      clear:      'none',       // clear情况
      maxWidth:   '100%',       // 最大宽度
      maxHeight:  'none',       // 最大高度
      minWidth:   'none',       // 最小宽度
      minHeight:  'none',       // 最小高度
      width:      'auto',       // 宽度
      height:     'auto',       // 高度
      color:      'DEFAULT',    // 文字颜色
      fontSize:   'DEFAULT',    // 文字大小 同上
      fontFamily: 'DEFAULT',    // 字体 同上
      classList:  [],           // 类名列表
      style:      '',           // 样式列表
      baseURL:    '',           // 基础路径
      id:         ''            // 组件id
    }
    this.configList = []
    this.dataList = []
    this.compInit()
  }
  compInit() {
    const i = this.data.indexOf('-')
    if (i === -1) this.dataList = this.data
    else {
      this.data.forEach((d, index) => {
        if (index < i) this.configList.push(d)
        else if (index > i) this.dataList.push(d)
      })
    }
  }
  static begin(i, body, data, index) {
    if (body[i] === '{' && i < body.length - 1 && body[i + 1] === '|' && (i === 0 || (i > 0 && body[i - 1] === '\n'))) {
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
    if (body[i] === '}' && i > 0 && body[i - 1] === '|') {
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
  judge() {
    if (this.nameList.indexOf(this.data[0]) !== -1) {
      return true
    } else {
      return false
    }
  }
  build(nodeStack) {
    this.checkConfig(nodeStack)
    this.analyseConfig()
    this.analyse()
    nodeStack[nodeStack.length - 1].children.push(this.get())
  }
  checkConfig(nodeStack) {
    // 检查前面是否有config
    let i = nodeStack[nodeStack.length - 1].children.length
    while (--i >= 0 && nodeStack[nodeStack.length - 1].children[i].type === 'config') {
      this.configList = this.configList.concat(nodeStack[nodeStack.length - 1].children[i].config.configList)
    }
  }
  analyseConfig() {
    this.updateCompConfig()
    this.configList.forEach((config) => {
      const key = config.split('=')[0]
      const left = config.indexOf('=')
      const value = config.slice(left + 1, config.length)
      switch (key) {
        case 'left':
        case 'right':
        case 'both':
        case 'none':
        case 'center':
          if (key === value) this.updateConfig('float', key)
          break
        case 'float':
        case 'f':
          if (['none', 'center', 'left', 'right'].indexOf(value) !== -1) {
            this.updateConfig('float', ['center', 'left', 'right', 'none'].find((ele) => { return ele === value }))
          }
          break
        case 'clear':
          if (['none', 'both', 'left', 'right'].indexOf(value) !== -1) {
            this.updateConfig('clear', ['left', 'both', 'right', 'none'].find((ele) => { return ele === value }))
          }
          break
        case 'c':
          // c有可能是clear，也可以是color
          if (['none', 'both', 'left', 'right'].indexOf(value) !== -1) {
            this.updateConfig('clear', ['left', 'both', 'right', 'none'].find((ele) => { return ele === value }))
          } else {
            this.updateConfig('color', value)
          }
          break
        case 'width':
        case 'w':
          this.updateConfig('width', value, '')
          break
        case 'height':
        case 'h':
          this.updateConfig('height', value, '')
          break
        case 'maxWidth':
        case 'maxW':
          this.updateConfig('maxWidth', value, '')
          break
        case 'maxHeight':
        case 'maxH':
          this.updateConfig('maxHeight', value, '')
          break
        case 'minWidth':
        case 'minW':
          this.updateConfig('minWidth', value, '')
          break
        case 'minHeight':
        case 'minH':
          this.updateConfig('minHeight', value, '')
          break
        case 'fontSize':
        case 'FS':
          this.updateConfig('fontSize', value, '')
          break
        case 'fontFamily':
        case 'FF':
          this.updateConfig('fontFamily', value, '')
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
        case 'baseURL':
          if (value) { this.updateConfig('baseURL', value) }
          break
        case 'id':
          this.updateConfig('id', value)
          break
        default:
          this._V_analyseConfig(key, value)
      }
    })
  }
  analyse() {
    this._V_analyse()
    // 处理children列表
    this.replaceManager.restore(this.get())
  }
  _V_analyseConfig(key, value) {
    // 重写
    return
  }
  _V_analyse() {
    // 重写
    return
  }
  updateCompConfig() {
    this.compConfig.forEach((c) => {
      this.updateConfig(c[0], c[1])
    })
  }
}

export default Component
