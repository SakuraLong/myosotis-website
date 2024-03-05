// 将文章内容转化成组件树
//

import StackManager from './stackManager/index.mjs'
import ReplaceManager from './replaceManager/index.mjs'

class Parser {
  constructor(config, article, data) {
    this.config = config
    this.article = article
    this.data = data
    /**
     * StackManager 栈控制器
     * 组件树构建器
     */
    this.stackManager = new StackManager()
    /**
     * ReplaceManager 替换控制器
     * 组件树构建前替换
     * 组件树构建后恢复
     */
    this.replaceManager = new ReplaceManager()
  }
  /**
   * 构建组件树
   * @returns 组件树
   */
  build() {
    const replaceRes = this.replaceManager.replace(this.article)
    const stackManager = new StackManager(this.config, this.replaceManager)
    const tree = stackManager.build(replaceRes)
    return tree
  }
}

export default Parser
