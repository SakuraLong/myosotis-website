class FontsLoader {
  constructor(srcList) {
    this.srcList = srcList
    this.load()
  }
  load() {
    this.srcList.forEach((src) => {
      // 创建一个新的FontFace对象
      const font = new FontFace(src.name, src.src)

      // 将字体加载到文档中
      font.load().then(loadedFace => {
        document.fonts.add(loadedFace)
      }).catch(error => {
        console.log('字体加载失败', error)
      })
    })
  }
}

export default FontsLoader
