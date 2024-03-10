class FileLoader {
  constructor(src) {
    this.src = src
  }
  load() {
    return new Promise((resolve, reject) => {
      fetch(this.src).then(response => {
        return response.text()
      }).then(data => {
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default FileLoader
