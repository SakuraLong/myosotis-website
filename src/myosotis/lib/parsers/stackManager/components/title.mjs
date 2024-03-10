import Component from './component.mjs'

class Title extends Component {
  constructor(config, src, replaceManager) {
    super('title', config, src, replaceManager)
    this._V_nameList = ['title', '标题']
    this._V_keyList = [
      ['level',             null,       1,          (key, value, configValue) => parseInt(value) > 0 && parseInt(value) < 7 ? value : this.NOT_CHANGE_VALUE], // 标题等级
      ['textAlign',         'TA',       ['left',    'center',     'l',        'c'],     'left'],                          // 标题文字位置
      ['borderPosition',    'BP',       ['left',    'l',          'bottom',   'b',      'n',    'none'],      'left'],    // 标题条位置
      ['hoverAnimation',    'HA',       null,       false,        this.trueOrFalse], // 标题是否有hover动画
      ['hasLink',           'HL',       null,       true,         this.trueOrFalse]  // 标题是否有点击链接
    ]
  }

  _V_defaultConfigAnalyse(key, value, configValue) {
    if (key.startsWith('h')) {
      try {
        const res = parseInt(key[1])
        return {
          key: 'level',
          res: res > 0 && res < 7 ? res : this.NOT_CHANGE_VALUE
        }
      } catch {
        return {
          res: this.NOT_CHANGE_VALUE
        }
      }
    }
    return {
      res: this.NOT_CHANGE_VALUE
    }
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
      return {
        match: false
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
    if (this.sourceContent.startsWith('=')) {
      const i = this.sourceContent.indexOf(' ')
      this.updateConfig('level', i)
      const c = this.sourceContent.slice(i + 1).trim()
      textNode = this.createTextNode(c)
    } else {
      const c = this.dataList.join('')
      textNode = this.createTextNode(c)
    }
    this.children.push(textNode)
  }
}

export default Title
