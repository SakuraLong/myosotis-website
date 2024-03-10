class EventManager {
  constructor() {
    this.betweenEventMap = new Map() // 组件之间的事件处理
    this.closeFuncList = [] // 当触发关闭的时候调用的函数列表（释放绑定事件）
    // console.log(Object.prototype.hasOwnProperty.call(document.createElement('div').style, 'color'))
  }
  addCloseFunc(func, param) {
    this.closeFuncList.push([func, param])
    return this
  }
  close() {
    this.closeFuncList.forEach((func) => {
      try {
        func[0](...func[1])
      } catch {
        //
      }
    })
    this.closeFuncList = []
    this.betweenEventMap = new Map()
  }
}

export default EventManager
