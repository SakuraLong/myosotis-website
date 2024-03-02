/**
 * {
 *  type: String,
 *  name: String,
 *  level: Number,
 *  config: Object,
 *  content: String,
 *  children: Array
 * }
 */

class Token {
  constructor(type, name) {
    this.type = type
    this.name = name
    this.level = 0
    this.nodeConfig = {}
    this.content = ''
    this.children = []
  }
  get() {
    return {
      type:       this.type,
      name:       this.name,
      level:      this.level,
      config:     this.nodeConfig,
      content:    this.content,
      children:   this.children
    }
  }
  create(content, tn) {
    return {
      type:       tn,
      name:       tn,
      level:      0,
      config:     {},
      content:    content,
      children:   []
    }
  }
  createTextNode(content) {
    return this.create(content, 'text')
  }
  createHtmlNode(element) {
    return this.create(element, 'html')
  }
  updateConfig(key, value, judge = null) {
    if (judge === null) {
      Object.assign(this.nodeConfig, {
        [key]: value
      })
    } else {
      if (value !== judge) {
        Object.assign(this.nodeConfig, {
          [key]: value
        })
      }
    }
  }
}

export default Token
