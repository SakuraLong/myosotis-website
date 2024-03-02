import SakuraRenderer from '@/sakura-renderer'

class PoemParser extends SakuraRenderer.Template {
  constructor(option, content, rendererData, parserData) {
    super(option, content, rendererData, parserData)
    this.name = ['诗歌', 'poem'] // 这个模板的名字
    console.log('创建实例poem')
    console.log(content)
  }
  judge() {
    console.log(this.name)
    console.log(this.dataList)
    if (this.name.indexOf(this.dataList[0]) !== -1) {
      return true
    } else {
      return false
    }
  }
  analyseTemplate(content) {
    this.dataListInit(content) // 对dataList初始化，必须要写
    console.log(this.dataList)
    if (!this.judge()) return content // 判断是不是这个模板

    let title = '' // 文本内容
    let author = '' // 解释
    let familyList = []
    const poemList = []
    const switchKeyValue = (key, value) => {
      switch (key) {
        case 'author':
        case '作者':
          author = value
          return true
        case 'title':
        case '标题':
          title = value
          return true
        case 'family':
          familyList = value.split(';').filter((f) => { return f !== '' })
          return true
      }
      return false
    }
    this.dataList.forEach((data, index) => {
      const key = data.split('=')[0]
      const left = data.indexOf('=')
      const value = data.slice(left + 1, data.length)
      if (index > 0) {
        if (!switchKeyValue(key, value)) {
          poemList.push(data)
        }
      }
    })
    const pre = document.createElement('pre')
    const titleSpan = document.createElement('span')
    const authorSpan = document.createElement('span')
    titleSpan.style.fontWeight = 'bold'
    familyList.forEach((family, i) => {
      if (i === 0 && family !== '') pre.style.fontFamily = family
      else if (i === 1 && family !== '') titleSpan.style.fontFamily = family
      else if (i === 2 && family !== '') authorSpan.style.fontFamily = family
    })
    pre.style.fontFamily = '"Microsoft YaHei", "SimSun", sans-serif'
    titleSpan.style.fontFamily = 'Georgia, Times, "Times New Roman", STKaiti, KaiTi, serif'
    authorSpan.style.fontFamily = 'Arial, Helvetica, STKaiti, KaiTi, sans-serif'
    pre.style.lineHeight = '2'
    titleSpan.style.fontSize = '1.5em'
    authorSpan.style.fontSize = '1.1em'
    titleSpan.style.display = 'inline-block'
    authorSpan.style.display = 'inline-block'
    titleSpan.style.width = '100%'
    authorSpan.style.width = '100%'
    if (title !== '') titleSpan.innerHTML = title + '\n'
    if (author !== '') authorSpan.innerHTML = author + '\n'
    pre.appendChild(titleSpan)
    pre.appendChild(authorSpan)
    pre.style.textAlign = 'center'
    pre.style.overflowWrap = 'break-word'
    pre.style.whiteSpace = 'pre-wrap'
    poemList.forEach((poem, i) => {
      pre.innerHTML += poem
      if (i < poemList.length - 1) pre.innerHTML += '\n'
    })
    return pre.outerHTML // 返回被替换的内容
  }
}

export default PoemParser
