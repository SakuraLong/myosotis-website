import Configurator from './configurator.mjs'

class TitleCfg extends Configurator {
  constructor(status, baseOption, modifiable, dataList) {
    super(status, ['title'], modifiable, dataList, 'TITLE', 'TITLE', baseOption)
    this.optionMap = {
      textAlign: {
        path: ['textAlign'],
        func: (value) => { return this.textAlignAnalyse(value) }
      },
      borderPosition: {
        path: ['borderPosition'],
        func: (value) => { return this.borderPositionAnalyse(value) }
      },
      hoverAnimation: null,
      hasLink: null,
      family: ['font', 'family'],
      size: ['font', 'size'],
      color: null,
      classList: {
        path: ['classList'],
        func: (value) => { return this.classListAnalyse(value) }
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
