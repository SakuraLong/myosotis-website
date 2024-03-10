/**
 * 导入样式
 */
import '../common/theme-chalk'
/**
 * 导入辅助函数、配置项解析器、语法分析器
 */
import Assistant from './assistants/index.mjs'
import Configurators from './configurators/index.mjs'
import Parser from './parsers/index.mjs'
/**
 * 导入配置项解析器基类
 */
import Configurator from './configurators/configurators/configurator.mjs'
/**
 * 导入组件基类
 * 导入模板基类
 * 导入模块基类
 * 导入语法基类
 * 导入标签基类
 */
import Component from './parsers/stackManager/components/component.mjs'
import Template from './parsers/replaceManager/templates/template.mjs'
import Module from './parsers/replaceManager/modules/module.mjs'
import Grammar from './parsers/replaceManager/grammars/grammar.mjs'
import Label from './parsers/replaceManager/labels/label.mjs'
/**
 * 导入组件渲染器基类
 * 导入模板渲染器基类
 * 导入标签渲染器基类
 */
import ComponentRenderer from './components/article/html/components/component.mjs'
import TemplateRenderer from './components/article/html/templates/template.mjs'
import LabelRenderer from './components/article/html/labels/label.mjs'
/**
 * 导入文章渲染器
 */
import Article from './components/article/index.mjs'
/**
 * 导入加载器
 */
import FontsLoader from './loaders/fontsLoader.mjs'
import FileLoader from './loaders/fileLoader.mjs'
/**
 * 导入utils
 */
import utils from '../common/utils.mjs'

class Myosotis {
  static Configurator = Configurator

  static Component = Component
  static Template = Template
  static Module = Module
  static Grammar = Grammar
  static Label = Label

  static ComponentRenderer = ComponentRenderer
  static TemplateRenderer = TemplateRenderer
  static LabelRenderer = LabelRenderer

  static FontsLoader = FontsLoader
  static FileLoader = FileLoader

  constructor(option, userData) {
    /**
     * 用户设置的自定义可选项
     */
    this.option = option || {}
    /**
     * 用户设置的userData
     */
    this.userData = userData || {}
    /**
     * 配置项解析器
     */
    this.configurators = new Configurators()
    /**
     * 辅助函数存储器
     */
    this.assistant = new Assistant()
    /**
     * 文章对象
     */
    this.article = null
    /**
     * 目录对象
     */
    this.catalogue = null
    /**
     * 配置项
     */
    this.config = {}
  }
  init() {
    //
  }

  /**
   * Myosotis.addComponent(component, componentRenderer [, componentCfg, config]) -> Boolean
   * - component (Component): component parser(inherited from Component) Component
   * - componentRenderer (ComponentRenderer): component renderer(inherited from ComponentRenderer) 组件渲染器（继承自ComponentRenderer）
   * - componentCfg (Configurator): component configurator(inherited from Configurator) 组件配置项解析器（继承自Configurator）
   * - config (Object): component config 组件基础配置
   */
  addComponent(component, componentRenderer, componentCfg = null, config = null) {
    if (!utils.check(component, Component, 'class')) return this
    if (!utils.check(componentRenderer, ComponentRenderer, 'class')) return this

    if (!utils.check(componentCfg, Configurator, 'class') && !utils.check(config)) {
      this.configurators.add(componentCfg, config)
    }

    this.configurators.addParserAndRenderer(component, componentRenderer, 'comp')
    return this
  }

  addTemplate(template, templateRenderer) {
    if (!utils.check(template, Template, 'class')) return this
    if (!utils.check(templateRenderer, TemplateRenderer, 'class')) return this

    this.configurators.addParserAndRenderer(template, templateRenderer, 'temp')
    return this
  }

  addLabel(label, labelRenderer) {
    if (!utils.check(label, Label, 'class')) return this
    if (!utils.check(labelRenderer, LabelRenderer, 'class')) return this
    this.configurators.addParserAndRenderer(label, labelRenderer, 'label')
    return this
  }

  /**
   * Myosotis.render(src, parent) -> False, Array || Article, Catalogue
   * - src (String): article string 文章字符串
   * - parent (Object): the parent HTML element of the article 文章的父元素
   *
   * Render articles that comply with our renderer syntax into HTML elements.
   * 将我们符合我们渲染器语法的文章渲染成html元素
   *
   */
  render(src, parent) {
    // src -> config, article -> 合并配置项 -> 文章解析 -> 渲染文章
    return new Promise((resolve, reject) => {
      try {
        const tree = this.buildTree(src)
        this.renderArticle(tree, parent)
      } catch (err) {
        reject(err)
      }
      resolve(this.article)
    })
  }

  /**
   * Myosotis.buildTree(src) -> Object
   * - src (String): article string 文章字符串
   *
   * 将文章渲染成组件树
   *
   */
  buildTree(src) {
    this.configurators.addOption(this.option)
    const splitRes = this.assistant.splitArticle(src)
    const articleOption = splitRes.option
    const article = splitRes.article
    this.configurators.addArticleOption(articleOption)
    const config = this.configurators.get()
    this.config = config
    const parser = new Parser(config, article, {})
    return parser.build()
  }

  /**
   * Myosotis.renderArticle(tree, parant)
   * - tree (Object): component tree 组件树
   * - parent (HTML Element): 挂载文章的根元素
   *
   * 根据组件树将文章渲染到页面上面
   *
   */
  renderArticle(tree, parent) {
    if (this.article) this.article.close()
    this.article = new Article(this.config, tree, parent)
    this.article.render()
  }

  renderCata(parent) {
    if (!this.article) return false
  }

  close() {
    if (this.article) this.article.close()
    if (this.catalogue) this.catalogue.close()
  }
}

export default Myosotis
