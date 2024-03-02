import Component from './component.mjs'

class Title extends Component {
  constructor(config, src, replaceManager) {
    super('title', config, src, replaceManager)
    this.nameList = ['title', '标题']
    this.compConfig = [
      ['level',             1],         // 标题等级
      ['textAlign',         'left'],    // 标题文字位置
      ['borderPosition',    'left'],    // 标题条位置
      ['hoverAnimation',    false],     // 标题是否有hover动画
      ['hasLink',           true]       // 标题是否有点击链接
    ]
  }
  static begin(i, body, data, index) {
    if (body[i] === '=' && (i === 0 || (i > 0 && body[i - 1] === '\n'))) {
      for (let j = i; j < i + 7 && j < body.length; j++) {
        if (body[j] === '=') continue
        else if (body[j] === ' ') {
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
    } else {
      return {
        match: false
      }
    }
  }
  static end(i, body, data) {
    if (body[i] === '\n' || i === body.length - 1) {
      const title = body.slice(data.startBegin, i + 1)
      data.startEnd = i
      data.status = -1
      return {
        match: true,
        content: title
      }
    } else {
      return {
        match: false
      }
    }
  }
  _V_analyse() {
    // 根据dataList分析组件数据
    let textNode = null
    if (this.src.startsWith('=')) {
      const i = this.src.indexOf(' ')
      this.updateConfig('level', i)
      const c = this.src.slice(i + 1).trim()
      textNode = this.createTextNode(c)
    } else {
      const c = this.dataList.join('')
      textNode = this.createTextNode(c)
    }
    this.children.push(textNode)
  }
  _V_analyseConfig(key, value) {
    // 基础config无法处理的key value调用该函数
    switch (key) {
      case 'textAlign':
      case 'TA':
        if (['left', 'center', 'l', 'c'].indexOf(value) !== -1) {
          this.updateConfig('textAlign', value)
        }
        break
      case 'borderPosition':
      case 'BP':
        if (['left', 'l', 'bottom', 'b', 'n', 'none'].indexOf(value) !== -1) {
          this.updateConfig('borderPosition', value)
        }
        break
      case 'hoverAnimation':
      case 'HA':
        if (['true', 'false'].indexOf(value) !== -1) {
          this.updateConfig('hoverAnimation', eval(value))
        } else if (key === value) {
          this.updateConfig('hoverAnimation', true)
        }
        break
      case 'hasLink':
      case 'HL':
        if (['true', 'false'].indexOf(value) !== -1) {
          this.updateConfig('hasLink', eval(value))
        } else if (key === value) {
          this.updateConfig('hasLink', true)
        }
        break
      case 'level':
        // 之后要做正确性检查
        if (value < 7 && value > 0) {
          this.updateConfig('level', parseInt(value))
        }
        break
      default:
        if (key.startWith('h')) {
          try {
            this.updateConfig('level', parseInt(key[1]))
          } catch {
            //
          }
        }
        break
    }
  }
}

export default Title
