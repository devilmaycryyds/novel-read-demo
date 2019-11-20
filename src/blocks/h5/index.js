import Component from './Component.vue'
if (window.Vue) {
  Vue.component(require('../schema.json').type, Component)
}
export default Component
