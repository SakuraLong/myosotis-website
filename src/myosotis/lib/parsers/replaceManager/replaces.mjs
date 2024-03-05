// 控制替换器父类
//

class Replaces {
  constructor(config, replaceDict) {
    this.config = config
    this.replaceDict = replaceDict
    this.parsers = []
  }

  /**
   * 初始化排序 需要在子类设置parsers后调用
   * 根据config加入新的可替换信息
   */
  init() {
    this.parsers.sort((a, b) => a.weight - b.weight)
  }

  /**
   * 替换函数 基本上子类要重写
   * @param {String} src 待替换字符串
   * @returns 替换完成的字符串
   */
  replace(src) {
    this.parsers.forEach((Parser) => {
      /**
       * grammar和label替换需要注意
       * 在此情况下进行替换只会创建一个替换器实例，需要避免浅拷贝
       * 实际上不会影响渲染结果，因为浅拷贝的是拷贝children里面的内容
       * 但是渲染的时候是渲染content的内容
       * 不过深拷贝之后可以避免children存储无效的数据
       */
      src = new Parser(this.config, this.replaceDict).replace(src)
    })
    return src
  }

  /**
   * 拆分替换函数
   * @param {Object} node 节点
   */
  restore(node) {
    this.parsers.forEach((Parser) => {
      new Parser(this.config, this.replaceDict).restore(node)
    })
  }
}

export default Replaces
