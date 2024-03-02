import Assistant from './assistants/index.mjs'
import Configurator from './configurators/index.mjs'
import Parser from './parsers/index.mjs'

import Article from './components/article/index.mjs'

class Myosotis {
  constructor(option, userData) {
    this.option = option || {}
    this.userData = userData || {}
    this.configurator = new Configurator()
    this.assistant = new Assistant()
    this.eventManager = null
    this.article = null
    this.catalogue = null
    this.config = {}
  }
  init() {
    //
  }
  /**
   * Myosotis.addComponent(componentParser, componentRenderer [, componentConfigurator, config]) -> Boolean
   * - componentParser (ComponentParser): component parser(inherited from ComponentParser) 组件解析器（继承自ComponentParser）
   * - componentRenderer (ComponentRenderer): component renderer(inherited from ComponentRenderer) 组件渲染器（继承自ComponentRenderer）
   * - componentConfigurator (Configurator): component configurator(inherited from Configurator) 组件配置项解析器（继承自Configurator）
   * - config (Object): component config 组件基础配置
   */
  addComponent(componentParser, componentRenderer, componentConfigurator, config) {

  }

  /**
   * Myosotis.render(src, parent) -> False, Array || Article, Catalogue
   * - src (String): article string 文章字符串
   * - parent (Object): the parent HTML element of the article 文章的父元素
   *
   * Render articles that comply with our renderer syntax into HTML elements.
   * 将我们符合我们渲染器语法的文章渲染成html元素
   *
   **/
  render(src, parent) {
    // src -> config, article -> 合并配置项 -> 文章解析 -> 渲染文章
    return new Promise((resolve, reject) => {
      try {
        const tree = this.buildTree(src)
        this.renderArticle(tree, parent)
      } catch (err) {
        reject(err)
      }
      resolve(true)
    })
  }

  buildTree(src) {
    this.configurator.addOption(this.option)
    const splitRes = this.assistant.splitArticle(src)
    const articleOption = splitRes.option
    const article = splitRes.article
    this.configurator.addArticleOption(articleOption)
    const config = this.configurator.get()
    this.config = config
    const parser = new Parser(config, article, {})
    return parser.build()
  }

  renderArticle(tree, parent) {
    const article = new Article(this.config, tree, parent)
    article.render()
  }
}

export default Myosotis
