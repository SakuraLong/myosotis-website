<template>
  <div class="docu-list">
    <ul>
      <li
        v-for="(item, index) in data"
        :key="index"
        ref="docuListItem"
        class="docu-list__item"
        :class="{ 'docu-list__item--point': item.name }"
        @click="clickItem(index)"
      >
        <h4 v-if="item.bold">{{ item.title }}</h4>
        <p v-if="!item.bold">{{ item.title }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import doucList from '@/Document/doucList'
import router from '@/utils/router'
export default {
  data() {
    return {
      data: doucList.data
    }
  },
  watch: {
    $route(to, from) {
      let toPath = to.path.slice(0, to.path.indexOf('#') === -1 ? to.path.length : to.path.indexOf('#'))
      let fromPath = from.path.slice(0, from.path.indexOf('#') === -1 ? from.path.length : from.path.indexOf('#'))
      toPath = toPath.slice(1, toPath.length)
      fromPath = fromPath.slice(1, fromPath.length)
      const toPathF = toPath.slice(0, toPath.indexOf('/') === -1 ? toPath.length : toPath.indexOf('/'))
      const fromPathF = fromPath.slice(0, fromPath.indexOf('/') === -1 ? fromPath.length : fromPath.indexOf('/'))
      let toPathL = toPath
      let fromPathL = fromPath
      if (toPathF === fromPathF && toPathF === 'docu') {
        while (toPathL.indexOf('/') !== -1) {
          toPathL = toPathL.slice(toPathL.indexOf('/') + 1, toPathL.length)
        }
        while (fromPathL.indexOf('/') !== -1) {
          fromPathL = fromPathL.slice(fromPathL.indexOf('/') + 1, fromPathL.length)
        }
        this.changeItem(toPathL, fromPathL)
      }
    }
  },
  mounted() {
    const name = this.$route.name
    this.changeItem(name, name)
  },
  methods: {
    changeItem(add, remove) {
      let toFrom = -1
      let fromIndex = -1
      const itemList = this.$refs.docuListItem
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i].name !== undefined && this.data[i].name === add) toFrom = i
        if (this.data[i].name !== undefined && this.data[i].name === remove) fromIndex = i
      }
      if (fromIndex !== -1) {
        itemList[fromIndex].classList.remove('docu-list__item--active')
      }
      if (toFrom !== -1) {
        itemList[toFrom].classList.add('docu-list__item--active')
      }
    },
    clickItem(i) {
      const name = this.data[i].name
      router.pageTo(name)()
    }
  }
}
</script>

<style>
.docu-list>ul {
  list-style: none;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0;
  margin-inline-end: 20px;
  padding-inline-start: 20px;
}
.docu-list>ul>li {
  padding-inline-start: 20px;
  user-select: none;
}

.docu-list__item {
  padding: 0.8em 0px 0.8em 0px;
  pointer-events: none;
}

.docu-list__item>h4,
.docu-list__item>p {
  margin: 0;
  padding: 0;
}

.docu-list__item--point {
  pointer-events: all;
  cursor: pointer;
  transition: all 0.2s linear;
}

.docu-list__item--active {
  background-color: var(--sa-color-primary-light-8);
  color: var(--sa-color-primary-base);
  border-radius: 15px;
}

.docu-list__item--point:hover {
  transition: all 0.2s linear;
  color: var(--sa-color-primary-base);
}
</style>
