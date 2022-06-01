import 'reflect-metadata';
import Vue from 'vue'
import VueCompositionAPI, {createApp, h} from '@vue/composition-api'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import store from '@/store';

Vue.use(VueCompositionAPI)

Vue.use(ElementUI);

const app = createApp({
    router,
    store,
    render: () => h(App)
})

app.mount('#app')


