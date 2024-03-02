<template>
  <div class="docu">
    <div class="docu-container">
      <div class="docu-select">
        <DocuList />
      </div>
      <main class="docu-docu">
        <router-view :key="$route.name" />
      </main>
    </div>
  </div>
</template>

<script>
import DocuList from '@/components/DocuList'
export default {
  components: {
    DocuList
  },
  beforeUnmount() {
    window.scrollTo(0, 0)
  }
}
</script>

<style>
.docu {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.docu-container {
  width: 100%;
  max-width: var(--container-max-width);
  display: flex;
  flex-direction: row;
}

.docu-select {
  width: 250px;
  overflow: auto;
  position: sticky;
  top: 50px;
  height: calc(100vh - 70px);
}

.docu-docu {
  width: calc(100% - 250px);
}
</style>
