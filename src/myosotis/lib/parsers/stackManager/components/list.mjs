import Component from './component.mjs'

class List extends Component {
  constructor(config, src, replaceManager) {
    super('list', config, src, replaceManager)
    this._V_nameList = ['list', '列表']
    this._V_keyList = [
      ['name',              null,       ''],        // 列表名字
      ['fold',              null,       false,      this.trueOrFalse],        // 列表是否允许折叠
      ['folded',            null,       false,      this.trueOrFalse],        // 允许折叠时是否处于折叠状态
      ['chinese',           [true,      false],     false,      this.trueOrFalse],        // 序号是否是中文
      ['symbolColor',       null,       'DEFAULT'],                           // 序号颜色
      ['mode',              'default',  'number',   'solid',      'hollow',   'square',   'none',   null,   null,   this.analyseMode],    // 类型函数判断入口，key=mode无用
      ['template',          't',        null,       null,         this.analyseTemplate],    // 序号模板函数判断入口，key=template无用
      ['modeOrder',         'MO',       ['default', 'number',     'none'],    'default'],    // 有序列表模式
      ['modeUnorder',       'MU',       ['default', 'solid',      'hollow',   'square',   'none'],  'default'],    // 无序列表模式
      ['templateOrderL',    'TOL',      null,       ''],    // 有序列表序号前缀
      ['templateOrderR',    'TOR',      null,       ''],    // 有序列表序号后缀
      ['templateUnorder',   'TU',       null,       ['●', '○', '■', '□'],           this.analyseTemplateUnorder]    // 无序列表序号序列
    ]
  }

  analyseMode(key, value, configValue) {
    if (key === value) {
      this.updateConfig('modeOrder', value)
      this.updateConfig('modeUnorder', value)
    } else {
      const list = value.split(';')
      this.updateConfig('modeOrder', list[0], ['default', 'number', 'none'])
      this.updateConfig('modeUnorder', list[1], ['default', 'solid', 'hollow', 'square', 'none'])
    }
    return {
      res: this.NOT_CHANGE_VALUE
    }
  }

  analyseTemplate(key, value, configValue) {
    const templateList = value.split(';')
    const orderTemplate = templateList[0]
    const unorderTemplate = templateList[1]
    const res = this.analyseTemplateUnorder(null, unorderTemplate, null)
    if (res.res !== this.NOT_CHANGE_VALUE) this.updateConfig('templateUnorder', res.res)
    const list = orderTemplate.split('*')
    const l = list[0] === undefined ? '' : list[0]
    const r = list[1] === undefined ? '' : list[1]
    this.updateConfig('templateOrderL', l)
    this.updateConfig('templateOrderR', r)
  }

  analyseTemplateUnorder(key, value, configValue) {
    if (value === undefined) {
      return {
        res: this.NOT_CHANGE_VALUE
      }
    } else {
      const list = value.split(',')
      list.forEach((l, i) => {
        list[i] = list[i].trim()
      })
      return {
        res: list
      }
    }
  }

  static begin(i, body, data, index) {
    if ((body[i] === '*' || body[i] === '+') &&
        (i === 0 || body[i - 1] === '\n') &&
        i < body.length - 2 &&
        body[i + 1] === ' ') {
      data.startBegin = i
      data.status = index
      return {
        match: true,
        list: Component.paraAnalyse(i, body, data)
      }
    } else {
      return {
        match: false
      }
    }
  }

  static end(i, body, data) {
    if (i === body.length - 1 || (body[i] === '\n' && (body[i + 1] !== '*' && body[i + 1] !== '+'))) {
      const temp = body.slice(data.startBegin, i + 1)
      const tempList = temp.split('\n')
      const str = '{|list|-|' + tempList.filter((item) => item !== '').join('|') + '|}'
      data.startEnd = i
      data.status = -1
      return {
        match: true,
        content: str
      }
    } else {
      return {
        match: false
      }
    }
  }

  _V_analyse() {
    // 根据dataList分析组件数据
    this.children = this.createListData(this.dataList)
  }

  getDeepAndType(item) {
    const deep = item.match(/^(\*+|\++|-+)/)?.[0].length - 1
    if (deep !== -1) {
      if (item.match(/^(\*+|\++|-+)/)?.[0].endsWith('+')) {
        return [deep, true]
      } else if (item.match(/^(\*+|\++|-+)/)?.[0].endsWith('*')) {
        return [deep, false]
      } else {
        return [-1, true]
      }
    } else {
      return [-1, true]
    }
  }

  createListData(data) {
    const menu = []
    const stack = []
    const dataList = []
    const levelStack = []
    for (let i = 0, len = data.length; i < len; i++) {
      const template = data[i]
      const lt = this.getDeepAndType(template)
      let deep = lt[0]
      const order = lt[1]
      if (deep === -1) continue
      if (dataList.length === 0) deep = 0
      else if (deep - dataList[dataList.length - 1].deep > 1) {
        /**
         * 防止列表跨级
         */
        deep = dataList[dataList.length - 1].deep + 1
      }
      if (order) {
        if (levelStack[deep] === undefined) levelStack[deep] = 0
        levelStack[deep]++
        for (let i = deep + 1; i < levelStack.length; i++) {
          levelStack[i] = 0
        }
      }
      const text = template.replace(/^(\*+|\++|-+)\s*/, '')

      const getSymbol = (deep, level, order) => {
        const tol = this.nodeConfig.templateOrderL
        const tor = this.nodeConfig.templateOrderR
        const tu = this.nodeConfig.templateUnorder
        if (order) {
          const l = this.nodeConfig.chinese ? this.numberToChinese(level) : level.toString()
          let lt = ''
          levelStack.forEach((l, i) => {
            if (i > 0) lt += '.'
            lt += this.nodeConfig.chinese ? this.numberToChinese(l) : l.toString()
          })
          switch (this.nodeConfig.modeOrder) {
            case 'default':
              return tol + l + tor
            case 'number':
              return tol + lt + tor
            case 'none':
              return ''
            default:
              return tol + l + tor
          }
        } else {
          const symbol = tu[(deep) % tu.length]
          switch (this.nodeConfig.modeUnorder) {
            case 'default':
              return symbol
            case 'solid':
              return '●'
            case 'hollow':
              return '○'
            case 'square':
              return '■'
            case 'none':
              return ''
            default:
              return symbol
          }
        }
      }

      const tempNode = {
        deep: deep,
        level: order ? levelStack[deep] : null,
        symbol: getSymbol(deep, levelStack[deep], order),
        text: text,
        order: order,
        children: []
      }
      // const listLiNode = this.create(config.symbol, 'list', 'li', config)
      // const listSymbolNode = this.create(config.symbol, 'list', 'symbol', config)
      // const listContentNode = this.createHtmlNode('span', {})
      // listContentNode.children.push(this.createTextNode(text))
      // listLiNode.children.push(listSymbolNode)
      // listLiNode.children.push(listContentNode)

      dataList.push(tempNode)
      while (stack.length >= deep + 1) {
        stack.pop()
      }
      if (stack.length === 0) {
        menu.push(tempNode)
      } else {
        stack[stack.length - 1].children.push(tempNode)
      }
      stack.push(tempNode)
    }

    const createTree = (node, judge = false) => {
      const listLiNode = this.create('', 'list', 'li')
      const listSymbolNode = this.create(node.symbol, 'list', 'symbol', {
        deep: node.deep,
        level: node.level,
        symbol: node.symbol,
        symbolColor: this.nodeConfig.symbolColor
      })
      const listContentNode = this.createHtmlNode('span')
      listContentNode.children.push(this.createTextNode(node.text))
      if (!judge) listLiNode.children.push(listSymbolNode)
      if (!judge) listLiNode.children.push(listContentNode)
      let order = null
      node.children.forEach((child) => {
        if (order !== child.order) {
          const listOlulNode = this.create('', 'list', 'olul', {
            order: child.order
          })
          order = child.order
          listLiNode.children.push(listOlulNode)
        }
        listLiNode.children[listLiNode.children.length - 1].children.push(createTree(child))
      })
      if (judge) return listLiNode.children
      else return listLiNode
    }

    const children = createTree({
      children: menu
    }, true)
    return children
  }

  numberToChinese(num) {
    const chineseNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
    const chineseUnit = ['', '十', '百', '千']
    let result = ''
    const numStr = num.toString()
    const len = numStr.length
    for (let i = 0; i < len; i++) {
      const digit = parseInt(numStr[i])
      const unit = len - i - 1
      if (digit !== 0) {
        result += chineseNum[digit] + chineseUnit[unit]
      } else {
        // 处理零的情况
        if (numStr.length === 1 && result[result.length - 1] !== '零') {
          result += chineseNum[digit]
        }
      }
    }
    // 处理十的特殊情况
    if (result[0] === '一' && result[1] === '十') {
      result = result.slice(1)
    }
    return result
  }
}

export default List
