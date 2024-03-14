import LabelRenderer from './label.mjs'

class Code extends LabelRenderer {
  static name = 'code'
  constructor(config, node, map, data) {
    super('code', config, node, map, data)
  }
  _V_renderSelf() {
    const config = this.config
    /* ----- 组件标签定义 ----- */
    const span = document.createElement('span')
    const pre = document.createElement('pre')
    /* ----- 标签类设置 ----- */
    span.classList.add('sr-code-span')
    pre.classList.add('sr-code')
    /* ----- 组件子元素加入 ----- */
    if (config.inline) this.renderChildren(span, this.node.children, null, null, true)
    else this.renderChildren(pre, this.node.children, null, null, true)
    if (this.data.userData.highlight) {
      try {
        if (config.inline) span.innerHTML = this.data.userData.highlight(span.innerHTML, config.lang)
        else pre.innerHTML = this.data.userData.highlight(pre.innerHTML, config.lang)
      } catch {
        //
      }
    } else {
      if (config.inline) span.textContent = config.code
      else pre.textContent = config.code
    }
    /* ----- 组件信息计算 ----- */
    /* ----- 标签attr设置 ----- */
    /* ----- 标签style设置 ----- */
    /* ----- 标签结构构建 ----- */
    /* ----- 返回组件信息 ----- */
    return {
      text: false,
      element: config.inline ? span : pre
    }
  }
}

export default Code
