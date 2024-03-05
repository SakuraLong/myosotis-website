// 文章内容替换与换回
//

import Labels from './labels/labels.mjs'
import Grammars from './grammars/grammars.mjs'
import Templates from './templates/templates.mjs'
import Modules from './modules/modules.mjs'
import EscapeCharacters from './escapeCharacters.mjs'

class ReplaceManager {
  constructor(config) {
    this.config = config
    /**
     * 替换字典
     */
    this.replaceDict = {}
    /**
     * Labels 标签替换器
     */
    this.labels = new Labels(this.config, this.replaceDict)
    /**
     * 语法替换器
     */
    this.grammars = new Grammars(this.config, this.replaceDict)
    /**
     * 模板替换器
     */
    this.templates = new Templates(this.config, this.replaceDict)
    /**
     * 模块替换器
     */
    this.modules = new Modules(this.config, this.replaceDict)
    /**
     * 转义字符替换器
     */
    this.escapeCharacters = new EscapeCharacters(this.config)
  }

  /**
   * 替换文章的信息
   * @param {String} src 文章内容
   * @returns 替换之后的文章内容
   */
  replace(src) {
    // label-before grammar template module label-after
    src = this.escapeCharacters.replace(src)
    src = this.labels.replaceBefore(src)
    src = this.grammars.replace(src)
    src = this.templates.replace(src)
    src = this.modules.replace(src)
    src = this.labels.replaceAfter(src)
    return src
  }

  /**
   * 将节点里面的纯文本拆分替换为其他节点
   * @param {Object} node 节点
   */
  restore(node) {
    // label-after module template grammar label-before
    this.labels.restoreAfter(node)
    this.modules.restore(node)
    this.templates.restore(node)
    this.grammars.restore(node)
    this.labels.restoreBefore(node)
  }
}

export default ReplaceManager
