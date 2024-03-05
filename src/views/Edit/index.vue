<template>
  <div class="edit">
    <h2 style="text-align: center;">在线编辑</h2>
    <p style="text-align: center;">在聚焦到textarea的情况下按下ctrl + s即可渲染</p>
    <div class="edit__body">
      <div class="edit__input">
        <div @click="showCata = !showCata">显示目录</div>
        <div
          v-show="showCata"
          ref="cata"
          class="cata"
        />
        <textarea
          ref="textarea"
          v-model="code"
          class="edit__textarea"
          spellcheck="false"
          :onfocus="focus"
          :onblur="blur"
        />
      </div>
      <div
        id="edit-shower"
        ref="editShower"
        class="edit__shower"
      >
        <!-- <sr-article-container ref="render" height="100%" parentId="edit-shower"></sr-article-container> -->
      </div>
    </div>
  </div>
</template>

<script>
// import AudioShowerParser from './audio'
// import DreamParser from './dream'
// import PoemParser from './t.js'
// import SakuraRenderer from '@/sakura-renderer'
// import SakuraRenderer from '@/sakura-renderer-new'
import Myosotis from '@/myosotis'
import AudioShowerParser from './audioShowerParser.mjs'
import AudioShowerRenderer from './audioShowerRenderer.mjs'
export default {
  name: 'Edit',
  beforeRouteLeave(to, from, next) {
    if (this.code !== '= Hello world') {
      const answer = window.confirm('系统可能不会保存你所做的修改')
      if (answer) {
        next()
      } else {
        next(false)
      }
    } else next()
  },
  data() {
    return {
      textareaHasChange: false,
      code: '= Hello world',
      allowCtrlS: true,
      showCata: true,
      renderer: null
    }
  },
  mounted() {
    // window.scrollTo({ top: 0 })
    // const editor = new SakuraRenderer.Editor({}, this.$refs.testDiv)
    const that = this
    window.addEventListener('beforeunload', this.beforeunload)
    document.addEventListener('keydown', this.keydown)
    // this.$refs.render.updateUserData({
    //   githubToken: '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'
    // })
    this.render()
  },
  beforeUnmount() {
    // this.renderer.destroy()
    window.removeEventListener('beforeunload', this.beforeunload)
    document.removeEventListener('keydown', this.keydown)
    window.scrollTo(0, 0)
  },
  methods: {
    beforeunload(e) {
      let fp = this.$route.fullPath
      fp = fp.slice(0, fp.indexOf('#') === -1 ? fp.length : fp.indexOf('#'))
      if (fp === '/edit' && this.code !== '= Hello world') { // 注意这里要替换成自己的当前页面的路由
        e.returnValue = '关闭提示'
      } else {
        window.removeEventListener('beforeunload', this.beforeunload)
      }
    },
    focus() {
      this.allowCtrlS = false
    },
    blur() {
      this.allowCtrlS = true
    },
    keydown(e) {
      const textarea = this.$refs.textarea
      if (!this.allowCtrlS && e.ctrlKey === true && e.keyCode === 83) {
        e.preventDefault()
        this.render()
        return false // 截取返回false就不会保存网页了
      } else if (!this.allowCtrlS && e.key === 'Tab') {
        e.preventDefault()

        var start = textarea.selectionStart
        var end = textarea.selectionEnd

        // 插入制表符
        textarea.value = textarea.value.substring(0, start) + '\t' + textarea.value.substring(end)

        // 将光标移动到插入后的位置
        textarea.selectionStart = textarea.selectionEnd = start + 1
      }
    },
    render() {
      if (this.code !== '') {
        const myosotis = new Myosotis()
        console.log(AudioShowerParser, AudioShowerRenderer)
        myosotis.addComponent(AudioShowerParser, AudioShowerRenderer)
        myosotis.render(this.code, this.$refs.editShower)
        // SakuraRenderer.renderArticle(this.$refs.editShower, this.code)
        // const catalogue = new SakuraRenderer.Catalogue(this.$refs.cata)
        // const renderer = SakuraRenderer.createRenderer(this.$refs.editShower)
        // renderer.addModule('mmm', 'aaa').addTemplate(PoemParser).addComponent(AudioShowerParser, null).addTemplate(DreamParser) // addComponent('asc', 'hhh')
        // renderer.addOption({
        //   option: {
        //     article: {
        //       font: {
        //         size: '16px'
        //       },
        //       classList: ['test-article']
        //     },
        //     title: {
        //       textAlign: 'center',
        //       borderPosition: 'none',
        //       hasLink: true,
        //       classList: ['test-title'],
        //       font: {
        //         family: '"Noto Serif SC", DM Serif Display, STZhongsong, STKaiti, KaiTi, Roboto, serif'
        //       }
        //     },
        //     paragraph: {
        //       font: {
        //         family: '"Noto Serif SC", DM Serif Display, STZhongsong, STKaiti, KaiTi, Roboto, serif',
        //         size: '20px'
        //       },
        //       classList: ['test-para']
        //     }
        //   }
        // })
        // renderer.bindCatalogue(catalogue)
        // renderer.setArticle(this.code)
        // console.log(new Date().getTime())
        // renderer.render({
        //   dom: this.$refs.editShower
        // }).then((res) => {
        //   console.log(new Date().getTime())
        //   console.log(res)
        //   console.log(renderer.getArticleData({ abc: 'asc' }))
        // }).catch((error) => {
        //   console.log(error)
        // })
        // this.renderer = renderer
        // this.$refs.render.setArticle(this.code)
        // this.$refs.render.render(this.$refs.editShower, )
      }
    }
  }
}
</script>

<style>
.edit__body {
  position: relative;
  width: 100%;
  height: calc(100vh - 80px);
}

.edit__input {
  display: inline-block;
  height: calc(100% - 10px);
  width: calc(40% - 10px);
  max-width: calc(700px - 10px);
  padding: 5px;
}

.edit__shower {
  position: absolute;
  top: 0;
  display: inline-block;
  height: 100%;
  width: calc(100% - 700px - 10px);
  min-width: calc(60% - 10px);
  overflow: auto;
}

.edit__textarea {
  font-family: 'Consolas';
  font-size: 18px;
  padding: 5px;
  width: calc(100% - 10px);
  height: calc(100% - 10px);
  resize: none;
}

.test-article {
  cursor: url(https://patchwiki.biligame.com/images/ys/b/b0/7uecwf4phmgjfnzevac1zye9m6qxkps.png), auto;
}

.test-title {
  background:
    url(https://patchwiki.biligame.com/images/ys/8/8e/mz1gtoqtdva8abdii2ynifqdop8o4rm.png) left top/61px no-repeat,
    url(https://patchwiki.biligame.com/images/ys/e/e1/gtgsayyb94tqn79yv9boed0p9prgksj.png) right top/61px no-repeat,
    /* url(https://patchwiki.biligame.com/images/ys/b/bc/svv820vl56foywxu0prhk7rx7rhd9na.png) center 2px/306px repeat, */
    #D9D1C8;
  background-size: contain;
  color: #685841;
  /* margin: 0; */
  /* padding: 0.5em 0em 0.5em 0em; */
}

.test-para {
  background-color: #F8F3EF;
}

.cata {
  position: absolute;
  z-index: 9999;
  top: 0;
  right: 0;
  width: 300px;
  /* height: 200px; */
  /* min-height: 200px; */
  background-color: rgba(255, 255, 255, 1);
  /* max-height: 200px; */
  overflow: auto;
}

.audio-shower-conatiner {
  position: relative;
  display: block;
}

.audio-shower-name {
  width: 100%;
  text-align: center;
  font-family: Georgia, Times, "Times New Roman", STKaiti, KaiTi, serif;
  font-size: 1.5rem;
  font-weight: bold;
}

.audio-shower-canvas-conatiner {
  position: relative;
}

.audio-shower-canvas-size {
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 800px;
  /* background-color: aqua; */
  display: flex;
  justify-content: center;
  align-items: center;
}

.audio-shower-canvas {
  width: 100%;
  height: 100%;
}

.audio-shower-canvas-img {
  position: absolute;
  object-fit: cover;
  border-radius: 50%;
  width: 50%;
  height: 50%;
  animation-name: as-img-rotate;
  animation-duration: 30s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
.audio-shower-canvas-img--norotate {
  animation-play-state: paused;
}

@keyframes as-img-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.audio-shower-control {
  display: flex;
  flex-direction: row;
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.audio-shower-control__play,
.audio-shower-control__loop {
  text-align: center;
  width: 80px;
}

.audio-shower-control__time {
  width: 100px;
  text-align: center;
}

.audio-shower-control__progress {
  min-width: 100px;
  width: calc(100% - 80px * 2 - 100px);
}
@media screen and (max-width: 700px){
  .audio-shower-control {
    flex-direction: column;
  }
  .audio-shower-control__play,
  .audio-shower-control__loop,
  .audio-shower-control__time,
  .audio-shower-control__progress {
    width: 100%;
  }
  .audio-shower-control__time {
    text-align: right;
  }
}

.dream {
  border-left: 1px solid attr(data-color);
}

</style>
