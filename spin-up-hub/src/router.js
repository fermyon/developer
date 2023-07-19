import { createRouter, createWebHistory } from 'vue-router'
import Home from './view/Home.vue'

const routes = [
    { path: '/hub', name: "Home", component: Home },
    { path: '/hub/preview/:id', name: "Preview", component: Home },
    {
        path: '/:pathMatch(.*)*',
        redirect: "/hub"
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export { router }