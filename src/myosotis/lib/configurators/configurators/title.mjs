import Configurator from './configurator.mjs'

class TitleCfg extends Configurator {
  constructor(status, baseOption, modifiable, dataList) {
    super(status, ['title'], modifiable, dataList, 'TITLE', 'TITLE', baseOption)
    this.optionMap = {
      textAlign: {
        path: ['textAlign'],
        func: this.textAlignAnalyse
      },
      borderPosition: {
        path: ['borderPosition'],
        func: this.borderPositionAnalyse
      },
      hoverAnimation: null,
      hasLink: null,
      family: ['font', 'family'],
      size: ['font', 'size'],
      color: null,
      classList: {
        path: ['classList'],
        func: this.classListAnalyse
      }
    }
  }
  textAlignAnalyse(value) {
    return this.useListGetValue(['left', 'right', 'center'], value)
  }
  borderPositionAnalyse(value) {
    return this.useListGetValue(['left', 'bottom', 'none'], value)
  }
}

export default TitleCfg
