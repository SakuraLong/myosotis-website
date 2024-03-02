import Token from '../token.mjs'

class Replace extends Token {
  constructor(type, name, replaceDict) {
    super(type, name)
    this.replaceDict = replaceDict
    this.init()
  }
  static weight = 1
  init() {
    if (this.replaceDict[this.type] === undefined) this.replaceDict[this.type] = []
    // if (this.replaceDict[this.type][this.name] === undefined) this.replaceDict[this.type][this.name] = []
  }
  getReplaceStr() {
    const now = new Date().getTime().toString()
    let replaceStr = now + this.type + Math.floor(Math.random() * 1000000).toString()
    let a = 0
    while (this.replaceDict[this.type].find((item) => item.key === replaceStr) !== undefined && a++ < 100) {
      replaceStr += this.type + Math.floor(Math.random() * 1000000).toString()
    }
    return replaceStr
  }
  replaceSelf(content) {
    this.content = content
  }
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
}

export default Replace
