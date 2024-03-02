# Myosotis Website

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
