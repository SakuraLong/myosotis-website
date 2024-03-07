import Myosotis from '@/myosotis'

class PoemRenderer extends Myosotis.TemplateRenderer {
  static name = 'poem'
  constructor(config, node, map, data) {
    super('poem', config, node, map, data)
  }
  _V_renderSelf() {
    const config = this.config
    /* ----- 组件标签定义 ----- */
    const pre = document.createElement('pre')
    /* ----- 标签类设置 ----- */
    /* ----- 组件子元素加入 ----- */
    this.renderChildren(pre, this.node, {
      title: PoemTitleRenderer,
      author: PoemAuthorRenderer
    })
    /* ----- 组件信息计算 ----- */
    /* ----- 标签attr设置 ----- */
    /* ----- 标签style设置 ----- */
    pre.style.fontFamily = '"Microsoft YaHei", "SimSun", sans-serif'
    pre.style.lineHeight = '2'
    pre.style.textAlign = 'center'
    pre.style.overflowWrap = 'break-word'
    pre.style.whiteSpace = 'pre-wrap'
    /* ----- 标签结构构建 ----- */
    /* ----- 返回组件信息 ----- */
    return {
      text: false,
      element: pre
    }
  }
}

/**
 * poem渲染器title辅助渲染类
 */
class PoemTitleRenderer extends Myosotis.TemplateRenderer {
  static name = 'poem'
  constructor(config, node, map, data) {
    super('poem', config, node, map, data)
  }
  _V_renderSelf() {
    const config = this.config
    /* ----- 组件标签定义 ----- */
    const titleSpan = document.createElement('span')
    /* ----- 标签类设置 ----- */
    /* ----- 组件子元素加入 ----- */
    this.renderChildren(titleSpan, this.node)
    /* ----- 组件信息计算 ----- */
    /* ----- 标签attr设置 ----- */
    /* ----- 标签style设置 ----- */
    titleSpan.style.fontWeight = 'bold'
    titleSpan.style.fontFamily = 'Georgia, Times, "Times New Roman", STKaiti, KaiTi, serif'
    titleSpan.style.fontSize = '1.5em'
    titleSpan.style.display = 'inline-block'
    titleSpan.style.width = '100%'
    /* ----- 标签结构构建 ----- */
    /* ----- 返回组件信息 ----- */
    return {
      text: false,
      element: titleSpan
    }
  }
}

/**
 * poem渲染器author辅助渲染类
 */
class PoemAuthorRenderer extends Myosotis.TemplateRenderer {
  static name = 'poem'
  constructor(config, node, map, data) {
    super('poem', config, node, map, data)
  }
  _V_renderSelf() {
    const config = this.config
    /* ----- 组件标签定义 ----- */
    const authorSpan = document.createElement('span')
    /* ----- 标签类设置 ----- */
    /* ----- 组件子元素加入 ----- */
    this.renderChildren(authorSpan, this.node)
    /* ----- 组件信息计算 ----- */
    /* ----- 标签attr设置 ----- */
    /* ----- 标签style设置 ----- */
    authorSpan.style.fontFamily = 'Arial, Helvetica, STKaiti, KaiTi, sans-serif'
    authorSpan.style.fontSize = '1.1em'
    authorSpan.style.display = 'inline-block'
    authorSpan.style.width = '100%'
    /* ----- 标签结构构建 ----- */
    /* ----- 返回组件信息 ----- */
    return {
      text: false,
      element: authorSpan
    }
  }
}

export default PoemRenderer
