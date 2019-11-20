import Vue from 'vue'
import App from './App.vue'
import Block from '@/blocks/h5';
const pkg = require('../package.json');
Vue.component(pkg.name, Block);

const requireComponent = require.context('@/components', true, /[A-Za-z0-9]+\.(js)$/)
requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  Vue.component(
    fileName.match(/\.\/([a-zA-Z0-9]+)\/[a-zA-Z0-9]+\.js/)[1],
    componentConfig.default || componentConfig
  )
})

Vue.config.productionTip = false
new Vue({
  render: h => h(App)
}).$mount('#app')

