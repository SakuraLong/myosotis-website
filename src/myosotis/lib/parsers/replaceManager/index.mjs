import Labels from './labels/labels.mjs'
import Grammars from './grammars/grammars.mjs'
import Templates from './templates/templates.mjs'
import Modules from './modules/modules.mjs'
import EscapeCharacters from './escapeCharacters.mjs'

class ReplaceManager {
  constructor(config) {
    this.config = config
    this.replaceDict = {}
    this.labels = new Labels(this.config, this.replaceDict)
    this.grammars = new Grammars(this.config, this.replaceDict)
    this.templates = new Templates(this.config, this.replaceDict)
    this.modules = new Modules(this.config, this.replaceDict)
    this.escapeCharacters = new EscapeCharacters(this.config)
  }
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
