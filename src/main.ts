import Vue from 'vue'
import VueCompositionAPI, { createApp, h } from '@vue/composition-api'

import App from './App.vue'
import router from './router'

Vue.use(VueCompositionAPI)

import ElementUI from 'element-ui';
Vue.use(ElementUI);

const app = createApp({
  router,
  render: () => h(App)
})

app.mount('#app')
