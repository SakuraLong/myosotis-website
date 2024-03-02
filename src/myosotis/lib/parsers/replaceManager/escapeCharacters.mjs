class EscapeCharacters {
  constructor(config) {
    this.config = config
    this.escapeCharactersList = ['|', '{', '}', '-', '~', '*', '+', '_', '=', '[', ']', '?', '/', '$', '\\', '<', '>']
  }
  replace(src) {
    for (let i = 0; i < src.length; i++) {
      if (src[i] === '\\') {
        if (i < src.length - 1 && this.escapeCharactersList.indexOf(src[i + 1] !== -1)) {
          const before = src.slice(0, i)
          const after = src.slice(i + 2)
          const replace = '<my-ignore>' + src[i + 1] + '</my-ignore>'
          src = before + replace + after
          i += replace.length - 1
        } else {
          const before = src.slice(0, i)
          const after = src.slice(i + 1)
          src = before + after
          i--
        }
      }
    }
    return src
  }
}

export default EscapeCharacters
