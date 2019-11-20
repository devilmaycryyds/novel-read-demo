<template>
  <div class="texts">
    <span>{{ data.properties.text.value }}</span>
  </div>
</template>

<script>
export default {
  props: {
    data: Object
  },
  data() {
    return {

    }
  },
  mounted() {
    console.log(this._uid)
  }
}
</script>

<style lang="scss">
  
</style>