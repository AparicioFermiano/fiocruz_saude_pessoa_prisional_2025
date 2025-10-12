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
            path: '/modulo1/conteudo',
            name: 'modulo1',
            component: () => import('@/views/Modulo1/Conteudo.vue'),
        },
    ],
})

export default router
