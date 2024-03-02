import SakuraRenderer from '@/sakura-renderer'

class AudioShowerParser extends SakuraRenderer.ComponentsParser {
  constructor(component, option, rendererData) {
    super(component, option, rendererData)
    this.name = ['audioShower', '可视化音频']
    this.template = {
      type: 'sr-audio-shower',
      data: {
        src: '', //
        imgSrc: '',
        option: {
          type: 'round', // 标题类型
          title: '', // 标题
          fillColor: '#FF94D8'
        }
      }
    } // 标题默认配置
  }
  // updateBaseOption() {
  //   const option = this.option.option.list
  //   this.baseOption.name = option.name
  //   this.baseOption.fold = option.fold
  //   this.baseOption.chinese = option.chinese
  //   this.baseOption.mode = utils.deepClone(option.mode)
  //   this.baseOption.template = utils.deepClone(option.template)
  //   this.baseOption.classList = this.baseOption.classList.concat(option.classList)
  //   if (option.symbolColor !== '') this.baseOption.symbolColor = option.symbolColor
  //   if (option.font.family !== '') this.baseOption.fontFamily = option.font.family
  //   if (option.font.size !== '') this.baseOption.fontSize = option.font.size
  // }
  analyse() {
    this.template.data.option = Object.assign(this.template.data.option, this.baseOption) // 合并baseOption
    const optionList = [] // 配置项列表
    const audioShowerData = [] // audioShower的数据项列表
    const divideIndex = this.dataList.indexOf('-') // 组件首个分割字符
    if (divideIndex === -1) {
      // 格式错误
      return {
        type: 'error',
        msg: 'list格式错误',
        content: this.content
      }
    }
    for (let i = 1; i < divideIndex; i++) {
      optionList.push(this.dataList[i]) // 加入配置项
    }
    for (let i = divideIndex + 1; i < this.dataList.length; i++) {
      audioShowerData.push(this.dataList[i]) // 加入数据项
    }
    // 处理配置项
    optionList.forEach((option) => {
      const key = option.split('=')[0]
      const left = option.indexOf('=')
      const value = option.slice(left + 1, option.length)
      // 获取键值对
      switch (key) {
        case 'type':
          if (['round', 'rect'].indexOf(value) !== -1) this.template.data.option.type = value
          break
        case 'round':
        case 'rect':
          this.template.data.option.type = value
          break
        case 'title':
          this.template.data.option.title = value
          break
        case 'fillColor':
        case 'FC':
          this.template.data.option.fillColor = value
          break
      }
    })
    // 处理数据
    this.template.data.src = audioShowerData[0]
    this.template.data.imgSrc = audioShowerData[1]
    // 返回组件
    return {
      type: 'success',
      msg: '',
      content: this.template
    }
  }
  getElement() {
    // 导出组件
    const styleStr = '' // 之后要用的style
    const data = this.template.data // 组件数据
    const option = data.option // 组件配置项
    const ASContainer = document.createElement('div')
    const nameContainer = document.createElement('div')
    const name = document.createElement('span')
    const canvasContainer = document.createElement('div')
    const canvasSize = document.createElement('div')
    const canvas = document.createElement('canvas')
    const ASImg = document.createElement('img')
    const controlContainer = document.createElement('div')
    const control = document.createElement('div')
    const playDiv = document.createElement('div')
    const ASProgressBar = document.createElement('input')
    const timeDiv = document.createElement('div')
    const currentTime = document.createElement('span')
    const duration = document.createElement('span')
    const loopDiv = document.createElement('div')
    ASContainer.classList.add('audio-shower-conatiner')
    nameContainer.classList.add('audio-shower-name')
    canvasContainer.classList.add('audio-shower-canvas-conatiner')
    canvasSize.classList.add('audio-shower-canvas-size')
    canvas.classList.add('audio-shower-canvas')
    ASImg.classList.add('audio-shower-canvas-img')
    ASImg.classList.add('audio-shower-canvas-img--norotate')
    control.classList.add('audio-shower-control')
    playDiv.classList.add('audio-shower-control__play')
    ASProgressBar.classList.add('audio-shower-control__progress')
    timeDiv.classList.add('audio-shower-control__time')
    loopDiv.classList.add('audio-shower-control__loop')
    ASProgressBar.setAttribute('type', 'range')
    const resize = () => {
      let h = ASContainer.clientWidth > 800 ? 800 : ASContainer.clientWidth
      if (h > window.innerHeight * 0.8) h = window.innerHeight * 0.8
      canvasSize.style.width = h.toString() + 'px'
      canvasSize.style.height = h.toString() + 'px'
    }
    window.addEventListener('resize', resize)

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    // 创建分析节点
    const analyser = audioCtx.createAnalyser()
    analyser.fftSize = 2048
    // let bufferLength = analyser.frequencyBinCount;
    const bufferLength = 120
    const dataArray = new Uint8Array(bufferLength)
    // 创建媒体元素
    const audio = new Audio()
    audio.src = option.baseURL + data.src
    ASImg.setAttribute('src', option.baseURL + data.imgSrc)
    const source = audioCtx.createMediaElementSource(audio)
    audio.oncanplay = (e) => {
      const aduration = audio.duration
      const minute = parseInt(aduration / 60) < 10 ? '0' + parseInt(aduration / 60).toString() : parseInt(aduration / 60).toString()
      const second = parseInt(aduration % 60) < 10 ? '0' + parseInt(aduration % 60).toString() : parseInt(aduration % 60).toString()
      duration.innerHTML = minute + ':' + second
      ASProgressBar.min = 0
      ASProgressBar.max = audio.duration
      ASProgressBar.value = 0
      draw(true)
    }
    // 将分析节点连接到媒体源
    source.connect(analyser)
    analyser.connect(audioCtx.destination)
    const ctx = canvas.getContext('2d')
    let isPlay = false
    audio.onended = (e) => {
      isPlay = false
      ASImg.classList.add('audio-shower-canvas-img--norotate')
      draw(true)
    }
    ASProgressBar.oninput = (e) => {
      audio.currentTime = e.target.value
    }
    ASProgressBar.style.scrollbarColor = 'red green'
    const play = () => {
      if (!isPlay) audio.play()
      else audio.pause()
      isPlay = !isPlay
      draw()
      ASImg.classList.toggle('audio-shower-canvas-img--norotate')
    }
    const draw = (init = false) => {
      if (!isPlay && init !== true) return
      console.log('draw')
      ASProgressBar.value = audio.currentTime
      const acurrentTime = audio.currentTime
      const minute = parseInt(acurrentTime / 60) < 10 ? '0' + parseInt(acurrentTime / 60).toString() : parseInt(acurrentTime / 60).toString()
      const second = parseInt(acurrentTime % 60) < 10 ? '0' + parseInt(acurrentTime % 60).toString() : parseInt(acurrentTime % 60).toString()
      currentTime.innerHTML = minute + ':' + second
      analyser.getByteFrequencyData(dataArray)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const barWidth = canvas.width / bufferLength
      let barHeight
      let x = 0
      const angle = Math.PI * 2 / bufferLength
      ctx.save()
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      if (option.type === 'round') ctx.translate(canvas.width / 2, canvas.width / 2)
      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i]
        // ctx.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)'
        ctx.fillStyle = option.fillColor
        if (option.type === 'rect') {
          ctx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2)
          x += barWidth
        } else if (option.type === 'round') {
          const roundRect = (ctx, x, y, w, h, r) => {
            ctx.save()
            ctx.beginPath()
            ctx.moveTo(x + r, y)
            ctx.arcTo(x + w, y, x + w, y + r, r)
            ctx.arcTo(x + w, y + h, x + w - r, y + h, r)
            ctx.arcTo(x, y + h, x, y + h - r, r)
            ctx.arcTo(x, y, x + r, y, r)
            ctx.closePath()
            ctx.fill()
            ctx.restore()
          }
          ctx.save()
          ctx.rotate(angle * i)
          const h = barHeight / 256 * 80
          roundRect(ctx, 0, 140, barWidth, (h < barWidth) ? barWidth : h, barWidth / 2)
          ctx.restore()
        }
      }
      ctx.restore()
      if (init !== true) requestAnimationFrame(draw)
    }
    playDiv.addEventListener('click', play)
    ASProgressBar.value = 0
    canvas.width = 500
    canvas.height = 500
    currentTime.innerHTML = '00:00'
    duration.innerHTML = '00:00'
    playDiv.innerHTML = '播放'
    loopDiv.innerHTML = '循环'
    name.textContent = option.title
    nameContainer.appendChild(name)
    canvasSize.appendChild(canvas)
    canvasSize.appendChild(ASImg)
    canvasContainer.appendChild(canvasSize)
    timeDiv.appendChild(currentTime)
    const span = document.createElement('span')
    span.textContent = '/'
    timeDiv.appendChild(span)
    timeDiv.appendChild(duration)
    control.appendChild(playDiv)
    control.appendChild(ASProgressBar)
    control.appendChild(timeDiv)
    control.appendChild(loopDiv)
    controlContainer.appendChild(control)
    ASContainer.appendChild(nameContainer)
    ASContainer.appendChild(canvasContainer)
    ASContainer.appendChild(controlContainer)
    const destoryEvent = () => {
      audioCtx.close()
      window.removeEventListener('resize', resize)
    }
    this.rendererData.eventManager.addBeforeDestroyEvent(destoryEvent)
    return ASContainer
  }
}

export default AudioShowerParser
