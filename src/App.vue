<template>
  <div id="app">
    <template v-for="(item, index) in page">
      <Module :key="index" :data="item"></Module>
    </template>
  </div>
</template>

<script>
window.components = {}
window.componentsData = {}
import page from '@/config';
export default {
  name: 'app',
  data() {
    return {
      page: page.pages
    }
  }
}
</script>

<style lang="scss">
  // @import url('@/src/style/index.scss');
</style>
