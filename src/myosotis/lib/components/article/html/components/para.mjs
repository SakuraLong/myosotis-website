import ComponentRenderer from './component.mjs'

class Paragraph extends ComponentRenderer {
  static name = 'paragraph'
  constructor(config, node, map, data) {
    super(config, node, map, data)
  }
  _V_renderSelf() {
    const config = this.config
    /* ----- 组件标签定义 ----- */
    const div = document.createElement('div')
    const divType = document.createElement('div')
    const pTitle = document.createElement('p')
    const p = document.createElement('p')
    /* ----- 标签类设置 ----- */
    div.classList.add('sa-pre-para')
    divType.classList.add('sa-para')
    divType.classList.add('sa-para--border')
    pTitle.classList.add('sa-para-custom-block-title')
    p.classList.add('sa-para')
    if (config.border === 'bottom') {
      p.classList.add('sa-para--border-bottom')
    } else if (config.border === 'none') {
      //
    } else {
      p.classList.add('sa-para--border-left')
    }
    if (config.type === 'warning') {
      divType.classList.add('sa-para--border-warning')
    } else if (config.type === 'success') {
      divType.classList.add('sa-para--border-success')
    } else if (config.type === 'tip') {
      divType.classList.add('sa-para--border-tip')
    } else if (config.type === 'info') {
      divType.classList.add('sa-para--border-info')
    }
    config.classList.forEach((className) => {
      p.classList.add(className)
    })
    /* ----- 组件子元素加入 ----- */
    this.renderChildren(p, this.node)
    pTitle.textContent = config.title
    /* ----- 组件信息计算 ----- */
    /* ----- 标签attr设置 ----- */
    p.setAttribute('style', config.style)
    /* ----- 标签style设置 ----- */
    p.style.lineHeight = config.lineHeight
    p.style.border = config.border
    p.style.borderColor = config.bc
    p.style.backgroundColor = config.bgc
    p.style.clear = config.clear
    if (config.fontFamily !== 'DEFAULT') p.style.fontFamily = config.fontFamily
    if (config.fontSize !== 'DEFAULT') p.style.fontSize = config.fontSize
    /* ----- 标签结构构建 ----- */
    // console.log(config)
    if (config.type !== 'default') {
      divType.appendChild(pTitle)
      divType.appendChild(p)
      div.appendChild(divType)
    }
    /* ----- 返回组件信息 ----- */
    if (config.type === 'default') {
      return {
        text: false,
        element: p
      }
    } else {
      return {
        text: false,
        element: div
      }
    }
  }
}

export default Paragraph
