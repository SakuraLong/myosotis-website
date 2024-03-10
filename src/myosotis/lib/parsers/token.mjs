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
      ['ID',      null,       ''],
      ['id',      null,       '']
    ]
    /**
     * 匹配的名字列表
     * 子类需要重写
     */
    this._V_nameList = []
    /**
     * utils
     */
    this.utils = utils
    /**
     * 判断值是否改变
     */
    this.NOT_CHANGE_VALUE = 'ASCSAPJVAONV0&^$^*30+_)**ggf^f$^dyv#$%^dlnlnBSDVNL;SDV'
    /**
     * 是否替换掉换行符
     */
    this.replaceLineBreak = true
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
  create(content, t, n = null, config = {}) {
    return {
      type:       t,
      name:       n || t,
      level:      0,
      config:     config,
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
  createHtmlNode(element, config = {}) {
    return this.create(element, 'html', 'html', config)
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
      if (Array.isArray(judge)) {
        if (judge.indexOf(value) !== -1) {
          Object.assign(this.nodeConfig, {
            [key]: value
          })
        }
      } else {
        if (value !== judge) {
          Object.assign(this.nodeConfig, {
            [key]: value
          })
        }
      }
    }
  }

  /**
   * 配置项初始化
   * 将模板自定义配置项与基础配置项合并
   * 之后加入模板的节点config中
   */
  configInit() {
    this._V_keyList.forEach((key) => {
      const res = this.baseKey.find((item) => item[0] === key[0])
      /**
       * 如果baseKey中存在_V_keyList的键，则删除（_V_keyList可以重写baseKey）
       */
      if (res !== undefined) this.baseKey.splice(this.baseKey.indexOf(res), 1)
    })
    this._V_keyList = this._V_keyList.concat(this.baseKey)
    this._V_keyList.forEach((key) => {
      /**
       * 如果nodeConfig中存在键，则不进行赋值（如果有key需要进行判断，但是由自身函数进行赋值，且可能对结构有要求，则可以直接写到nodeConfig中）
       */
      if (key[0] in this.nodeConfig) return
      this.updateConfig(key[0], typeof key[key.length - 1] === 'function' ? key[key.length - 2] : key[key.length - 1])
    })
    return this._V_keyList.length - this.baseKey.length
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
    const baseKeyIndex = this.configInit()
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
      if (keyList !== undefined) {
        const v = hasFunc ? keyList[keyList.length - 1].call(this, key, value, this.nodeConfig[keyList[0]]) : value
        const j = hasFunc ? keyList[keyList.length - 3] : keyList[keyList.length - 2]
        if (v === this.NOT_CHANGE_VALUE) return true
        if (j === null && key !== value) {
          this.updateConfig(keyList[0], v)
          return true
        } else if (j !== null && j.indexOf(v) !== -1) {
          this.updateConfig(keyList[0], v)
          return true
        } else {
          return false
        }
      } else { return false }
    }
    configList.forEach((data_, index) => {
      const data = this.replaceLineBreak ? data_.replace(/\n|\r|\t/g, '') : data_
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
          // console.log(keyList)
          if (keyList === undefined || index >= baseKeyIndex) {
            const res = this._V_defaultIndexConfigAnalyse(key, value, data)
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
   * @param {String} data 键 + '=' + 值
   * @returns 需要赋值的值，返回的是对象，如果不需要改变则返回 this.NOT_CHANGE_VALUE
   */
  _V_defaultIndexConfigAnalyse(key, value, data) {
    return {
      res: this.NOT_CHANGE_VALUE
    }
  }

  /**
   * key === value return true
   * value === true return true
   * value === false return false
   * return false
   * @param {String} key 键
   * @param {String} value 值
   * @param {*} configValue nodeConfig中key对应的value
   * @returns Boolean
   */
  trueOrFalse(key, value, configValue) {
    return ['true', 'false'].indexOf(value) !== -1 ? eval(value) : key === value ? true : this.NOT_CHANGE_VALUE
  }
}

export default Token
