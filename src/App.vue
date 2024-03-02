<template>
  <div style="position: relative;">
    <NavBar style="z-index: 9999;" />
    <router-view />
  </div>
</template>
<script>
import NavBar from '@/components/NavBar'
export default {
  components: {
    NavBar
  }
}
</script>

<style>
</style>
