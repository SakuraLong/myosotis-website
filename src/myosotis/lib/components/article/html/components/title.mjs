import ComponentRenderer from './component.mjs'

class Title extends ComponentRenderer {
  /**
   * 渲染数据注册
   * 如果组件希望有全局的数据，则可以在此注册
   */
  static data = {
    title: []
  }
  /**
   * 组件名字
   * 必须与parser里面写的一样
   */
  static name = 'title'
  constructor(config, node, map, data) {
    super('title', config, node, map, data)
  }

  /**
   * 渲染函数
   * @returns 对象 text: Boolean 是否是text true会使用append将element插入挂载元素 false会使用appendChild将element插入挂载元素
   */
  _V_renderSelf() {
    const config = this.config
    // console.log(config)
    /* ----- 组件标签定义 ----- */
    const h = document.createElement('h' + config.level.toString())
    const span = document.createElement('span')
    const a = document.createElement('a')
    /* ----- 标签类设置 ----- */
    h.classList.add('sa-title')
    a.classList.add('sa-title__a')
    if (config.textAlign === 'center' || config.textAlign === 'c') {
      h.classList.add('sa-title--center')
    } else {
      h.classList.add('sa-title--left')
    }
    if (config.borderPosition === 'bottom' || config.borderPosition === 'b') {
      h.classList.add('sa-title--border-bottom')
    } else if (config.borderPosition === 'none' || config.borderPosition === 'n') {
      //
    } else {
      h.classList.add('sa-title--border-left')
    }
    if (config.hoverAnimation && (config.borderPosition === 'bottom' || config.borderPosition === 'b')) {
      h.classList.add('sa-title--border-bottom--ani')
    } else if (config.hoverAnimation && (config.borderPosition === 'left' || config.borderPosition === 'l')) {
      h.classList.add('sa-title--border-left--ani')
    }
    config.classList.forEach((className) => {
      h.classList.add(className)
    })
    /* ----- 组件子元素加入 ----- */
    this.renderChildren(span, this.node)
    a.textContent = '#'
    /* ----- 组件信息计算 ----- */
    const content = span.textContent
    const tid = config.id || content
    let i = 0
    console.log(this.data.title)
    while (this.data.title.find((item) => item.id === tid + (i === 0 ? '' : '_' + i.toString())) !== undefined) {
      i++
    }
    const id = tid + (i === 0 ? '' : '_' + i.toString())
    this.data.title.push({
      id: id,
      level:config.level
    })
    /* ----- 标签attr设置 ----- */
    h.setAttribute('data-title', content)
    h.setAttribute('id', id)
    h.setAttribute('style', config.style)
    span.setAttribute('data-title', content)
    a.setAttribute('href', '#' + id)
    a.setAttribute('aria-hidden', true)
    /* ----- 标签style设置 ----- */
    this.setStyle(h, config)
    /* ----- 标签结构构建 ----- */
    h.appendChild(span)
    if (config.hasLink) h.appendChild(a)
    /* ----- 返回组件信息 ----- */
    return {
      text: false,
      element: h
    }
  }
}

export default Title
