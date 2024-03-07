// 替换器基类
//

import Token from '../token.mjs'

class Replace extends Token {
  constructor(type, name, replaceDict) {
    super(type, name)
    this.replaceDict = replaceDict
    /**
     * 根据 | 拆分后的数据列表
     */
    this.contentList = []
    /**
     * 删除了开头和结尾两个字符，删除换行符等的字符串
     */
    this.src = ''
    this.init()
  }

  /**
   * 权重 在进行替换器排序的时候使用 在部分情况需要控制顺序时有用
   */
  static weight = 1

  init() {
    if (this.replaceDict[this.type] === undefined) this.replaceDict[this.type] = []
  }

  /**
   * 返回一个允许使用的替换字符串
   * 会根据该替换器类型确定字符串的部分信息
   * @returns 允许替换的字符串
   */
  getReplaceStr() {
    const now = new Date().getTime().toString()
    let replaceStr = now + this.type + Math.floor(Math.random() * 1000000).toString()
    let a = 0
    while (this.replaceDict[this.type].find((item) => item.key === replaceStr) !== undefined && a++ < 100) {
      replaceStr += this.type + Math.floor(Math.random() * 1000000).toString()
    }
    return replaceStr
  }

  /**
   * 替换函数
   * @returns 替换的键值
   */
  replace() {
    // 获取替换键值
    const key = this.getReplaceStr()
    // 处理模板用户设置的内容
    this.configAnalyse(this.contentList)
    // 后处理确定content
    const needPush = this._V_afterReplace()
    // 获取自身节点
    const value = this.get()
    // 用自身content内容创建文本节点
    if (this.content !== '' && needPush) {
      const textNode = this.createTextNode(value.content)
      value.children.push(textNode)
    }
    // 向替换字典中推入该节点
    this.replaceDict[this.type].push({
      key: key,
      value: value
    })
    // 返回替换键值
    return key
  }

  /**
   * 模板模块可以用
   * 后处理确定content函数
   * 模板模块可以选择重写
   * @returns 是否需要push textNode
   */
  _V_afterReplace() {
    return true
  }

  /**
   * 标签语法可以用
   * 替换内容处理函数
   * 会将替换内容赋值给token的内容
   * 需要注意的是，token的content会在渲染中起到作用
   * 匹配到的内容不一定都是要渲染的content
   * 子类基本上要重写
   * @param {String} content 匹配到的需要替换的内容
   */
  _V_replaceSelf(content) {
    this.content = content.trim()
  }

  /**
   * 拆分替换回数据
   * 替换只对类型为text的节点进行
   * @param {Object} node 节点
   */
  restore(node) {
    const searchText = (node, parent = null, index = 0) => {
      if (node.type !== 'text') {
        for (let i = 0; i < node.children.length; i++) {
          searchText(node.children[i], node, i)
        }
      } else {
        const content = node.content
        const replaceList = this.replaceDict[this.type]
        for (let i = 0; i < replaceList.length; i++) {
          const r = replaceList[i]
          if (content.indexOf(r.key) !== -1) {
            const index_ = content.indexOf(r.key)
            replaceList.splice(i, 1) // 删除匹配到的
            const beforeNode = this.createTextNode(content.slice(0, index_))
            const newNode = r.value
            const afterNode = this.createTextNode(content.slice(index_ + r.key.length))
            const res = []
            if (beforeNode.content !== '') res.push(beforeNode)
            res.push(newNode)
            if (afterNode.content !== '') res.push(afterNode)
            parent.children.splice(index, 1, ...res)
            return
          }
        }
      }
    }
    searchText(node)
  }
  /**
   * 模板模块判别函数
   * @param {Array} contentList 数据列表
   * @param {String} content 去除{{}}的内容
   * @returns 判别结果
   */
  judge(contentList, content) {
    this.src = content
    if (this._V_nameList.indexOf(contentList[0].trim()) !== -1) {
      contentList.forEach((c, i) => {
        if (i === 0) return
        this.contentList.push(c.trim())
      })
      return true
    } else return false
  }
}

export default Replace
