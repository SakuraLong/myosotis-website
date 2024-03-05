import Node from '../node.mjs'

class Config extends Node {
  constructor(config, src, replaceManager) {
    super('config', 'config', src)
    this.config = config
    this.replaceManager = replaceManager
    this.nodeConfig = {
      configList:     []    // 设置的config列表，会加到下一个组件中
    }
  }
  static begin(i, body, data, index) {
    if (body[i] === '?' && body.slice(i + 1, i + 8) === 'config ' && (i === 0 || (i > 0 && body[i - 1] === '\n'))) {
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
    if (body[i] === '\n' || i === body.length - 1) {
      data.startEnd = i
      data.status = -1
      return {
        match: true,
        content: body.slice(data.startBegin + 8, i + 1)
      }
    } else {
      return {
        match: false
      }
    }
  }
  build(nodeStack) {
    this.updateConfig('configList', this.contentList)
    nodeStack[nodeStack.length - 1].children.push(this.get())
  }
}

export default Config
