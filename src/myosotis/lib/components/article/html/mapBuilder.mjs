import utils from '../../../../common/utils.mjs'

class MapBuilder {
  constructor(config, type) {
    this.config = config
    this.type = type
    this.renderers = []
  }
  init() {
    /**
     * 子类重写
     * 加入自定义的渲染器
     */
  }
  buildRenderersMap(map, data) {
    if (map.get(this.type) === undefined) map.set(this.type, new Map())
    const self = map.get(this.type)
    this.renderers.forEach((renderer) => {
      if (renderer.name !== null) self.set(renderer.name, renderer)
      /**
       * 因为可能会多次渲染文章，此处data需要深拷贝，否则再次渲染数据会错误
       */
      if (renderer.data !== null) data = Object.assign(data, utils.deepClone(renderer.data))
    })
  }
}

export default MapBuilder
