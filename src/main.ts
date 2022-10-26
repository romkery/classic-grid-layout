import 'reflect-metadata'
import Vue from 'vue'
import VueCompositionAPI, {createApp, h} from '@vue/composition-api'
import App from './App.vue'
import router from './router'
import store from '@/store'
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui'

Vue.use(VueCompositionAPI)

Vue.use(ElementUI)

const app = createApp({
    router,
    store,
    render: () => h(App)
})

app.mount('#app')
