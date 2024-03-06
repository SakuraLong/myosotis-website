import utils from '../../common/utils.mjs'

class Loader {
  constructor(src) {
    this.src = src
    this.srcList = []
    this.srcInit()
  }
  srcInit() {
    if (typeof this.src === 'string') {
      this.srcList.push(this.src)
    } else if (Array.isArray(this.src)) {
      this.srcList = utils.deepClone(this.src)
    }
  }
}

export default Loader
