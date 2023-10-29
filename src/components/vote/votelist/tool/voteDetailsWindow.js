/** 点击粗略节点后显示的详细节点 */
import './voteDetailsWindow.less'

class VoteDetailsWindowInfo {
  /** {HTMLDivElement} voteNode 详细投票节点 */
  _voteNode
  /** {HTMLDivElement} _roughVoteNode 粗略投票节点 */
  _roughVoteNode
  /** {number} upLong 粗略投票节点上移距离，用于详细节点位置校准 */
  _upLong
  /** {Object} info 详细信息 */
  _info
  /** {VoteRoughList} voteRoughList VoteRoughList实例 */
  _voteRoughList
  /** {number} height 详细投票节点高度 */
  height

}

class VoteDetailsWindow extends VoteDetailsWindowInfo {

  /**
   * @param {HTMLDivElement} roughVoteNode 粗略投票节点
   * @param {number} upLong 粗略投票节点上移距离，用于详细节点位置校准
   * @param {Object} info 详细信息
   * @param {VoteRoughList} voteRoughList VoteRoughList实例
   */
  constructor (roughVoteNode, upLong, info, voteRoughList) {
    super()
    this._voteRoughList = voteRoughList
    this._upLong = upLong
    this._info = info
    this._roughVoteNode = roughVoteNode
    console.log(info)
    this.#create()
  }

  /**
   * 创建节点
   */
  #create () {
    this._voteNode = document.createElement('div')
    this._voteNode.classList.add('xj-details-vote-node')
    this._voteNode.style['top'] = - this._upLong + 'px'
    /* 创建标题节点 */
    const title = document.createElement('div')
    title.classList.add('xj-details-vote-title')
    title.appendChild(document.createTextNode(this._info['title']))
    this._voteNode.appendChild(title)
    this._roughVoteNode.appendChild(this._voteNode)
    /* 创建关闭节点 */
    const closeButton = document.createElement('div')
    closeButton.classList.add('xj-details-vote-close')
    const closeButtonSpan = document.createElement('span')
    closeButtonSpan.classList.add('xj-iconfont')
    closeButtonSpan.classList.add('xj-icon-close')
    closeButton.addEventListener('click', () => {
      this.#disappear()
    })
    closeButton.appendChild(closeButtonSpan)
    title.appendChild(closeButton)
    /* 创建主节点 */
    const main = document.createElement('div')
    main.classList.add('xj-details-vote-main')
    main.style['top'] = `calc(2% + ${ parseInt(getComputedStyle(title)['height']) }px + 20px)`
    /* 创建content节点 */
    const content = document.createElement('p')
    content.appendChild(document.createTextNode(this._info['content']))
    /* 创建投票选项节点 */
    const voteOptions = this.#createVoteOptions()
    main.appendChild(content)
    main.appendChild(voteOptions)
    this._voteNode.appendChild(main)

    // this._roughVoteNode.appendChild(this._voteNode)
    this.height = parseFloat(getComputedStyle(this._voteNode)['height'])
    this.#appear()

  }

  /**
   * 创建投票选项
   * @returns {HTMLDivElement}
   */
  #createVoteOptions () {
    const voteOptions = document.createElement('div')
    voteOptions.classList.add('xj-details-vote-options')
    this._info['voteOptionLaunchDTOs'].forEach(item => {
      const voteOption = document.createElement('div')
      voteOption.classList.add('xj-details-vote-option')
      const text = document.createElement('p')
      text.appendChild(document.createTextNode(item['content']))
      voteOption.appendChild(text)
      voteOptions.appendChild(voteOption)
    })
    return voteOptions
  }

  /**
   * 节点出现
   */
  #appear () {
    requestAnimationFrame(() => {
      this._voteNode.style['opacity'] = 1
      this._voteNode.style['top'] = 'calc(100% + 10px)'
    })
  }

  /**
   * 节点消失
   */
  #disappear () {
    requestAnimationFrame(() => {
      this._voteNode.style['opacity'] = 0
      this._voteNode.style['top'] = - this._upLong + 'px'
      this._voteRoughList.nodeClickFinish()
    })
    setTimeout(() => {
      this._voteNode.remove()
    }, 600)
  }

  /**
   * 详细投票节点消失
   */
  disappear () {
    this.#disappear()
  }

}

export default VoteDetailsWindow