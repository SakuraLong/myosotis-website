import SakuraRenderer from '@/sakura-renderer'

class DreamParser extends SakuraRenderer.Template {
  constructor(option, content, rendererData, parserData) {
    super(option, content, rendererData, parserData)
    this.name = ['梦', 'dream'] // 这个模板的名字
    this.dreamDict = {
      '类型': {
        title: '记录类型',
        color: '#00F8FF',
        element: [
          '自梦中直接苏醒的回忆',
          '苏醒后记得有梦境的回忆',
          '苏醒后不记得有梦境，之后记起有梦境的回忆'
        ]
      },
      '记忆模糊': {
        title: '记忆模糊（可能出现在多种地方）',
        color: '#FF004C',
        element: [
          {
            name: ['模糊描述'],
            title: '模糊描述'
          }
        ]
      },
      '真伪': {
        title: '记录的真伪情况',
        color: '#01FF00',
        element: [
          '以下内容为真',
          '以下内容为伪',
          '以下内容存伪'
        ]
      },
      '地点': {
        title: '梦境发生地点',
        color: '#FFE300',
        element: [
          {
            name: ['地点'],
            title: '地点'
          }
        ]
      },
      '人': {
        title: '出现人物',
        color: '#FE00FF',
        element: [
          {
            name: ['分类'],
            title: '人物分类'
          },
          {
            name: ['描述'],
            title: '人物描述'
          }
        ]
      },
      '实体': {
        title: '出现实体',
        color: '#FF7800',
        element: [
          {
            name: ['分类'],
            title: '实体分类'
          },
          {
            name: ['描述'],
            title: '实体描述'
          },
          {
            name: ['所有者'],
            title: '所有者'
          }
        ]
      },
      '时间': {
        title: '梦境当时时间',
        color: '#F28FFF',
        element: [
          {
            name: ['时间'],
            title: '梦境当时时间'
          },
          {
            name: ['描述'],
            title: '关于时间的描述'
          },
          {
            name: ['猜测'],
            title: '猜测的时间'
          }
        ]
      },
      '突变': {
        title: '梦境的情况发生突变',
        color: '#010AFF',
        element: [
          {
            name: ['类型'],
            title: '突变类型'
          },
          {
            name: ['之前'],
            title: '之前情况'
          },
          {
            name: ['之后'],
            title: '之后情况'
          },
          {
            name: ['突变概率'],
            title: '突变概率（不是记忆丢失造成突变的概率）'
          }
        ]
      },
      '对话': {
        title: '对话',
        color: '#AEFF81',
        element: [
          {
            name: ['说话人'],
            title: '说话人'
          },
          {
            name: ['听话人'],
            title: '听话人'
          },
          {
            name: ['对话内容'],
            title: '对话内容'
          }
        ]
      },
      '动作': {
        title: '动作',
        color: '#8ABFFF',
        element: [
          {
            name: ['对象'],
            title: '动作发出对象'
          },
          {
            name: ['描述'],
            title: '动作描述'
          }
        ]
      },
      '心理': {
        title: '心理',
        color: '#FF9698',
        element: [
          {
            name: ['情感'],
            title: '心理情感'
          },
          {
            name: ['内容'],
            title: '想法内容'
          }
        ]
      }
    }
  }
  judge() {
    if (this.name.indexOf(this.dataList[0]) !== -1) {
      return true
    } else {
      return false
    }
  }
  analyseTemplate(content) {
    this.dataListInit(content) // 对dataList初始化，必须要写
    if (!this.judge()) return content // 判断是不是这个模板

    const type = this.dataList[1]
    const typeData = this.dreamDict[type]
    if (typeData === null || typeData === undefined) return ''
    const color = typeData.color
    const bgcolor = color + '90'
    const title = typeData.title
    const msgList = []
    const switchKeyValue = (i, key, value) => {
      if (['类型', '真伪'].indexOf(type) !== -1) {
        msgList.push({
          title: typeData.title,
          msg: typeData.element[parseInt(value)]
        })
        return true
      }
      if (key === value) return false
      const elementList = typeData.element
      for (let j = 0; j < elementList.length; j++) {
        const e = elementList[i]
        if (e.name.indexOf(key) !== -1) {
          msgList.push({
            title: e.title,
            msg: value
          })
          return true
        }
      }
      return false
    }
    this.dataList.forEach((data, index) => {
      const key = data.split('=')[0]
      const left = data.indexOf('=')
      const value = data.slice(left + 1, data.length)
      if (index > 1) {
        if (!switchKeyValue(index - 2, key, value)) {
          if (index - 2 < typeData.element.length) {
            msgList.push({
              title: typeData.element[index - 2].title,
              msg: value
            })
          }
        }
      }
    })
    const dreamSpan = document.createElement('span')
    const nameSpan = document.createElement('span')
    const msgSpan = document.createElement('span')
    nameSpan.style.display = 'inline-block'
    dreamSpan.style.borderLeft = '3px solid ' + color
    nameSpan.style.margin = '0 0 0 5px'
    msgList.forEach((msg, i) => {
      const span = document.createElement('span')
      span.setAttribute('title', msg.title)
      if (i > 0) span.innerHTML += ' | '
      span.innerHTML += msg.msg
      span.setAttribute('data-bgcolor', bgcolor)
      msgSpan.appendChild(span)
    })
    nameSpan.innerHTML = type + '：'
    nameSpan.title = title
    dreamSpan.appendChild(nameSpan)
    dreamSpan.appendChild(msgSpan)

    return dreamSpan.outerHTML // 返回被替换的内容
  }
}

export default DreamParser
