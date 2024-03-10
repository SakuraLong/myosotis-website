import Title from './title.mjs'
import Paragraph from './para.mjs'
import List from './list.mjs'
import Table from './table.mjs'

class Components {
  constructor(config, replaceManager) {
    this.config = config
    this.replaceManager = replaceManager
    this.parsers = [
      Title,
      Paragraph,
      List,
      Table
    ]
    this.init()
  }
  init() {
    this.config.setting.custom.components.forEach((comp) => {
      this.parsers.push(comp.parser)
    })
  }
  build(nodeStack, src, para = false) {
    if (src === '') return
    if (para) {
      new Paragraph(this.config, src, this.replaceManager).build(nodeStack)
    } else {
      for (const Parser of this.parsers) {
        const t = new Parser(
          this.config,
          src,
          this.replaceManager
        )
        if (!t.judge()) continue
        t.build(nodeStack)
        break
      }
    }
  }
}

export default Components
