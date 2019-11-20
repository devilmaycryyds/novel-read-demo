<template>
  <div class="module">
    <div 
      class="module-item" 
      v-for="(item, index) in data.children.filter(item => item.type !== 'Module')" 
      :key="index">
      <Item :data="item"></Item>
    </div>
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
    
  },
  methods: {
    handleClick() {

    }
  }
}
</script>

<style lang="scss">
  
</style>