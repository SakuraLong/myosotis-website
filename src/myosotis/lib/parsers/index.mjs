import StackManager from './stackManager/index.mjs'
import ReplaceManager from './replaceManager/index.mjs'

class Parser {
  constructor(config, article, data) {
    this.config = config
    this.article = article
    this.data = data
    this.stackManager = new StackManager()
  }
  build() {
    const replaceManager = new ReplaceManager(this.config)
    const replaceRes = replaceManager.replace(this.article)
    const stackManager = new StackManager(this.config, replaceManager)
    const tree = stackManager.build(replaceRes)
    return tree
  }
}

export default Parser
