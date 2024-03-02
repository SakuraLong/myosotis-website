class Assistant {
  splitArticle = (src) => {
    if (typeof src !== 'string') {
      throw new Error('Input data should be a String')
    }
    const splitStr = '\n-\n'
    const t = src.split(splitStr)
    let option = ''
    let article = ''
    if (t.length > 2) {
      option = t[0]
      article = t[1]
      for (let i = 2; i < t.length; i++) {
        article += splitStr + t[i]
      }
    } else if (t.length < 2) {
      article = t[0]
    } else {
      option = t[0]
      article = t[1]
    }
    article = article.trim()
    return {
      option: option,
      article: article
    }
  }
}

export default Assistant
