<template>
  <div class="document">
    <sr-article-container ref="render" />
  </div>
</template>

<script>
import store from '@/store'
export default {
  mounted() {
    const docu = this.$route.meta.docu
    import('./documents/' + docu + '.js').then((module) => {
      const data = module.default.data
      if (data !== undefined && data !== null) {
        this.$refs.render.updateUserData({
          githubToken: store.state.githubToken
        })
        this.$refs.render.setArticle(data)
        this.$refs.render.render()
      }
    }).catch((error) => {
      // 在导入失败后执行的代码
      console.error(error)
    })
  },
  beforeUnmount() {
    // console.log(window, window.scrollTop, window.scrollX, window.scrollY, window.screenTop)
    window.scrollTo(0, 0)
  }
}
</script>

<style>
.document {
  position: relative;
}
.document h1 > span,
.document h2 > span,
.document h3 > span,
.document h4 > span,
.document h5 > span,
.document h6 > span,
.document sr-ref-item {
  scroll-margin-top: 50px;
}
</style>
