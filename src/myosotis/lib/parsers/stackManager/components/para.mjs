import Component from './component.mjs'

class Paragraph extends Component {
  constructor(config, src, replaceManager) {
    super('paragraph', config, src, replaceManager)
    this._V_nameList = ['paragraph', 'para', '段落']
    this._V_keyList = [
      ['lineHeight',      'LH',           null,         'DEFAULT'], // 行高
      ['type',            'default',      'success',    '成功',     'warning',    '警告',     'tip',    '要点',     'info',     '信息',
        ['default',       'success',      'warning',    'tip',      'info'],      'default',  this.analyseType],    // 段落类型
      ['borderColor',     'BC',           null,         'DEFAULT'],  // 如果paraType是default，则是整个段落的边框色，如果paraType是custom，则是左边框色，其余的此值无效
      ['backgroundColor', 'BGC',          null,         'DEFAULT'],  // 如果paraType是default或者paraType是custom，则是整个段落的背景色，其余的此值无效
      ['title',           null,           '']           // 段落的标题
    ]
  }
  analyseType(key, value, configValue) {
    const dict = {
      'success': 'success',
      '成功': 'success',
      'warning': 'warning',
      '警告': 'warning',
      'tip': 'tip',
      '要点': 'tip',
      'info': 'info',
      '信息': 'info',
      'default': 'default'
    }
    const res = dict[value]
    if (res === undefined) return this.NOT_CHANGE_VALUE
    this.updateConfig('title', res.toUpperCase())
    return res
  }
  _V_analyse() {
    // 根据dataList分析组件数据
    if (this.sourceContent.startsWith('{|')) {
      this.dataList.forEach((data, i) => {
        if (data === '') return
        const textNode = this.createTextNode(data)
        if (i > 0) this.children.push(this.createHtmlNode('br'))
        this.children.push(textNode)
      })
    } else {
      const textNode = this.createTextNode(this.sourceContent.replace(/\n|\r|\t/g, ''))
      this.children.push(textNode)
    }
  }
}

export default Paragraph
