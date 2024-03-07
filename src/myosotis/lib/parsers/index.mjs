// 将文章内容转化成组件树
//

import StackManager from './stackManager/index.mjs'
import ReplaceManager from './replaceManager/index.mjs'

class Parser {
  constructor(config, article, data) {
    /**
     * 完整的配置项
     */
    this.config = config
    /**
     * 文章内容
     */
    this.article = article
    /**
     * 一些数据，暂留，不一定有用
     */
    this.data = data
    /**
     * ReplaceManager 替换控制器
     * 组件树构建前替换
     * 组件树构建后恢复
     */
    this.replaceManager = new ReplaceManager(this.config)
    /**
     * StackManager 栈控制器
     * 组件树构建器
     */
    this.stackManager = new StackManager(this.config, this.replaceManager)
  }
  /**
   * 构建组件树
   * @returns 组件树
   */
  build() {
    const replaceRes = this.replaceManager.replace(this.article)
    const tree = this.stackManager.build(replaceRes)
    return tree
  }
}

export default Parser
