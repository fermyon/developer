import { createRouter, createWebHistory } from 'vue-router'
import Home from './view/Home.vue'
import Contributing from './view/Contributing.vue'
import { store } from './store'

const routes = [
    { path: '/hub', name: "Home", component: Home },
    { path: '/hub/preview/:id', name: "Preview", component: Home },
    { path: '/hub/contributing', name: "Contributing", component: Contributing },
    {
        path: '/:pathMatch(.*)*',
        redirect: "/hub"
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from) => {
    if (to.name === "Home" && from.name === "Preview") {
        store.commit("closePreview", false)
    }
})

export { router }