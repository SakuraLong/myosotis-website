import Myosotis from '@/myosotis'

class AudioShowerRenderer extends Myosotis.ComponentRenderer {
  static name = 'audioShower'
  constructor(config, node, map, data) {
    super('audioShower', config, node, map, data)
  }
  _V_renderSelf() {
    const config = this.config
    /* ----- 组件标签定义 ----- */
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
    const span = document.createElement('span')
    /* ----- 标签类设置 ----- */
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
    /* ----- 组件子元素加入 ----- */
    this.renderChildren(name, this.node.children)
    /* ----- 组件信息计算 ----- */
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    const analyser = audioCtx.createAnalyser()
    analyser.fftSize = 2048
    const bufferLength = 120
    const dataArray = new Uint8Array(bufferLength)
    const audio = new Audio()
    audio.src = config.baseURL + config.src
    ASImg.setAttribute('src', config.baseURL + config.imgSrc)
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
    const play = () => {
      if (!isPlay) audio.play()
      else audio.pause()
      isPlay = !isPlay
      draw()
      ASImg.classList.toggle('audio-shower-canvas-img--norotate')
    }
    const draw = (init = false) => {
      if (!isPlay && init !== true) return
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
      if (config.type === 'round') ctx.translate(canvas.width / 2, canvas.width / 2)
      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i]
        // ctx.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)'
        ctx.fillStyle = config.fillColor
        if (config.type === 'rect') {
          ctx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2)
          x += barWidth
        } else if (config.type === 'round') {
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
    const resize = () => {
      let h = ASContainer.clientWidth > 800 ? 800 : ASContainer.clientWidth
      if (h > window.innerHeight * 0.8) h = window.innerHeight * 0.8
      canvasSize.style.width = h.toString() + 'px'
      canvasSize.style.height = h.toString() + 'px'
    }
    const destoryEvent = () => {
      isPlay = false
      audioCtx.close()
      window.removeEventListener('resize', resize)
    }
    window.addEventListener('resize', resize)
    this.addCloseFunc(destoryEvent)
    /* ----- 标签attr设置 ----- */
    ASProgressBar.setAttribute('type', 'range')
    span.textContent = '/'
    /* ----- 标签style设置 ----- */
    playDiv.style.cursor = 'pointer'
    loopDiv.style.cursor = 'not-allowed'
    /* ----- 标签结构构建 ----- */
    nameContainer.appendChild(name)
    canvasSize.appendChild(canvas)
    canvasSize.appendChild(ASImg)
    canvasContainer.appendChild(canvasSize)
    timeDiv.appendChild(currentTime)
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
    /* ----- 返回组件信息 ----- */
    return {
      text: false,
      element: ASContainer
    }
  }
}

export default AudioShowerRenderer
