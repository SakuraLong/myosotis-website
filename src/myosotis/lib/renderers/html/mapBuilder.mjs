class MapBuilder {
  constructor(config, type) {
    this.config = config
    this.type = type
    this.renderers = []
  }
  init() {
    // 加入自定义的渲染器
  }
  buildRenderersMap(map) {
    if (map.get(this.type) === undefined) map.set(this.type, new Map())
    const self = map.get(this.type)
    this.renderers.forEach((renderer) => {
      self.set(renderer.name, renderer)
    })
  }
}

export default MapBuilder
