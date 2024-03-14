import Token from '../token.mjs'

/**
 * 节点基类
 */
class Node extends Token {
  constructor(type, name, src) {
    super(type, name)
    /**
     * 根据 | 拆分后的数据列表
     */
    this.contentList = []
    /**
     * 完整的匹配字符串
     */
    this.sourceContent = src
    /**
     * 删除了开头和结尾两个字符，删除换行符等的字符串
     */
    this.src = src.replace(/\n|\r|\t/g, '').slice(2, -2)
    this.dataInit()
  }

  /**
   * 通过|分割src
   */
  dataInit() {
    this.contentList = this.src.split('|')
    for (let i = 0; i < this.contentList.length; i++) {
      this.contentList[i] = this.contentList[i].trim()
    }
  }

  static paraAnalyse = (i, body, data) => {
    let temp = body.slice(data.startEnd + 1, i).trim()
    const res = []
    temp = temp.split('\n\n') // 划分细节
    temp.forEach((data) => {
      const t = data.trim()
      if (t === '') return
      res.push(t)
    })
    return res
  }

  build(nodeStack) {
    return
  }

  /**
   * 节点判别函数
   * @returns 是否是该节点
   */
  judge() {
    if (this._V_nameList.indexOf(this.contentList[0]) !== -1) {
      return true
    } else {
      return false
    }
  }
}

export default Node
