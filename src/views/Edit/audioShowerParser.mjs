import Myosotis from '@/myosotis'

class AudioShowerParser extends Myosotis.Component {
  constructor(config, src, replaceManager) {
    super('audioShower', config, src, replaceManager)
    this.nodeConfig = {
      src: '',
      imgSrc: ''
    }
    this._V_nameList = ['audioShower', '音频可视化']
    this._V_keyList = [
      ['type',          'round',      'rect',       ['round', 'rect'],       'round'],
      ['fillColor',     'FC',         null,         '#FF94D8']
    ]
  }
  _V_analyse() {
    // 根据dataList分析组件数据
    this.dataList.forEach((data, i) => {
      if (i === 0) {
        const textNode = this.createTextNode(data)
        this.children.push(textNode)
      } else if (i === 1) {
        this.updateConfig('imgSrc', data)
      } else {
        this.updateConfig('src', data)
      }
    })
  }
}

export default AudioShowerParser
