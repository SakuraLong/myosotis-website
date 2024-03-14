import ComponentRenderer from './component.mjs'

class Table extends ComponentRenderer {
  /**
   * 组件名字
   * 必须与parser里面写的一样
   */
  static name = 'table'
  constructor(config, node, map, data) {
    super('table', config, node, map, data)
  }

  /**
   * 渲染函数
   * @returns 对象 text: Boolean 是否是text true会使用append将element插入挂载元素 false会使用appendChild将element插入挂载元素
   */
  _V_renderSelf() {
    const config = this.config
    // console.log(config)
    /* ----- 组件标签定义 ----- */
    const tableContainer = document.createElement('div')
    const table = document.createElement('table')
    /* ----- 标签类设置 ----- */
    tableContainer.classList.add('sa-table-container')
    table.classList.add('sa-table')

    config.classList.forEach((className) => {
      table.classList.add(className)
    })
    /* ----- 组件子元素加入 ----- */
    this.renderChildren(table, this.node.children, {
      tbh: TableTHBRenderer
    })
    /* ----- 组件信息计算 ----- */
    /* ----- 标签attr设置 ----- */
    table.setAttribute('border', '0')
    table.setAttribute('cellpadding', '0')
    table.setAttribute('cellspacing', '0')
    /* ----- 标签style设置 ----- */
    this.setStyle(table, config)
    /* ----- 标签结构构建 ----- */
    tableContainer.appendChild(table)
    /* ----- 返回组件信息 ----- */
    return {
      text: false,
      element: tableContainer
    }
  }
}

class TableTHBRenderer extends ComponentRenderer {
  /**
   * 组件名字
   * 必须与parser里面写的一样
   */
  static name = 'tbh'
  constructor(config, node, map, data) {
    super('tbh', config, node, map, data)
  }

  /**
   * 渲染函数
   * @returns 对象 text: Boolean 是否是text true会使用append将element插入挂载元素 false会使用appendChild将element插入挂载元素
   */
  _V_renderSelf() {
    const config = this.config
    // console.log(config)
    /* ----- 组件标签定义 ----- */
    const tbh = document.createElement(config.type)
    /* ----- 标签类设置 ----- */
    if (config.type === 'thead') {
      tbh.classList.add('sa-table__thead')
    } else if (this.type === 'tbody') {
      tbh.classList.add('sa-table__tbody')
    }
    /* ----- 组件子元素加入 ----- */
    this.renderChildren(tbh, this.node.children, {
      tr: TableTrRenderer
    })
    /* ----- 组件信息计算 ----- */
    /* ----- 标签attr设置 ----- */
    /* ----- 标签style设置 ----- */
    /* ----- 标签结构构建 ----- */
    /* ----- 返回组件信息 ----- */
    return {
      text: false,
      element: tbh
    }
  }
}

class TableTrRenderer extends ComponentRenderer {
  /**
   * 组件名字
   * 必须与parser里面写的一样
   */
  static name = 'tr'
  constructor(config, node, map, data) {
    super('tr', config, node, map, data)
  }

  /**
   * 渲染函数
   * @returns 对象 text: Boolean 是否是text true会使用append将element插入挂载元素 false会使用appendChild将element插入挂载元素
   */
  _V_renderSelf() {
    const config = this.config
    // console.log(config)
    /* ----- 组件标签定义 ----- */
    const tr = document.createElement('tr')
    /* ----- 标签类设置 ----- */
    /* ----- 组件子元素加入 ----- */
    this.renderChildren(tr, this.node.children, {
      td: TableTdRenderer
    })
    /* ----- 组件信息计算 ----- */
    /* ----- 标签attr设置 ----- */
    /* ----- 标签style设置 ----- */
    /* ----- 标签结构构建 ----- */
    /* ----- 返回组件信息 ----- */
    return {
      text: false,
      element: tr
    }
  }
}

class TableTdRenderer extends ComponentRenderer {
  /**
   * 组件名字
   * 必须与parser里面写的一样
   */
  static name = 'td'
  constructor(config, node, map, data) {
    super('td', config, node, map, data)
  }

  /**
   * 渲染函数
   * @returns 对象 text: Boolean 是否是text true会使用append将element插入挂载元素 false会使用appendChild将element插入挂载元素
   */
  _V_renderSelf() {
    const config = this.config
    // console.log(config)
    /* ----- 组件标签定义 ----- */
    const td = document.createElement('td')
    /* ----- 标签类设置 ----- */
    td.classList.add('sa-table__td--border')
    /* ----- 组件子元素加入 ----- */
    this.renderChildren(td, this.node.children)
    /* ----- 组件信息计算 ----- */
    /* ----- 标签attr设置 ----- */
    if (config.c !== 1) td.setAttribute('colSpan', config.c)
    if (config.r !== 1) td.setAttribute('rowSpan', config.r)
    /* ----- 标签style设置 ----- */
    /* ----- 标签结构构建 ----- */
    config.display = config.display ? 'table-cell' : 'none'
    this.setStyle(td, config, ['r'])
    /* ----- 返回组件信息 ----- */
    return {
      text: false,
      element: td
    }
  }
}

export default Table
