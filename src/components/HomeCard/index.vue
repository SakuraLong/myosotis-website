<template>
  <li class="card-li">
    <div class="card">
      <div class="card__id-container">
        <div class="card__id">
          <span>
            <slot name="id" />
          </span>
        </div>
      </div>
      <h3>
        <slot name="title" />
      </h3>
      <p>
        <slot name="text" />
      </p>
      <div
        class="card__bottom-button"
        @click="click"
      >
        <slot name="button-name">查看详情</slot>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    id: {
      default: 0,
      type: Number
    }
  },
  methods: {
    click() {
      this.$emit('clickButton', this.id)
    }
  }
}
</script>

<style>
.card-li {
  display: inline-block;
}

.card-li:hover>div {
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
