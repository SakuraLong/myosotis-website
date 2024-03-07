# Myosotis Website

渲染器在src/myosotis

网站只有“编辑”可用

该渲染器由SakuraRenderer修改而来，其区别主要在于：

1. 由借助Vue3转为原生JavaScript编写
2. 除纯文本以外（结构、组件、模板、模块、内置标签、语法）均转为对象，准备设计内联JavaScript代码来进行事件等处理
3. 加入“结构{()}”，便于进行页面布局
4. 加入“?config”，为不被“{||}”包裹的组件进行可选项设置
5. 优化文件结构
6. 修改渲染流程，先进行文章树构建，再进行渲染
7. 优化继承逻辑，便于继承重写
8. 加入可选项设置（架构已完成，未接入）
9. 加入转义字符设定（已完成）
10. 加入自定义组件、模板、模块、转义字符、语法
11. 优化写作语法，减少使用\\n\\n的次数

# 注意 

该渲染器未完成

# 进度
## 整体
- [X] 总 配置项解析器
- [X] 总 辅助类
- [X] 总 文章树构建
- [X] 总 html元素渲染
- [X] 总 事件管理
## 文章树构建与渲染器渲染
### 组件
- [X] title组件
- [X] para组件
- [ ] list组件
- [ ] table组件
- [ ] audio组件
- [ ] video组件
- [ ] 图片显示器组件
- [ ] 图表组件
### 结构
- [X] structure结构
### 行内配置
- [X] ?config配置
### 模板
- [X] unknown未知模板
- [X] a超链接模板
- [ ] quote引用模板
- [ ] heimu黑幕模板
- [ ] blur模糊模板
- [ ] text文本模板
- [ ] del删除线模板
- [ ] und下划线模板
- [ ] ruby注解模板
- [ ] id模板
- [ ] ref参考模板
- [ ] github模板
### 标签
- [X] ignore忽略标签
- [X] poem诗歌标签
- [ ] code代码块标签
- [ ] html标签
### 模块
- [X] unknown未知模块
- [X] inlineAudio行内音频模块
- [ ] inlineImage行内图片模块
- [ ] inlineVideo行内视频模块
### 语法
- [X] del删除线语法
- [ ] bold加粗语法
- [ ] italic斜体语法
- [ ] boldItalic粗斜体语法
- [ ] und下划线语法
- [ ] math数学公式语法
- [ ] code代码块语法
## 组件支持
- [X] article文章组件
- [ ] catalogue目录组件
## 功能支持
### 自定义
- [X] 自定义组件
- [X] 自定义模板
- [ ] 自定义标签
- [ ] 自定义模块
- [ ] 自定义语法
- [ ] 自定义组件配置项解析器
- [ ] 自定义组件配置项
### 渲染模式
- [X] 文章模式
- [X] 预览模式
### 配置项
- [X] 配置项设置

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
