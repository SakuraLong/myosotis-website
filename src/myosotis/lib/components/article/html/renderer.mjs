/**
 * 渲染器基类
 */

class Renderer {
  /**
   * 渲染器需要向渲染数据注册的数据
   */
  static data = null
  /**
   * 渲染器类型，和成员type相同
   */
  static type = null
  /**
   * 渲染器名字，和成员name相同
   */
  static name = null

  constructor(config, node, map, data, type, name) {
    /**
     * 渲染器对应节点的config
     */
    this.config = config
    /**
     * 渲染器对应节点
     */
    this.node = node
    /**
     * type name 与 渲染器 映射表
     */
    this.map = map
    /**
     * 渲染数据
     */
    this.data = data
    /**
     * 配置项中的setting部分
     */
    this.settingConfig = data.settingConfig
    /**
     * 渲染器类型
     */
    this.type = type
    /**
     * 渲染器名字
     */
    this.name = name
    /**
     * 渲染器预览配置项
     */
    this.previewConfig = this.settingConfig.preview
  }

  /**
   * 渲染函数
   * @returns 对象 见_V_renderSelf返回值
   */
  render() {
    this.updateData()
    const res = this._V_renderSelf()
    if (res.text) this.data.data.wordsAmount += res.element.length
    return res
  }

  /**
   * 子类重写的渲染函数
   * @returns 对象 text: Boolean 是否是text true会使用append将element插入挂载元素 false会使用appendChild将element插入挂载元素
   */
  _V_renderSelf() {
    /**
     * 获取节点配置项
     * const config = this.config
     */
    /* ----- 标签定义 ----- */
    /**
     * 定义节点渲染需要的html标签
     */
    /* ----- 标签类设置 ----- */
    /**
     * 为标签设置类名
     */
    /* ----- 子元素加入与标签信息处理 ----- */
    /**
     * 使用 this.renderChildren(节点子元素渲染根标签, 需要渲染的节点) 进行子节点渲染
     * 处理标签的信息
     */
    /* ----- 组件信息计算 ----- */
    /**
     * 如果该节点有些信息需要使用data中的数据
     */
    /* ----- 标签attr设置 ----- */
    /**
     * 为标签设置attribute
     */
    /* ----- 标签style设置 ----- */
    /**
     * 使用 this.setStyle(一般是节点渲染的根标签, config) 为节点标签设置style
     */
    /* ----- 标签结构构建 ----- */
    /**
     * 将标签挨个搭建成需要返回的element
     */
    /* ----- 返回组件信息 ----- */
    /**
     * 纯文本节点：
     * text = true
     * element = 纯文本内容
     * html元素节点：
     * text = false
     * element = 返回的html标签
     */
    return {
      text: true,
      element: ''
    }
  }

  /**
   * 向挂载对象里挂载html元素
   * @param {Object} parent 节点内容挂载对象
   * @param {Object} node 节点
   * @param {Object} rendererMap 渲染器辅助渲染类映射表
   * @param {Boolean} onlyUseSelfMap 查询渲染器时只允许用rendererMap，当且仅当rendererMap不等于null时有用
   *
   * 有一些节点在渲染时可能用一个渲染器类无法简易渲染，因为节点的children可能包含该节点的一些特殊子元素，但是该节点的子元素没必要或者不应该挂载到全局的渲染器映射表上
   * 所以允许节点在进行渲染时，传入自己的渲染器映射表，通过name进行映射，且检索时会优先检索自身的映射表
   *
   * 举例：table渲染器，其包含且仅包含子渲染器thead和tbody，则table
   * rendererMap= {
   *   thead: TableTheadRenderer,
   *   tbody: TableTbodyRenderer
   * }
   * onlyUseSelfMap = true
   * 且只需要注册table渲染器即可
   *
   * 当然同理，TableTheadRenderer、TableTbodyRenderer，其包含且仅包含tr，tr中包含且仅包含td
   * td中可以包含其他
   *
   * 所以也需要对不同需求的进行不同的设计
   *
   * 可能有人会问，为什么不能用html节点进行子元素节点创建，这当然也是可以的
   * 但是如果需要定位每一个元素的信息，并且为标签设置配置项，那么必须要进行渲染器重写，因为html节点的渲染器没有配置项设置，只进行根据节点信息，返回一个html标签
   */
  renderChildren(parent, node, rendererMap = null, onlyUseSelfMap = false) {
    const l = node.children.length
    for (let i = 0; i < l; i++) {
      if (this.previewFinishRender()) break
      const child = node.children[i]
      console.log('渲染器映射表查找：type：' + child.type + ' name：' + child.name)
      let ChildRenderer = null
      if (rendererMap !== null) {
        if (onlyUseSelfMap) ChildRenderer = rendererMap[child.map]
        else ChildRenderer = rendererMap[child.name] === undefined ? this.map.get(child.type).get(child.name) : rendererMap[child.name]
      } else ChildRenderer = this.map.get(child.type).get(child.name)
      if (ChildRenderer === undefined) continue

      const childRenderer = new ChildRenderer(child.config, child, this.map, this.data)
      const res = childRenderer.render()
      if (res.text) parent.append(res.element)
      else parent.appendChild(res.element)
    }
  }

  /**
   * 将配置项里面是style的内容设置给element
   * @param {HTMLElement} element html元素
   * @param {Object} config 节点配置项
   * @param {Array} ignore 忽略名称列表
   */
  setStyle(element, config, ignore = []) {
    for (const key of Object.keys(config)) {
      const value = config[key]
      if (ignore.indexOf(key) !== -1) continue
      if (value === 'DEFAULT') continue
      if (key in element.style) {
        element.style[key] = value
      } else {
        if (key === 'classList' && Array.isArray(value)) {
          value.forEach((className) => {
            element.classList.add(className)
          })
        } else if (key === 'styleList' && Array.isArray(value)) {
          value.forEach((style) => {
            const styleName = style.split('=')[0]
            const left = style.indexOf('=')
            const styleValue = style.slice(left + 1, style.length)
            if (styleName in element.style) {
              element.style[styleName] = styleValue
            }
          })
        }
      }
    }
  }

  /**
   * 更新渲染数据
   */
  updateData() {
    const data = this.data.data[this.type]
    if (data) {
      data.amount++
      if (data.nameList.indexOf(this.name) === -1) data.nameList.push(this.name)
      let detail = data.detail.find((item) => item.name === this.name)
      if (detail === undefined) {
        detail = {
          name: this.name,
          amount: 0
        }
        data.detail.push(detail)
      }
      detail.amount++
    }
  }

  /**
   * 检查是否是预览，以及是否需要打断渲染
   * @returns 是否打断渲染
   */
  previewFinishRender() {
    if (!this.previewConfig.preview) return false
    const data = this.data.data.component
    if (data === undefined) return false
    const viewType = this.previewConfig.viewType
    const viewAmount = this.previewConfig.viewAmount
    switch (viewType) {
      case 'paragraph':
        if (data.detail.find((item) => item.name === viewType) === undefined || data.detail.find((item) => item.name === viewType).amount <= viewAmount) return false
        else return true
      case 'component':
        if (data.amount <= viewAmount) return false
        else return true
      case 'words':
        if (this.data.data.wordsAmount <= viewAmount) return false
        else return true
    }
    return false
  }
}

export default Renderer
