class EventManager {
  constructor() {
    this.eventMap = new Map() // 组件之间的事件处理
    this.closeFuncList = [] // 当触发关闭的时候调用的函数列表（释放绑定事件）
  }

  /**
   * 添加资源释放函数
   * @param {Function} func 释放函数
   * @param {*} params 传参
   * @returns this
   */
  addCloseFunc(func, params) {
    this.closeFuncList.push([func, params])
    return this
  }

  /**
   * 调用关闭销毁前需要的资源释放函数
   */
  close() {
    this.closeFuncList.forEach((func) => {
      try {
        func[0](...func[1])
      } catch {
        //
      }
    })
    this.closeFuncList = []
    this.eventMap = new Map()
  }

  /**
   * 添加事件监听函数
   * @param {String} name 事件名称
   * @param {Function} func 函数
   * @param {Array} params 调用数组
   */
  addEventListener(name, func, ...params) {
    if (this.eventMap.get(name) === undefined) this.eventMap.set(name, [])
    this.eventMap.get(name).push([func, params])
  }

  /**
   * 移除监听函数
   * @param {String} name 事件名称
   * @param {Function} func 函数
   */
  removeEventListener(name, func) {
    const list = this.eventMap.get(name)
    if (Array.isArray(list)) {
      this.eventMap.set(name, list.filter((item) => item[0] !== func))
    }
  }

  /**
   * 触发事件
   * @param {String} name 事件名称
   */
  triggerEvent(name, data) {
    const list = this.eventMap.get(name)
    if (Array.isArray(list)) {
      list.forEach((item) => {
        item[0](data, ...item[1])
      })
    }
  }
}

export default EventManager
