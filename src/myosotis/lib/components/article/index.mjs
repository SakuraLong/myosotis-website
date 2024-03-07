/**
 * 文章类
 */

import Components from './html/components/components.mjs'
import Structures from './html/structures/structures.mjs'
import Labels from './html/labels/labels.mjs'
import Texts from './html/text/texts.mjs'
import Templates from './html/templates/templates.mjs'
import Htmls from './html/htmls/htmls.mjs'
import Grammars from './html/grammars/grammars.mjs'

import Structure from './html/structures/structure.mjs'

import EventManager from '../../managers/eventManager/index.mjs'

class Article {
  constructor(config, tree, parent, catalogue = null) {
    /**
     * 完整配置项
     */
    this.config = config
    /**
     * 组件树
     */
    this.tree = tree
    /**
     * 文章挂载的元素
     */
    this.parent = parent
    /**
     * 目录对象
     */
    this.catalogue = catalogue
    /**
     * type name 到 渲染器 的映射
     */
    this.map = new Map()
    /**
     * 事件管理器
     */
    this.eventManager = new EventManager()
    /**
     * 渲染器列表
     */
    this.renderersList = [
      Components,
      Structures,
      Texts,
      Templates,
      Labels,
      Htmls,
      Grammars
    ]
    /**
     * 渲染中需要使用的数据
     */
    this.data = {
      mamagers: {
        eventManager: this.eventManager
      },
      data: {
        wordsAmount: 0,
        component: {
          amount: 0,
          nameList: [],
          detail: []
        },
        template: {
          amount: 0,
          nameList: [],
          detail: []
        },
        module: {
          amount: 0,
          nameList: [],
          detail: []
        },
        label: {
          amount: 0,
          nameList: [],
          detail: []
        },
        grammar: {
          amount: 0,
          nameList: [],
          detail: []
        }
      },
      settingConfig: this.config.setting
    }
    /**
     * 文章关闭观察器
     */
    this.closeObserver = {
      beforeunloadFunc: this.beforeunload.bind(this),
      mutationObserver: null
    }
    /**
     * 初始化
     */
    this.init()
  }

  init() {
    this.renderersList.forEach((Renderers) => {
      new Renderers(this.config).buildRenderersMap(this.map, this.data)
    })
  }

  /**
   * 渲染函数
   */
  render() {
    const structure = new Structure(this.tree.config, this.tree, this.map, this.data)
    const article = structure._V_renderSelf().element
    this.parent.innerHTML = ''
    this.parent.appendChild(article)
    this.closeObserverInit()
    console.log(article, this.data)
  }

  closeObserverInit() {
    const closeFunc = this.close.bind(this)
    window.addEventListener('beforeunload', this.closeObserver.beforeunloadFunc)
    this.closeObserver.mutationObserver = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.removedNodes.length > 0) {
          closeFunc()
        }
      })
    })
    const config = { childList: true, subtree: true }
    this.closeObserver.mutationObserver.observe(this.parent, config)
  }

  close() {
    console.log('渲染器关闭')
    if (this.eventManager) this.eventManager.close()
    if (this.closeObserver.mutationObserver) this.closeObserver.mutationObserver.disconnect()
    window.removeEventListener('beforeunload', this.closeObserver.beforeunloadFunc)
  }

  beforeunload(e) {
    this.close()
  }
}

export default Article
