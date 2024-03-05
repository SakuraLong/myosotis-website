export default {
  setting: {
    article: {
      limitsOfAuthority: 'article' // 文章配置项权限 article none
    },
    preview: {
      preview: false, // 是否是预览 true false
      viewContent: 'paragraph', // 预览内容 paragraph component words
      viewAmount: 2, // 预览内容数量 0 ~ +∞
      catalogue: false // 预览模式是否显示目录 true false
    },
    theme: {
      theme: 'light' // 主题 light dark
    },
    disable: {
      components: [],
      templates: [],
      modules: [],
      labels: [],
      grammars: []
    }, // 禁用组件、模板、模块的类名
    custom: {
      configurators: [], // 自定义配置项解析器
      components: [], // 自定义组件
      templates: [], // 自定义模板
      modules: [], // 自定义模块
      labels: [], // 自定义标签
      grammar: [] // 自定义语法
    }
  },
  option: {
    user: {}, // 用户自定义传输信息
    article: {
      title: '', // 文章的总标题，如果存在会显示在最顶部，且不会计入目录
      titleFont: {
        family: '', // 字体 如果是自定义字体需要配套css
        size: '', // 字号 css支持的字号设置
        color: '' // 颜色 css支持的颜色设置
      },
      message: {
        showMessage: false, // 如果文章有信息是否显示 true false
        arrangement: [['publicTime', 'modificationTime'], ['author', 'location', 'words']], // 信息展示的顺序和结构
        textAlign: 'center', // 信息显示时的文字位置 left center right
        publicTime: -1, // 发布时间 时间戳
        modificationTime: -1, // 修改时间 时间戳
        author: '', // 作者 字符串
        location: '', // 写作地点 字符串
        words: true // 是否开启自动计算字数 true false
      },
      font: {
        family: '', // 字体 如果是自定义字体需要配套css
        size: '16px', // 字号 css支持的字号设置
        lineHeight: 'normal' // 行高 css支持的行高设置
      },
      classList: []
    },
    catalogue: {
      position: {
        PC: 'right',
        mobile: 'top'
      }, // 目录显示的位置 left right top bottom out（需要外部给容器） none（不存在目录）
      hide: {
        PC: 500,
        mobile: false
      }, // 目录隐藏的条件 0 ~ +∞ true（一直隐藏） false（不隐藏） 当position是right和left时数字判断生效，代表是文章区域的总宽度，小于此值时目录隐藏
      float: {
        PC: 300,
        mobile: true
      }, // 目录浮动的条件 0 ~ +∞ true（一直浮动） false（不浮动） 当position是right和left时数字判断生效，代表是文章区域的总宽度，小于此值时目录浮动
      // float > hide > position
      show: {
        scrollbar: true, // 目录是否有滚动条 true false 没有滚动条则目录会完全显示出来
        height: 300, // 目录高度 0 ~ +∞ (px) 当scrollbar为true时生效 （目录浮动时，高度最高不会超过屏幕的高度）
        showLevel: 6, // 标题显示等级 1 ~ 6
        style: {
          bg: true, // 当前的标题是否有背景颜色 true false
          line: true // 目录是否有左侧竖线 true false
        }
      }
    },
    title: {
      textAlign: 'left',
      borderPosition: 'left', // 边框位置
      hoverAnimation: false, // hover动画
      hasLink: true, // 有无页面内跳转链接
      font: {
        family: '',
        color: ''
      },
      classList: []
    },
    paragraph: {
      font: {
        family: '', //
        size: '' // 字号 css
      },
      classList: []
    },
    list: {
      name: '', // 列表名字
      fold: false, // 是否折叠
      chinese: false, // 序号是否用中文
      mode: {
        order: 'default',
        unorder: 'default'
      }, // 模式
      template: {
        order: {
          l: '',
          r: ''
        },
        unorder: ['●', '○', '■', '□']
      }, // 模板
      font: {
        family: '', //
        size: '' // 字号 css
      },
      symbolColor: '',
      classList: []
    },
    table: {
      name: '', // 表格名字
      fold: false, // 表格是否折叠
      hover: 'row', // 是否有浮动样式
      border: 'border', // border属性
      node: {
        width: ['auto'], // nw=100px
        height: ['auto'] // nh=100px
      },
      font: {
        family: '', //
        size: '' // 字号 css
      },
      classList: []
    }
  },
  type: [] // 给组件等类型后会在这里面进行寻找是否有符合的，进行赋值
}
