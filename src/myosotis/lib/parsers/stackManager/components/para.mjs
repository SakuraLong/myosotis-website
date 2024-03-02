import Component from './component.mjs'

class Paragraph extends Component {
  constructor(config, src, replaceManager) {
    super('paragraph', config, src, replaceManager)
    this.nameList = ['paragraph', 'para', '段落']
    this.compConfig = [
      ['lineHeight',      'DEFAULT'],       // 行高
      ['type',            'default'],       // 段落类型
      ['borderColor',     'DEFAULT'],       // 如果paraType是default，则是整个段落的边框色，如果paraType是custom，则是左边框色，其余的此值无效
      ['backgroundColor', 'DEFAULT'],       // 如果paraType是default或者paraType是custom，则是整个段落的背景色，其余的此值无效
      ['border',          true],            // 标题是否有点击链接
      ['title',           '']               // 段落的标题
    ]
  }
  _V_analyse() {
    // 根据dataList分析组件数据
    if (this.src.startsWith('{|')) {
      this.dataList.forEach((data, i) => {
        if (data === '') return
        const textNode = this.createTextNode(data)
        if (i > 0) this.children.push(this.createHtmlNode('br'))
        this.children.push(textNode)
      })
    } else {
      const textNode = this.createTextNode(this.src)
      this.children.push(textNode)
    }
  }
  _V_analyseConfig(key, value) {
    // 基础config无法处理的key value调用该函数
    switch (key) {
      case 'BC':
      case 'borderColor':
        this.updateConfig('borderColor', value)
        break
      case 'BGC':
      case 'backgroundColor':
        this.updateConfig('backgroundColor', value)
        break
      case 'border':
        this.updateConfig('border', value)
        break
      case 'success':
      case '成功':
        this.updateConfig('type', 'success')
        this.updateConfig('title', 'success'.toUpperCase())
        break
      case 'warning':
      case '警告':
        this.updateConfig('type', 'success')
        this.updateConfig('title', 'warning'.toUpperCase())
        break
      case 'tip':
      case '要点':
        this.updateConfig('type', 'tip')
        this.updateConfig('title', 'tip'.toUpperCase())
        break
      case 'info':
      case '信息':
        this.updateConfig('type', 'info')
        this.updateConfig('title', 'info'.toUpperCase())
        break
      case 'type':
        if (
          ['default', 'success', 'warning', 'tip', 'info'].indexOf(
            value.toLowerCase()
          ) !== -1
        ) {
          this.updateConfig('type', value)
          this.updateConfig('title', value.toUpperCase(), '')
        } else if (key === value) {
          this.updateConfig('type', 'default')
        }
        break
      case 'LH':
      case 'lineHeight':
        this.updateConfig('lineHeight', value, '')
        break
      case 'title':
        this.updateConfig('title', value, '')
        break
      default:
        break
    }
  }
}

export default Paragraph
