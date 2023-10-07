class VNode {
  constructor ({ r_node, v_node }) {
    this._r_node = r_node || null
    this._v_node = v_node || null
  }

  get r_node () {
    return this._r_node
  }

  get v_node () {
    return this._v_node
  }
}

export default VNode

'https://juejin.cn/post/6944214549696348168'