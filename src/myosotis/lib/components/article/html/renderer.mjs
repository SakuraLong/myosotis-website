class Renderer {
  constructor(config, node, map, data) {
    this.config = config
    this.node = node
    this.map = map
    this.data = data
  }
  render() {
    return this._V_renderSelf()
  }
  _V_renderSelf() {
    return {
      text: true,
      element: ''
    }
  }
  renderChildren(parent, node) {
    node.children.forEach((child) => {
      // console.log(child.type, child.name)
      const ChildRenderer = this.map.get(child.type).get(child.name)
      const childRenderer = new ChildRenderer(child.config, child, this.map, this.data)
      const res = childRenderer.render()
      if (res.text) parent.append(res.element)
      else parent.appendChild(res.element)
    })
  }
}

export default Renderer
