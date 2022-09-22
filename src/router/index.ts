import Vue from 'vue'
import VueRouter from 'vue-router'
import MainLayout from '../views/MainLayout.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: import.meta.env.BASE_URL,
    routes: [
        {
            path: '/layout',
            alias: '/',
            name: 'layout',
            component: MainLayout
        },
    ]
})

export default router
