// 模板替换器基类
//

import Replace from '../replace.mjs'

class Template extends Replace {
  constructor(name, config, replaceDict) {
    super('template', name, replaceDict)
    this.config = config
  }
}

export default Template
