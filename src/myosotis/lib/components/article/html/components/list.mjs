import ComponentRenderer from './component.mjs'

class List extends ComponentRenderer {
  /**
   * 组件名字
   * 必须与parser里面写的一样
   */
  static name = 'list'
  constructor(config, node, map, data) {
    super('list', config, node, map, data)
  }

  /**
   * 渲染函数
   * @returns 对象 text: Boolean 是否是text true会使用append将element插入挂载元素 false会使用appendChild将element插入挂载元素
   */
  _V_renderSelf() {
    const config = this.config
    // console.log(config)
    /* ----- 组件标签定义 ----- */
    const listContainer = document.createElement('div')
    /* ----- 标签类设置 ----- */
    listContainer.classList.add('sa-list-container')
    listContainer.classList.add('sa-list-main-container')
    config.classList.forEach((className) => {
      listContainer.classList.add(className)
    })
    /* ----- 组件子元素加入 ----- */
    this.renderChildren(listContainer, this.node.children, {
      olul: ListOlulRenderer
    })
    /* ----- 组件信息计算 ----- */
    /* ----- 标签attr设置 ----- */
    /* ----- 标签style设置 ----- */
    this.setStyle(listContainer, config)
    /* ----- 标签结构构建 ----- */
    /* ----- 返回组件信息 ----- */
    return {
      text: false,
      element: listContainer
    }
  }
}

class ListOlulRenderer extends ComponentRenderer {
  /**
   * 组件名字
   * 必须与parser里面写的一样
   */
  static name = 'olul'
  constructor(config, node, map, data) {
    super('olul', config, node, map, data)
  }
  /**
   * 渲染函数
   * @returns 对象 text: Boolean 是否是text true会使用append将element插入挂载元素 false会使用appendChild将element插入挂载元素
   */
  _V_renderSelf() {
    const config = this.config
    // console.log(config)
    /* ----- 组件标签定义 ----- */
    const olul = document.createElement(config.order ? 'ol' : 'ul')
    /* ----- 标签类设置 ----- */
    /* ----- 组件子元素加入 ----- */
    this.renderChildren(olul, this.node.children, {
      olul: ListOlulRenderer,
      li: ListLiRenderer
    })
    /* ----- 组件信息计算 ----- */
    /* ----- 标签attr设置 ----- */
    /* ----- 标签style设置 ----- */
    /* ----- 标签结构构建 ----- */
    /* ----- 返回组件信息 ----- */
    return {
      text: false,
      element: olul
    }
  }
}

class ListLiRenderer extends ComponentRenderer {
  /**
   * 组件名字
   * 必须与parser里面写的一样
   */
  static name = 'li'
  constructor(config, node, map, data) {
    super('li', config, node, map, data)
  }
  /**
   * 渲染函数
   * @returns 对象 text: Boolean 是否是text true会使用append将element插入挂载元素 false会使用appendChild将element插入挂载元素
   */
  _V_renderSelf() {
    const config = this.config
    /* ----- 组件标签定义 ----- */
    const li = document.createElement('li')
    const liContent = document.createElement('span')
    const liChildren = document.createElement('span')
    /* ----- 标签类设置 ----- */
    li.classList.add('sa-list-li')
    /* ----- 组件子元素加入 ----- */
    const contentList = this.node.children.splice(0, 2)
    const childrenList = this.node.children
    this.renderChildren(liContent, contentList, {
      symbol: ListSymbolRenderer
    })
    this.renderChildren(liChildren, childrenList, {
      olul: ListOlulRenderer
    })
    /* ----- 组件信息计算 ----- */
    /* ----- 标签attr设置 ----- */
    /* ----- 标签style设置 ----- */
    /* ----- 标签结构构建 ----- */
    li.appendChild(liContent)
    li.appendChild(liChildren)
    /* ----- 返回组件信息 ----- */
    return {
      text: false,
      element: li
    }
  }
}

class ListSymbolRenderer extends ComponentRenderer {
  /**
   * 组件名字
   * 必须与parser里面写的一样
   */
  static name = 'symbol'
  constructor(config, node, map, data) {
    super('symbol', config, node, map, data)
  }
  /**
   * 渲染函数
   * @returns 对象 text: Boolean 是否是text true会使用append将element插入挂载元素 false会使用appendChild将element插入挂载元素
   */
  _V_renderSelf() {
    const config = this.config
    // console.log(config)
    /* ----- 组件标签定义 ----- */
    const span = document.createElement('span')
    /* ----- 标签类设置 ----- */
    span.classList.add('sa-list-li-index')
    /* ----- 组件子元素加入 ----- */
    span.textContent = config.symbol
    /* ----- 组件信息计算 ----- */
    /* ----- 标签attr设置 ----- */
    /* ----- 标签style设置 ----- */
    /* ----- 标签结构构建 ----- */
    /* ----- 返回组件信息 ----- */
    return {
      text: false,
      element: span
    }
  }
}

export default List
