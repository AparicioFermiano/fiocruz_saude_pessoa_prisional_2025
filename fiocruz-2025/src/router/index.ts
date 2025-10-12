import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/modulo1/',
            name: 'modulo1',
            component: () => import('@/views/Modulo1/Capa.vue'),
        },
        {
            path: '/modulo1/minicurriculo-do-autor',
            name: 'modulo1',
            component: () => import('@/views/Modulo1/Minicurriculo.vue'),
        },
    ],
})

export default router
