import Node from '../node.mjs'

class Component extends Node {
  constructor(name, config, src, replaceManager) {
    super('component', name, src)
    this.config = config
    this.replaceManager = replaceManager
    this.baseKey = this.baseKey.concat(
      [
        ['float',       'f',        'left',   'right',    'none',     'center',     ['none', 'center', 'left', 'right'],    'none'], // 浮动情况
        ['clear',       'c',        ['none',  'center',   'left',     'right',      'both'],          'none'],          // clear情况
        ['maxWidth',    'maxW',     null,     '100%'],                // 最大宽度
        ['maxHeight',   'maxH',     null,     'none'],                // 最大高度
        ['minWidth',    'minW',     null,     'none'],                // 最小宽度
        ['minHeight',   'minH',     null,     'none'],                // 最小高度
        ['width',       'w',        null,     'auto'],                // 宽度
        ['height',      'h',        null,     'auto'],                // 高度
        ['color',       null,       'DEFAULT'],                       // 文字颜色 DEFAULT则不设置
        ['fontSize',    'FS',       null,     'DEFAULT'],             // 文字大小 同上
        ['fontFamily',  'FF',       null,     'DEFAULT'],             // 字体 同上
        ['classList',   'class',    null,     [],     (key, value, configValue) => configValue.concat(value.split(';').filter((value) => { return value !== '' }))], // 类名列表
        ['styleList',   'style',    null,     [],     (key, value, configValue) => configValue.concat(value.split(';').filter((value) => { return value !== '' }))], // 样式列表
        ['baseURL',     null,       ''] // 基础路径
      ]
    )
    this.nodeConfig = {
      key:        parseInt(Math.random() * 1000000)
    }
    this.configList = [] // 组件设置区域
    this.dataList = [] // 组件数据区域
    this.compInit()
  }
  compInit() {
    const i = this.contentList.indexOf('-')
    if (i === -1) this.dataList = this.contentList
    else {
      this.contentList.forEach((d, index) => {
        if (index === 0) return
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
        content: body.slice(data.startBegin, i + 1)
      }
    } else {
      return {
        match: false
      }
    }
  }
  build(nodeStack) {
    /**
     * 检查前面是否有config
     */
    this.checkConfig(nodeStack)
    /**
     * config设置
     */
    this.configAnalyse(this.configList, true)
    /**
     * 解析组件数据
     */
    this.analyse()
    /**
     * 向组件树插入本组件
     */
    nodeStack[nodeStack.length - 1].children.push(this.get())
  }
  checkConfig(nodeStack) {
    let i = nodeStack[nodeStack.length - 1].children.length
    let temp = []
    while (--i >= 0 && nodeStack[nodeStack.length - 1].children[i].type === 'config') {
      console.log(nodeStack[nodeStack.length - 1].children[i])
      temp = temp.concat(nodeStack[nodeStack.length - 1].children[i].config.configList)
    }
    temp = temp.reverse()
    this.configList = this.configList.concat(temp)
  }
  analyse() {
    /**
     * 子类解析组件数据
     */
    this._V_analyse()
    /**
     * 处理children列表
     */
    this.replaceManager.restore(this.get())
  }
  _V_analyse() {
    // 重写
    return
  }
}

export default Component
