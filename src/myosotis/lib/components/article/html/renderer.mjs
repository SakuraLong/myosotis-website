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
    return {
      text: true,
      element: ''
    }
  }

  /**
   * 向挂载对象里挂载html元素
   * @param {Object} parent 节点内容挂载对象
   * @param {Object} node 节点
   */
  renderChildren(parent, node) {
    const l = node.children.length
    for (let i = 0; i < l; i++) {
      if (this.previewFinishRender()) break
      const child = node.children[i]
      console.log('渲染器映射表查找：type：' + child.type + ' name：' + child.name)
      const ChildRenderer = this.map.get(child.type).get(child.name)
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
