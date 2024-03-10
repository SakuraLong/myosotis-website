import Component from './component.mjs'

class Table extends Component {
  constructor(config, src, replaceManager) {
    super('table', config, src, replaceManager)
    this._V_nameList = ['table', '表格']
    this._V_keyList = [
      ['name',        null,       ''],        // 列表名字
      ['fold',        null,       false,      this.trueOrFalse],        // 列表是否允许折叠
      ['folded',      null,       false,      this.trueOrFalse],        // 允许折叠时是否处于折叠状态
      ['hover',       'row',      'node',     'none',       ['row', 'node', 'none'],          'row'],
      ['border',      'bottom',   'bottom',   'none',       ['border', 'bottom', 'none'],     'border'],
      ['tdMinWidth',  'TMinW',    null,       ['none'],     (key, value, configValue) => value.split(',')],
      ['tdMaxWidth',  'TMaxW',    null,       ['none'],     (key, value, configValue) => value.split(',')],
      ['tdMinHeight', 'TMinH',    null,       ['none'],     (key, value, configValue) => value.split(',')],
      ['tdMaxHeight', 'TMaxH',    null,       ['none'],     (key, value, configValue) => value.split(',')],
      ['tdWidth',     'TW',       null,       ['auto'],     (key, value, configValue) => value.split(',')],
      ['tdHeight',    'TH',       null,       ['auto'],     (key, value, configValue) => value.split(',')],
      ['tdPadding',   'TP',       null,       '0.5rem']
    ]
  }

  static begin(i, body, data, index) {
    if (
      body[i] === '|' &&
      (i === 0 || body[i - 1] === '\n') &&
      i < body.length - 2 &&
      body[i + 1] === ' '
    ) {
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
    if (i === body.length - 1 || (body[i] === '\n' && body[i + 1] !== '|')) {
      const temp = body.slice(data.startBegin, i + 1)
      const tempList = temp.split('\n')
      const str = '{|table|-' + tempList.filter((item) => item !== '').join('|-') + '|}'
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
    let tempChildren = []
    let hasThead = false
    let cIndex = 1
    let rIndex = 1
    this.dataList.push('-')
    this.dataList.forEach((data, i) => {
      if (data === '-') {
        // 换行
        const tr = this.create('', 'table', 'tr')
        tr.children = this.utils.deepClone(tempChildren)
        if (hasThead) {
          hasThead = false
          this.children[0].children.push(tr)
          const tableTbodyNode = this.create('', 'table', 'tbh', {
            type: 'tbody'
          })
          this.children.push(tableTbodyNode)
        } else {
          this.children[this.children.length - 1].children.push(tr)
        }
        tempChildren = []
        cIndex = 1
        rIndex++
      } else {
        if (data === '') {
          if (this.dataList[i + 1] === undefined || this.dataList[i + 1] === '-') return
        }
        if (i === 0) {
          // 判断是否有thead
          if (data.startsWith('+ ')) {
            hasThead = true
            const tableTheadNode = this.create('', 'table', 'tbh', {
              type: 'thead'
            })
            this.children.push(tableTheadNode)
          } else {
            const tableTbodyNode = this.create('', 'table', 'tbh', {
              type: 'tbody'
            })
            this.children.push(tableTbodyNode)
          }
        }
        const tempData = i === 0 && hasThead ? data.slice(2) : data
        const contentList = tempData.split(' ')
        let hasConfig = false
        const tdConfig = {
          cIndex: cIndex,
          rIndex: rIndex,
          c: 1,
          r: 1,
          t: false,
          display: true,
          sortValue: null,
          type: 'defalut',
          minWidth: this.nodeConfig.tdMinWidth[cIndex - 1] || 'none',
          maxWidth: this.nodeConfig.tdMaxWidth[cIndex - 1] || 'none',
          minHeight: this.nodeConfig.tdMinHeight[cIndex - 1] || 'none',
          maxHeight: this.nodeConfig.tdMaxHeight[cIndex - 1] || 'none',
          width: this.nodeConfig.tdWidth[cIndex - 1] || 'none',
          height: this.nodeConfig.tdHeight[cIndex - 1] || 'none',
          padding: this.nodeConfig.tdPadding
        }
        if (contentList.length > 0) {
          contentList[contentList.length - 1].split('/').forEach((config) => {
            const key = config.split('=')[0]
            const left = config.indexOf('=')
            const value = config.slice(left + 1, config.length)
            switch (key) {
              case 'c':
                if (value && value !== key && /^[\d]+$/.test(value)) {
                  tdConfig.c = parseInt(value)
                  hasConfig = true
                }
                break
              case 'r':
                if (value && value !== key && /^[\d]+$/.test(value)) {
                  tdConfig.r = parseInt(value)
                  hasConfig = true
                }
                break
              case 't':
                tdConfig.t = true
                hasConfig = true
                break
              case 'd':
                tdConfig.display = false
                hasConfig = true
                break
              case 's':
                tdConfig.sortValue = value
                hasConfig = true
                break
              case 'default':
              case 'success':
              case 'warning':
              case 'info':
              case 'tip':
              case 'type':
                if (['default', 'success', 'warning', 'info', 'tip'].indexOf(value) !== -1) {
                  tdConfig.type = value
                  hasConfig = true
                }
                break
            }
          })
        }
        let content = ''
        contentList.forEach((c, i) => {
          if (i === contentList.length - 1 && hasConfig) return
          if (i > 0) content += ' '
          content += c
        })
        const td = this.create('', 'table', 'td', tdConfig)
        const textNode = this.createTextNode(content)
        td.children.push(textNode)
        tempChildren.push(td)
        cIndex++
      }
    })
  }
}

export default Table
