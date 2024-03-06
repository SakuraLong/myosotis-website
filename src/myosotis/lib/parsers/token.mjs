import utils from '../../common/utils.mjs'

/**
 * 组件树节点基类
 */

/**
 * {
 *  type: String,
 *  name: String,
 *  level: Number,
 *  config: Object,
 *  content: String,
 *  children: Array
 * }
 */

class Token {
  constructor(type, name) {
    /**
     * 节点类型
     */
    this.type = type
    /**
     * 节点名字
     */
    this.name = name
    /**
     * 节点level
     */
    this.level = 0
    /**
     * 节点配置项
     */
    this.nodeConfig = {}
    /**
     * 节点纯文本
     */
    this.content = ''
    /**
     * 节点的子节点
     */
    this.children = []
    /**
     * 节点的键值对
     * 子类如有需要，需要重写
     * _V_keyList的元素示例如下：
     * [keyConfig, key2, key3, ..., keyn, allowedValues, defalutValue, analyseFunc(可选)]
     * key[0] config的key值
     * key[0 ~ key.length - 3] 允许的key
     * key[key.length - 2] 允许设置的值，需要用数组设置（如果最后一个不是函数）
     * key[key.length - 1] 默认值（如果最后一个不是函数）
     * key[key.length - 1] 处理函数（如果最后一个是函数）
     * 所以要求默认值不能是函数（这很合理，对吧？）
     */
    this._V_keyList = []
    /**
     * 基础键值对
     */
    this.baseKey = [
      ['TYPE',    null,       ''],
      ['ID',    null,       ''],
      ['id',      null,       '']
    ]
    /**
     * 匹配的名字列表
     * 子类需要重写
     */
    this._V_nameList = []
    /**
     * 判断值是否改变
     */
    this.NOT_CHANGE_VALUE = 'ASCSAPJVAONV0&^$^*30+_)**ggf^f$^dyv#$%^dlnlnBSDVNL;SDV'
  }

  /**
   * 获取自身节点
   * @returns 自身节点
   */
  get() {
    return {
      type:       this.type,
      name:       this.name,
      level:      this.level,
      config:     this.nodeConfig,
      content:    this.content,
      children:   this.children
    }
  }

  /**
   * 创建一个新的节点
   * @param {String} content 内容
   * @param {String} tn 类型与名字
   * @returns 相对节点
   */
  create(content, tn) {
    return {
      type:       tn,
      name:       tn,
      level:      0,
      config:     {},
      content:    content,
      children:   []
    }
  }

  /**
   * 创建文本节点
   * @param {String} content 内容
   * @returns 文本节点
   */
  createTextNode(content) {
    return this.create(content, 'text')
  }

  /**
   * 创建html节点
   * @param {String} element 内容
   * @returns html节点
   */
  createHtmlNode(element) {
    return this.create(element, 'html')
  }

  /**
   * 更新config
   * @param {String} key config的key值
   * @param {Object} value value值
   * @param {Object} judge 当value等于此值时，不进行赋值
   */
  updateConfig(key, value, judge = null) {
    if (key === null || key === undefined) return
    if (judge === null) {
      Object.assign(this.nodeConfig, {
        [key]: value
      })
    } else {
      if (value !== judge) {
        Object.assign(this.nodeConfig, {
          [key]: value
        })
      }
    }
  }

  /**
   * 配置项初始化
   * 将模板自定义配置项与基础配置项合并
   * 之后加入模板的节点config中
   */
  configInit() {
    this._V_keyList = this._V_keyList.concat(this.baseKey)
    this._V_keyList.forEach((key) => {
      this.updateConfig(key[0], typeof key[key.length - 1] === 'function' ? key[key.length - 2] : key[key.length - 1])
    })
  }

  /**
   * 使用config修改默认配置项
   * @returns null
   */
  useConfigInit() {
    return
  }

  /**
   * 处理模板用户设置的内容
   * @param {Boolean} noneIndex 是否使用index确认value的key
   */
  configAnalyse(configList, noneIndex = false) {
    this.configInit()
    this.useConfigInit()
    /**
     * 根据键值对更新config
     * @param {String} key 键（=左侧）
     * @param {*} value 值（=右侧）
     * @returns 是否进行键值对更新
     */
    const switchKeyValue = (key, value) => {
      let hasFunc = false
      const keyList = this._V_keyList.find((item) => {
        if (typeof item[item.length - 1] === 'function') {
          const res = utils.deepClone(item).splice(0, item.length - 3).indexOf(key) !== -1
          if (res) hasFunc = true
          return res
        } else {
          return utils.deepClone(item).splice(0, item.length - 2).indexOf(key) !== -1
        }
      })
      console.log(keyList, hasFunc, key, value)
      if (keyList !== undefined) {
        const v = hasFunc ? keyList[keyList.length - 1].call(this, key, value, this.nodeConfig[keyList[0]]) : value
        const j = hasFunc ? keyList[keyList.length - 3] : keyList[keyList.length - 2]
        if (v === this.NOT_CHANGE_VALUE) return true
        if (j === null || j.indexOf(v) !== -1) {
          console.log('updateConfig')
          this.updateConfig(keyList[0], v)
          return true
        } else {
          return false
        }
      } else { return false }
    }
    configList.forEach((data, index) => {
      const key = data.split('=')[0]
      const left = data.indexOf('=')
      const value = data.slice(left + 1, data.length)
      const keyList = this._V_keyList[index] // noneIndex 为 false

      if (switchKeyValue(key, value)) {
        /**
         * 匹配到满足要求的键值对
         */
        return
      } else {
        if (noneIndex) {
        /**
         * 当前是不用index确定value的
         */
          const res = this._V_defaultConfigAnalyse(key, value, this.nodeConfig[key])
          if (res.res !== this.NOT_CHANGE_VALUE) this.updateConfig(res.key, res.res)
        } else {
          /**
           * 当前用index确定value
           */
          if (keyList === undefined) {
            const res = this._V_defaultIndexConfigAnalyse(key, value, undefined)
            if (res.res !== this.NOT_CHANGE_VALUE) this.updateConfig(res.key, res.res)
          } else {
            /**
             * 为了保留数据的完整性，此处需要用data赋值
             */
            this.updateConfig(keyList[0], data)
          }
        }
      }
    })
  }

  /**
   * 该函数仅在configAnalyse函数noneIndex值为true时有用
   * 也就是该函数仅在组件、结构中有意义
   *
   * 该函数是在键值对没有匹配上的情况下会调用，进行一次判断，判断该值是否有用
   * @param {String} key 键
   * @param {String} value 值
   * @param {*} configValue config中键对应的值
   * @returns 需要赋值的值，返回的是对象，如果不需要改变则返回 this.NOT_CHANGE_VALUE
   */
  _V_defaultConfigAnalyse(key, value, configValue) {
    return {
      res: this.NOT_CHANGE_VALUE
    }
  }

  /**
   * 该函数仅在configAnalyse函数noneIndex值为false时有用
   * 也就是该函数仅在组件、结构中有意义
   *
   * 该函数是在键值对没有匹配上的情况下会调用，进行一次判断，判断该值是否有用
   * @param {String} key 键
   * @param {String} value 值
   * @param {*} configValue config中键对应的值
   * @returns 需要赋值的值，返回的是对象，如果不需要改变则返回 this.NOT_CHANGE_VALUE
   */
  _V_defaultIndexConfigAnalyse(key, value, configValue) {
    return {
      res: this.NOT_CHANGE_VALUE
    }
  }
}

export default Token
