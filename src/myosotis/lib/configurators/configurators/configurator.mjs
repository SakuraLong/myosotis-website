import utils from '../../../common/utils.mjs'

/**
 * 配置项解析器
 */
class Configurator {
  constructor(status, path = [], modifiable, dataList, prefix = '', statusName = '', baseOption) {
    /**
     * 配置项解析基础路径
     */
    this.basePath = ['option']
    /**
     * 配置项区域的状态
     */
    this.status = status
    /**
     * 当前区域基于basePath的查找方法
     */
    this.path = path // 当前区域如何查找
    /**
     * 是否允许文章区域修改此区域的配置项
     *
     * 默认传值都是true
     *
     * 也可以直接设置true/false
     */
    this.modifiable = modifiable // 是否允许文章区域修改此区域的配置项
    /**
     * 配置项数据列表
     */
    this.dataList = dataList // 当前配置项的数据列表
    /**
     * 配置项前缀
     */
    this.prefix = prefix // 配置项前缀
    /**
     * 配置项状态区域开始标记名称
     */
    this.statusName = statusName // 配置项状态区域开始标记名称
    /**
     * 配置项
     */
    this.baseOption = baseOption // 浅拷贝，直接修改
    /**
     * 深拷贝函数
     */
    this.deepClone = utils.deepClone
    /**
     * 匹配状态判断
     */
    this.type = -1
    /**
     * 可设置的配置项图
     */
    this.optionMap = {}
    /**
     * 不需要进行配置项修改的返回值
     */
    this.NOT_CHANGE_OPTION = 'ASCSAPJVAONV0&^$^*30+_)**ggf^f$^dyv#$%^dlnlnBSDVNL;SDV'
  }

  /**
   *
   * @returns
   */
  judge() {
    if (this.dataList.length === 1) {
      if (this.dataList[0] === this.statusName) {
        this.type = 1
        return true // 切换配置项状态
      } else return false
    } else if (this.dataList.length > 1) {
      if (this.dataList[0] === this.prefix) {
        this.type = 2
        return true // 前缀匹配上
      } else if (this.status === this.statusName && !/^[^a-z]+$/.test(this.dataList[0])) {
        this.type = 3
        return true // 配置项区域一致
      } else return false
    } else return false
  }
  analyse() {
    const key = []
    const value = this.dataList[this.dataList.length - 1]
    if (this.type === 1) return this.statusName
    else if (this.type === 2) {
      for (let i = 1; i < this.dataList.length - 1; i++) { key.push(this.dataList[i]) }
    } else if (this.type === 3) {
      for (let i = 0; i < this.dataList.length - 1; i++) { key.push(this.dataList[i]) }
    }
    this.KVMToChangeOption(key, value)
    return false
  }
  KVMToChangeOption(key_, value) {
    let key = ''
    key_.forEach((k, i) => {
      if (i > 0) key += '_' + k
      else key += k
    })
    const mapRes = this.optionMap[key]
    if (mapRes === undefined) return
    else if (mapRes === null) {
      this.changeOption(key_, value)
    } else if (Array.isArray(mapRes)) {
      this.changeOption(mapRes, value)
    } else if (typeof mapRes === 'object') {
      const func = mapRes.func.bind(this)
      let res = null
      if (func !== undefined) {
        res = func(value)
      }
      if (mapRes.paths !== undefined) {
        const paths = mapRes.paths
        if (Array.isArray(paths) && Array.isArray(res)) {
          paths.forEach((path, i) => {
            this.changeOption(path, res[i])
          })
        }
      } else {
        const path = mapRes.path
        if (path !== undefined) {
          this.changeOption(path, res)
        }
      }
    }
  }
  changeOption(path, value) {
    if (value === this.NOT_CHANGE_OPTION) return
    const tempList = [...this.basePath, ...this.path, ...path]
    let option = this.baseOption
    for (let i = 0; i < tempList.length; i++) {
      if (option === undefined) return false
      if (i < tempList.length - 1) option = option[tempList[i]]
      else {
        if (option[tempList[i]] === undefined) return false
        else if (typeof option[tempList[i]] === 'boolean') {
          if (['true', 'false'].indexOf(value) !== -1) option[tempList[i]] = eval(value)
          else return false
        } else if (typeof option[tempList[i]] === 'number') {
          try {
            option[tempList[i]] = parseInt(value)
          } catch {
            return false
          }
        } else if (typeof option[tempList[i]] === typeof value) option[tempList[i]] = value
        else return false
      }
    }
    return true
  }

  /**
   * 根据可选值列表和值返回值
   * @param {Array} list 可选值列表
   * @param {string} value 值
   * @returns 值
   */
  useListGetValue(list, value) {
    if (list.indexOf(value) !== -1) return value
    else return this.NOT_CHANGE_OPTION
  }

  classListAnalyse(value) {
    return value.split(',').filter((value) => { return value !== '' })
  }
}

export default Configurator
