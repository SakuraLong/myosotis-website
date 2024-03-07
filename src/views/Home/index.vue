<template>
  <div class="home">
    <div class="home-container">
      <h1>Myosotis</h1>
      <h2>文本渲染器</h2>
      <!-- <p>基于 Vue 3 制作的简易文本渲染器</p> -->
      <img
        class="home__sr-img"
        src="static/img/SRMain.png"
        alt=""
        draggable="false"
      >
      <div class="home__cards-container">
        <ul>
          <HomeCard
            v-for="(item, index) in homeCardList"
            :id="index"
            :key="index"
            @clickButton="item.func"
          >
            <template #id>
              {{ item.id }}
            </template>
            <template #title>
              {{ item.title }}
            </template>
            <template #text>
              {{ item.text }}
            </template>
          </HomeCard>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/utils/router'
import HomeCard from '@/components/HomeCard'
export default {
  components: {
    HomeCard
  },
  data() {
    return {
      homeCardList: [
        {
          id: 'I',
          title: '介绍',
          text: '介绍这个项目的信息，包括制作目的、制作人员，渲染器的渲染流程和方法',
          func: this.toIntr
        },
        {
          id: 'D',
          title: '文档',
          text: '介绍文本渲染器的结构和使用方法，帮助用户快速上手',
          func: this.toDocu
        },
        {
          id: 'E',
          title: '编辑',
          text: '提供在线的文档编辑器，在线编辑，实时查看渲染结果',
          func: this.toEdit
        }
      ]
    }
  },
  mounted() {
  },
  beforeUnmount() {
    window.scrollTo(0, 0)
  },
  methods: {
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
.home {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.home-container {
  flex-direction: column;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: var(--container-max-width);
}

.home-container>h1,
.home-container>h2,
.home-container>p {
  text-align: center;
}

.home-container>h1 {
  font-size: 45px;
}

.home__sr-img {
  width: 85%;
  box-shadow: 0px 0px 20px var(--sa-color-primary-base);
  border-radius: 5px;
}

.home__cards-container {
  text-align: center;
}

.home__cards-container>ul {
  padding: 0;
  display: block;
  list-style: none;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 0px;
}

.home__cards-container>ul>li {
  display: inline-block;
}

.home__cards-container>ul>li:hover>div {
  transition: all 0.2s linear;
  transform: translateY(-10px);
}

.card {
  position: relative;
  transition: all 0.2s linear;
  border: 1px solid var(--sa-color-base-border);
  width: 230px;
  height: 350px;
  margin: 50px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  line-height: auto;
  flex-direction: column;
  padding: 15px;
}

.card__id-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.card__id {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Exo-SemiBold";
  font-size: 90px;
  width: 130px;
  height: 130px;
  border-radius: 100%;
  background-color: var(--sa-color-primary-light-9);
}

.card__bottom-button {
  user-select: none;
  cursor: pointer;
  width: 100%;
  border-top: 1px solid var(--sa-color-base-border);
  position: absolute;
  height: 50px;
  line-height: 50px;
  bottom: 0;
  color: var(--sa-color-primary-base);
  transition: all 0.2s linear;
}

.card__bottom-button:hover {
  transition: all 0.2s linear;
  color: var(--sa-color-basic-white);
  background-color: var(--sa-color-primary-base);
}
</style>
