import Token from '../token.mjs'

class Node extends Token {
  constructor(type, name, src) {
    super(type, name)
    this.src = src.replace(/\n|\r|\t/g, '')
    this.fullSrc = src
    this.data = []
    this.dataInit()
  }
  dataInit() {
    // 通过|分割src
    this.data = this.src.split('|')
    for (let i = 0; i < this.data.length; i++) {
      this.data[i] = this.data[i].trim()
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
}

export default Node
