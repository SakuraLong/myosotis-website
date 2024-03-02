<template>
  <div class="intr">
    <div
      ref="container"
      class="intr-container"
    >
      <sr-article-container ref="render" />
    </div>
  </div>
</template>

<script>
// import SakuraRenderer from '@/sakura-renderer'
import intr from '@/Document/documents/intr'
export default {
  mounted() {
    // const catalogue = new SakuraRenderer.Catalogue(this.$refs.cata)
    // const renderer = SakuraRenderer.createRenderer(this.$refs.container)
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
    //     }
    //   }
    // })
    // renderer.bindCatalogue(catalogue)
    // renderer.setArticle(intr.data)
    // console.log(renderer.render())
    // this.$refs.render.setArticle(intr.data)
    // this.$refs.render.render()
  },
  beforeUnmount() {
    window.scrollTo(0, 0)
  }
}
</script>

<style>
.intr {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.intr-container {
  width: 100%;
  max-width: var(--container-max-width);
}
.intr-container h1 > span,
.intr-container h2 > span,
.intr-container h3 > span,
.intr-container h4 > span,
.intr-container h5 > span,
.intr-container h6 > span {
  scroll-margin-top: 50px;
}
</style>
