/*class VDom {
  constructor(tag, data, value, type) {
    this.tag = tag && tag.toLowerCase() // 节点名
    this.data = data // 属性
    this.value = value // 文本数据
    this.type = type // 节点类型
    this.children = []
  }
  appendChild(vnode) {
    this.children.push(vnode)
  }
}*/

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
