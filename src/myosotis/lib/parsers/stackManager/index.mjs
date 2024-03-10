import utils from '../../../common/utils'
import Structure from './structure/structure.mjs'
import Config from './config/config.mjs'
import Component from './components/component.mjs'
import Components from './components/components.mjs'
import Title from './components/title.mjs'
import List from './components/list.mjs'
import Table from './components/table.mjs'

class StackManager {
  constructor(config, replaceManager) {
    this.config = config
    this.replaceManager = replaceManager
  }
  build(src) {
    return this.buildList(src)
  }
  buildList(src) {
    const data = {
      begin: -1,
      end: -1,
      status: -1
    }
    const article = new Structure(this.config, '', null).build()
    const nodeStack = [article]
    const beginFunc = [
      Component.begin,
      Structure.begin,
      Config.begin,
      Title.begin,
      List.begin,
      Table.begin
    ]
    const endFunc = [
      Component.end,
      Structure.end,
      Config.end,
      Title.end,
      List.end,
      Table.end
    ]
    const parsers = [
      Structure,
      Config,
      Title,
      List,
      Table
    ]
    // Structure 0
    // Config 1
    // Component 2
    // Title 3
    // List 4
    // Table 5
    for (let i = 0; i < src.length; i++) {
      if (data.status === -1) {
        // 进行全部起始判断
        for (let j = 0; j < beginFunc.length; j++) {
          const res = beginFunc[j](i, src, data, j)
          if (res.match) {
            res.list.forEach((para) => {
              new Components(this.config, this.replaceManager).build(nodeStack, para, true)
            })
            break
          }
        }
      } else {
        // 进行结束判断 此情况下组件之间无法嵌套
        const index = data.status
        const res = endFunc[data.status](i, src, data)
        if (res.match) {
          if (index === 0) {
            new Components(this.config, this.replaceManager).build(nodeStack, res.content)
          } else {
            const Parser = parsers[index - 1]
            new Parser(this.config, res.content, this.replaceManager).build(nodeStack)
          }
        }
      }
      if (i === src.length - 1 && data.status === -1) {
        const temp = src.slice(data.startEnd === -1 ? 0 : data.startEnd + 1, i + 1).trim().split('\n\n')
        temp.forEach((para) => {
          new Components(this.config, this.replaceManager).build(nodeStack, para, true)
        })
      }
    }
    const res = this.mergeStructure(article)
    console.log(article)
    console.log(res)
    return res
  }
  mergeStructure(article_) {
    const article = new Structure(this.config, '', null).build()
    const tempStack = [article]
    article_.children.forEach((child) => {
      if (child.type === 'structure') {
        if (child.config.pos === 'begin') {
          // 结构开始
          tempStack[tempStack.length - 1].children.push(child)
          tempStack.push(child)
        } else if (child.config.pos === 'end') {
          // 结构结束
          tempStack.pop()
        }
      } else if (child.type === 'config') {
        return
      } else {
        tempStack[tempStack.length - 1].children.push(child)
      }
    })
    return utils.deepClone(article)
  }
}

export default StackManager
