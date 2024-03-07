<template>
  <div class="nav-bar">
    <div class="nav-bar__container">
      <div class="nav-bar__son nav-bar__left">
        <div
          class="nav-bar__item home-button-container"
          @click="toHome"
        >
          <img
            src="/favicon.ico"
            alt=""
            draggable="false"
          >
          <span>Myosotis</span>
        </div>
      </div>
      <div class="nav-bar__son nav-bar__right">
        <div
          ref="intr"
          class="nav-bar__item intr-button-container right-item"
          @click="toIntr"
        >
          <span>介绍</span>
        </div>
        <div
          ref="docu"
          class="nav-bar__item docu-button-container right-item"
          @click="toDocu"
        >
          <span>文档</span>
        </div>
        <div
          ref="edit"
          class="nav-bar__item edit-button-container right-item"
          @click="toEdit"
        >
          <span>编辑</span>
        </div>
        <div class="nav-bar__item github-button-container right-item">
          <a
            href="https://github.com/SakuraLong/myosotis-website"
            target="_blank"
          >仓库</a>
          <!-- <span>仓库</span> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/utils/router'
export default {
  watch: {
    $route(to, from) {
      const dict = {
        '': null,
        'edit': 'edit',
        'docu': 'docu',
        'intr': 'intr'
      }
      let toPath = to.path.slice(0, to.path.indexOf('#') === -1 ? to.path.length : to.path.indexOf('#'))
      let fromPath = from.path.slice(0, from.path.indexOf('#') === -1 ? from.path.length : from.path.indexOf('#'))
      toPath = toPath.slice(1, toPath.length)
      fromPath = fromPath.slice(1, fromPath.length)
      toPath = toPath.slice(0, toPath.indexOf('/') === -1 ? toPath.length : toPath.indexOf('/'))
      fromPath = fromPath.slice(0, fromPath.indexOf('/') === -1 ? fromPath.length : fromPath.indexOf('/'))
      const toRef = dict[toPath]
      const fromRef = dict[fromPath]
      if (toPath === 'index.html') {
        router.toHome()
        return
      }
      if (fromRef !== null) this.$refs[fromRef].classList.remove('right-item--active')
      if (toRef !== null) this.$refs[toRef].classList.add('right-item--active')
    }
  },
  methods: {
    toHome() {
      router.toHome()
    },
    toDocu() {
      router.toDocu()
    },
    toEdit() {
      router.toEdit()
    },
    toIntr() {
      router.toIntr()
    }
  }
}
</script>

<style>
.nav-bar {
  position: sticky;
  top: 0;
  height: 50px;
  border-bottom: 1px solid var(--sa-color-base-border);
  display: flex;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(5px);
}
.nav-bar__container {
  width: 100%;
  position: relative;
  max-width: var(--container-max-width);
}
.nav-bar__son {
  position: absolute;
  display: flex;
  flex-direction: row;
  padding: 0px 20px 0px 20px;
}
.nav-bar__left {
  left: 0;
}
.nav-bar__right {
  right: 0;
}
.nav-bar__item {
  height: 50px;
  line-height: 50px;
  font-size: 16px;
}
.home-button-container {
  cursor: pointer;
  user-select: none;
  color: var(--sa-color-primary-base);
  font-size: 30px;
  font-weight: 700;
  display: flex;
  align-items: center;
}
.right-item {
  padding: 0px 15px 0px 15px;
  cursor: pointer;
  transition: all 0.1s linear;
}
.right-item:hover ,
.right-item a:hover {
  transition: all 0.1s linear;
  color: var(--sa-color-primary-base);
}
.right-item--active {
  border-bottom: 2px solid var(--sa-color-primary-base);
}
.right-item a {
  color: initial;
  text-decoration: none;
}

.structure-1 {
  width: 50%;
  float: left;
}
</style>
