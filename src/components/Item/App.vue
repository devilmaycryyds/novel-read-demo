<template>
  <div class="item">
    <component 
      :is="data.type"
      :data="data"
      ref="elem"
      @click.native.stop="handleClick()"></component>
  </div>
</template>

<script>
export default {
  name: 'Item',
  props: {
    data: Object
  },
  data() {
    return {
    }
  },
  mounted() {
    setTimeout(() => {
      window.componentsData[this.$refs.elem._uid] = this.data;
    });
  },
  methods: {
    handleClick() {
      console.log(window.componentsData[this.$refs.elem._uid]);
    }
  }
};
</script>
      